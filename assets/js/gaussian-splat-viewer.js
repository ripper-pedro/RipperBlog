const viewerContainers = document.querySelectorAll('[data-splat-viewer]:not([data-splat-initialized])')

const defaultViewerSettings = {
  version: 2,
  tonemapping: 'linear',
  highPrecisionRendering: false,
  background: { color: [0.06, 0.07, 0.09] },
  postEffectSettings: {
    sharpness: { enabled: false, amount: 0 },
    bloom: { enabled: false, intensity: 0.1, blurLevel: 2 },
    grading: { enabled: false, brightness: 1, contrast: 1, saturation: 1, tint: [1, 1, 1] },
    vignette: { enabled: false, intensity: 0.5, inner: 0.3, outer: 0.75, curvature: 1 },
    fringing: { enabled: false, intensity: 0.5 }
  },
  cameras: [{ initial: { position: [0, 1, -1], target: [0, 0, 0], fov: 75 } }],
  animTracks: [],
  annotations: [],
  startMode: 'default'
}

// Camera and splat transforms saved in the latest scene.ssproj.
const avatarProjectCamera = {
  focalPoint: [0, 0, 0],
  azim: 254.99999999999932,
  elev: -17.400000000000045,
  distance: 5.2740774676615745,
  fov: 85,
  sceneRadius: 2.870774387484016
}

const avatarProjectTransform = {
  // Lower the avatar by half its full Y height so its waist sits at world Y=0.
  position: [0.06000012904405594, 0.983, -0.16999982297420502],
  rotation: [-0.08713501382668483, -0.11362360525244088, 0.9887146342518468, 0.04405153471898283],
  scale: [1.0000000005816592, 1.0000000147588184, 0.9999999971034753]
}

const findSplatEntity = (entity) => {
  if (entity.gsplat) return entity
  for (const child of entity.children) {
    const match = findSplatEntity(child)
    if (match) return match
  }
  return null
}

const applyProjectTransform = (viewer, splatId) => {
  if (splatId !== 'avatar') return
  const entity = findSplatEntity(viewer.app.root)
  if (!entity) throw new Error(`Could not find the ${splatId} splat entity.`)
  entity.setLocalPosition(...avatarProjectTransform.position)
  entity.setLocalRotation(...avatarProjectTransform.rotation)
  entity.setLocalScale(...avatarProjectTransform.scale)
  viewer.app.renderNextFrame = true
}

const radians = Math.PI / 180
const cameraDistance = avatarProjectCamera.distance * avatarProjectCamera.sceneRadius / Math.sin(avatarProjectCamera.fov * radians / 2)
const azim = avatarProjectCamera.azim * radians
const elev = avatarProjectCamera.elev * radians
const forward = [
  -Math.cos(-elev) * Math.sin(-azim),
  Math.sin(-elev),
  Math.cos(-elev) * Math.cos(-azim)
]

const initialViews = {
  avatar: {
    position: forward.map((component) => component * cameraDistance * 0.245),
    target: avatarProjectCamera.focalPoint,
    fov: avatarProjectCamera.fov
  },
  computer: {
    position: [0, 2, -2],
    target: [0, 0, 0],
    fov: 75
  }
}

for (const container of viewerContainers) {
  container.dataset.splatInitialized = 'true'
  const source = container.dataset.source
  const stage = container.parentElement
  const status = stage.querySelector('[data-splat-status]')
  const frameButton = stage.querySelector('[data-splat-frame]')

  if (container.dataset.splatReady !== 'true') continue

  let loaded = false
  const timeout = window.setTimeout(() => {
    if (loaded) return
    status.textContent = document.documentElement.lang.startsWith('en')
      ? 'The viewer is taking too long to initialize. Check WebGL support and reload the page.'
      : 'O visualizador demorou para iniciar. Confira o suporte a WebGL e recarregue a página.'
  }, 45000)

  try {
    status.textContent = document.documentElement.lang.startsWith('en') ? 'Loading 3D model…' : 'Carregando modelo 3D…'
    const { createViewer } = await import('https://cdn.jsdelivr.net/npm/@playcanvas/supersplat-viewer@1.43.2/public/index.js')
    const initialView = initialViews[container.dataset.splatId]
    const settings = initialView
      ? { ...defaultViewerSettings, background: { color: [0, 0, 0] }, cameras: [{ initial: initialView }] }
      : defaultViewerSettings
    const viewer = await createViewer({ container, contentUrl: source, renderer: 'webgl', settings, ui: false })
    viewer.state.cameraMode = 'orbit'
    frameButton.addEventListener('click', () => viewer.resetCamera())
    const finishLoading = () => {
      loaded = true
      window.clearTimeout(timeout)
      try {
        applyProjectTransform(viewer, container.dataset.splatId)
      } catch (error) {
        console.error('Could not apply the saved Gaussian Splat transform:', error)
        status.textContent = document.documentElement.lang.startsWith('en')
          ? 'The saved model orientation could not be applied.'
          : 'Não foi possível aplicar a orientação salva do modelo.'
        return
      }
      status.remove()
      viewer.state.cameraMode = 'orbit'
      viewer.resetCamera()
      viewer.app.renderNextFrame = true
      frameButton.hidden = false
    }
    if (viewer.state.loaded) {
      finishLoading()
    } else {
      viewer.events.on('progress:changed', (progress) => {
        if (loaded) return
        status.textContent = document.documentElement.lang.startsWith('en')
          ? `Loading 3D model… ${progress}%`
          : `Carregando modelo 3D… ${progress}%`
      })
      viewer.events.once('loaded:changed', finishLoading)
    }
    viewer.events.on('error:changed', (error) => {
      if (error) {
        loaded = true
        window.clearTimeout(timeout)
        status.textContent = document.documentElement.lang.startsWith('en') ? 'The model could not be loaded.' : 'Não foi possível carregar o modelo.'
      }
    })
  } catch (error) {
    loaded = true
    window.clearTimeout(timeout)
    console.error('Gaussian Splat viewer failed to initialize:', error)
    const detail = error instanceof Error ? error.message : String(error)
    status.textContent = document.documentElement.lang.startsWith('en')
      ? `The 3D viewer could not be loaded: ${detail}`
      : `Não foi possível carregar o visualizador 3D: ${detail}`
  }
}

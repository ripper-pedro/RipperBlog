(() => {
  // Função para identificar o idioma da página e traduzir os textos
  const currentLang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
  const t = (ptText, enText) => currentLang === 'en' ? enText : ptText;

  const header = document.querySelector('[data-header]')
  const menu = document.querySelector('#main-nav')
  const menuToggle = document.querySelector('[data-menu-toggle]')
  const searchDialog = document.querySelector('#search-dialog')
  const searchInput = document.querySelector('#search-input')
  const searchResults = document.querySelector('#search-results')
  const themeToggle = document.querySelector('[data-theme-toggle]')
  let searchIndex = null

  const updateThemeLabel = () => {
    if (!themeToggle) return
    const light = document.documentElement.dataset.theme === 'light'
    const label = light ? t('Mudar para modo escuro', 'Switch to dark mode') : t('Mudar para modo claro', 'Switch to light mode')
    themeToggle.setAttribute('aria-label', label)
    themeToggle.setAttribute('title', label)
  }

  updateThemeLabel()
  themeToggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('lumenveil-theme', next) } catch {}
    updateThemeLabel()
  })

  const colorScheme = window.matchMedia('(prefers-color-scheme: light)')
  colorScheme.addEventListener?.('change', (event) => {
    try {
      if (localStorage.getItem('lumenveil-theme')) return
    } catch {}
    document.documentElement.dataset.theme = event.matches ? 'light' : 'dark'
    updateThemeLabel()
  })

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 20)
  updateHeader()
  window.addEventListener('scroll', updateHeader, { passive: true })

  document.addEventListener('keydown', (e) => { if (e.key === "Escape" && menu?.classList.contains("is-open")) { menu.classList.remove("is-open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.focus(); } });

  menuToggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('is-open') ?? false
    menuToggle.setAttribute('aria-expanded', String(open))
  })

  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('is-open')
    menuToggle?.setAttribute('aria-expanded', 'false')
  }))

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('is-open')) {
      menu.classList.remove('is-open')
      menuToggle?.setAttribute('aria-expanded', 'false')
    }
  })

  const revealNodes = document.querySelectorAll('[data-reveal]')
  const homeExplore = document.querySelector('#explore')
  const scrollPill = document.querySelector('.hero__scroll')
  const syncHomeScrollState = () => {
    if (!homeExplore) return
    if (window.scrollY <= 2) {
      homeExplore.classList.remove('is-visible')
      scrollPill?.classList.remove('is-faded')
      return
    }
    if (homeExplore.getBoundingClientRect().top < window.innerHeight * .92) {
      homeExplore.classList.add('is-visible')
      scrollPill?.classList.add('is-faded')
    }
  }
  window.addEventListener('scroll', syncHomeScrollState, { passive: true })
  syncHomeScrollState()

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const atHomeTop = entry.target === homeExplore && window.scrollY <= 2
        entry.target.classList.toggle('is-visible', entry.isIntersecting && !atHomeTop)
        if (scrollPill && entry.target.id === 'explore') {
          scrollPill.classList.toggle('is-faded', entry.isIntersecting && !atHomeTop)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' })
    revealNodes.forEach((node) => revealObserver.observe(node))

    const heroNode = document.querySelector('.hero')
    if (heroNode && scrollPill) {
      const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && window.scrollY <= 2) scrollPill.classList.remove('is-faded')
      }, { threshold: 0 })
      heroObserver.observe(heroNode)
    }
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'))
  }

  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&', '<': '<', '>': '>', "'": "'", '"': '"'
  })[char])

  const loadSearch = async () => {
    if (searchIndex) return searchIndex
    const response = await fetch(searchDialog.dataset.index)
    if (!response.ok) throw new Error('Search index unavailable')
    searchIndex = await response.json()
    return searchIndex
  }

  const renderSearch = (query) => {
    const term = query.trim().toLocaleLowerCase()
    if (!term) {
      searchResults.innerHTML = ''
      return
    }
    if (!searchIndex) return
    const matches = searchIndex.filter((item) => {
      const haystack = [item.title, item.description, item.content, ...(item.tags || [])].join(' ').toLocaleLowerCase()
      return haystack.includes(term)
    }).slice(0, 12)
    searchResults.innerHTML = matches.length
      ? matches.map((item) => `<a class="search-result" href="${escapeHTML(item.url)}"><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.description || t('Sem resumo', 'No summary'))}</p><small>${escapeHTML(item.date)}${item.tags?.length ? ` · ${escapeHTML(item.tags.join(' / '))}` : ''}</small></a>`).join('')
      : '<p class="search-empty">' + t('Hmm... Parece que eu ainda não publiquei nada sobre isso.', "Hmm... It seems I haven't published anything about that yet.") + '</p>'
  }

  const openSearch = async () => {
    if (!searchDialog) return
    if (typeof searchDialog.showModal === 'function' && !searchDialog.open) searchDialog.showModal()
    searchInput?.focus()
    if (!searchIndex) searchResults.innerHTML = '<p class="search-empty">' + t('Carregando índice de pesquisa...', 'Loading search index...') + '</p>'
    try {
      await loadSearch()
      renderSearch(searchInput.value)
    } catch {
      searchResults.innerHTML = '<p class="search-empty">' + t('Falha ao carregar o índice de pesquisa, tente novamente mais tarde.', 'Failed to load search index, please try again later.') + '</p>'
    }
  }

  document.querySelectorAll('[data-search-open]').forEach((button) => button.addEventListener('click', openSearch))
  document.querySelector('[data-search-close]')?.addEventListener('click', () => searchDialog?.close())
  searchDialog?.addEventListener('click', (event) => {
    if (event.target === searchDialog) searchDialog.close()
  })
  searchInput?.addEventListener('input', (event) => renderSearch(event.target.value))

  const initialQuery = new URLSearchParams(window.location.search).get('q')
  if (initialQuery && searchInput) {
    searchInput.value = initialQuery
    openSearch()
  }

  document.querySelectorAll('.prose pre').forEach((pre) => {
    let wrapper = pre.closest('.highlight')
    if (!wrapper) {
      wrapper = document.createElement('div')
      wrapper.className = 'highlight'
      pre.parentNode.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)
    }
    if (wrapper.querySelector('.copy-code')) return
    wrapper.style.position = 'relative'
    const button = document.createElement('button')
    button.className = 'copy-code'
    button.type = 'button'
    button.textContent = t('Copiar', 'Copy')
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent)
        button.textContent = t('Copiado', 'Copied')
      } catch {
        button.textContent = t('Falha ao copiar', 'Copy failed')
      }
      window.setTimeout(() => { button.textContent = t('Copiar', 'Copy') }, 1600)
    })
    wrapper.appendChild(button)
  })

  document.querySelector('[data-copy-link]')?.addEventListener('click', async (event) => {
    const btn = event.currentTarget
    const author = btn.dataset.author || ''
    const title = btn.dataset.title || ''
    const date = btn.dataset.date || ''
    const url = btn.dataset.url || window.location.href
    const copyright = btn.dataset.copyright || ''
    const copyrightUrl = btn.dataset.copyrightUrl || ''
    const text = [
      `${t('Autor:', 'Author:')}${author}`,
      `${t('Título do artigo:', 'Article title:')} [${title}](${url})`,
      `${t('Data de publicação:', 'Published:')}${date}`,
      `${t('Link do artigo:', 'Article link:')}${url}`,
      `${t('Direitos autorais:', 'Copyright notice:')} [${copyright}](${copyrightUrl})`
    ].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      btn.textContent = t('✓ Citação copiada', '✓ Citation copied')
    } catch {
      btn.textContent = t('Falha ao copiar', 'Copy failed')
    }
    window.setTimeout(() => { btn.textContent = t('Copiar link do artigo', 'Copy article link') }, 1600)
  })

  const backToTop = document.querySelector('[data-back-to-top]')
  if (backToTop) {
    const toggleVisible = () => {
      if (window.scrollY > 100) {
        backToTop.classList.add('is-visible')
      } else {
        backToTop.classList.remove('is-visible')
      }
    }
    toggleVisible()
    window.addEventListener('scroll', toggleVisible, { passive: true })
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const scrollProgress = document.querySelector('[data-scroll-progress]')
  if (scrollProgress) {
    const progressBar = scrollProgress.querySelector('.scroll-progress__bar')
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0
      if (progressBar) progressBar.style.width = progress + '%'
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
  }

  const archive = document.querySelector('[data-archive]')
  if (archive) {
    const grid = document.querySelector('[data-post-grid]')
    const titleNode = document.querySelector('[data-archive-title]')
    const labelNode = document.querySelector('[data-archive-label]')
    const emptyNode = document.querySelector('.empty-state')
    const allPill = archive.querySelector('[data-archive-all]')
    const pills = archive.querySelectorAll('[data-year]')
    const cards = grid ? Array.from(grid.children) : []
    const allArchiveTemplate = document.getElementById('archive-all-cards')
    const allArchiveCards = allArchiveTemplate
      ? Array.from(allArchiveTemplate.content.querySelectorAll('article.post-card'))
      : []
    const pagination = document.querySelector('.pagination')
    const perPage = parseInt(grid?.dataset.perPage || '8', 10) || 8
    const yearCounts = new Map()
    archive.querySelectorAll('[data-year]').forEach((pill) => {
      const countEl = pill.querySelector('.archive-count')
      if (countEl) yearCounts.set(pill.dataset.year, parseInt(countEl.textContent, 10) || 0)
    })
    const allCount = (() => {
      const el = archive.querySelector('[data-archive-all] .archive-count')
      return el ? (parseInt(el.textContent, 10) || 0) : cards.length
    })()
    const buildClientPagination = (visible) => {
      if (!pagination) return
      const url = new URL(window.location.href)
      const params = url.searchParams
      const currentPage = Math.max(1, parseInt(params.get('page') || '1', 10))
      const totalPages = Math.max(1, Math.ceil(visible / perPage))
      const pageHref = (page) => {
        const u = new URL(window.location.href)
        u.searchParams.set('page', String(page))
        return `${u.pathname}${u.search}`
      }
      pagination.innerHTML = ''
      const prev = document.createElement(currentPage > 1 ? 'a' : 'span')
      prev.className = `pagination-item${currentPage > 1 ? '' : ' is-disabled'}`
      if (currentPage > 1) {
        prev.rel = 'prev'
        prev.href = pageHref(currentPage - 1)
        prev.textContent = t('← Página anterior', '← Previous page')
      } else {
        prev.setAttribute('aria-disabled', 'true')
        prev.textContent = t('← Página anterior', '← Previous page')
      }
      pagination.appendChild(prev)
      const pages = document.createElement('span')
      pages.className = 'pagination-pages'
      for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
          const item = document.createElement('span')
          item.className = 'pagination-item is-active'
          item.setAttribute('aria-current', 'page')
          item.textContent = String(i)
          pages.appendChild(item)
        } else {
          const item = document.createElement('a')
          item.className = 'pagination-item'
          item.href = pageHref(i)
          item.textContent = String(i)
          pages.appendChild(item)
        }
      }
      pagination.appendChild(pages)
      const next = document.createElement(currentPage < totalPages ? 'a' : 'span')
      next.className = `pagination-item${currentPage < totalPages ? '' : ' is-disabled'}`
      if (currentPage < totalPages) {
        next.rel = 'next'
        next.href = pageHref(currentPage + 1)
        next.textContent = t('Próxima página →', 'Next page →')
      } else {
        next.setAttribute('aria-disabled', 'true')
        next.textContent = t('Próxima página →', 'Next page →')
      }
      pagination.appendChild(next)
      pagination.dataset.client = '1'
    }
    let serverPaginationCache = ''
    const captureServerPagination = () => {
      if (!pagination) return
      let tpl = pagination.querySelector('[data-pagination-template]')
      if (!tpl) {
        tpl = document.createElement('template')
        tpl.setAttribute('data-pagination-template', '')
        tpl.innerHTML = pagination.innerHTML
        pagination.appendChild(tpl)
      }
      serverPaginationCache = tpl.innerHTML
    }
    const restoreServerPagination = () => {
      if (!pagination || !serverPaginationCache) return
      pagination.innerHTML = serverPaginationCache
      pagination.dataset.client = '0'
    }
    const yearPills = Array.from(pills)
    const update = (year) => {
      const sourceCards = allArchiveCards.length > 0 ? allArchiveCards : cards
      const matches = sourceCards.filter((card) => {
        const cardYear = card.dataset.year || ''
        return !year || cardYear === year
      })
      if (grid) {
        grid.innerHTML = ''
        const url = new URL(window.location.href)
        const requestedPage = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1)
        const pageSize = perPage
        const totalPages = Math.max(1, Math.ceil(matches.length / pageSize))
        const currentPage = Math.min(requestedPage, totalPages)
        if (currentPage !== requestedPage) {
          url.searchParams.set('page', String(currentPage))
          window.history.replaceState(null, '', url)
        }
        const pageMatches = year
          ? matches.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          : matches
        pageMatches.forEach((card) => grid.appendChild(card.cloneNode(true)))
      }
      const visible = year ? (yearCounts.get(year) || 0) : allCount
      yearPills.forEach((pill) => pill.classList.toggle('is-active', pill.dataset.year === year))
      const allPill = archive.querySelector('[data-archive-all]')
      if (allPill) allPill.classList.toggle('is-active', !year)
      
      if (titleNode) titleNode.textContent = year ? t(`Artigos de ${year}`, `Articles in ${year}`) : t('Todos os artigos', 'All Articles')
      if (labelNode) labelNode.textContent = year ? t(`Ano ${year}`, `Year ${year}`) : t('Todos os Artigos', 'All Articles')
      
      if (emptyNode) emptyNode.hidden = visible !== 0 || !year
      if (pagination) {
        buildClientPagination(visible)
      }
    }
    archive.querySelector('[data-archive-all]')?.addEventListener('click', () => {})
    pills.forEach((pill) => pill.addEventListener('click', (event) => {
      event.preventDefault()
      const year = pill.dataset.year
      const url = new URL(window.location.href)
      url.searchParams.set('year', year)
      window.history.replaceState(null, '', url)
      update(year)
    }))
    cards.forEach((card) => {
      const date = card.querySelector('time[datetime]')
      if (date) card.dataset.year = (date.getAttribute('datetime') || '').slice(0, 4)
    })
    captureServerPagination()
    const initialYear = new URLSearchParams(window.location.search).get('year')
    if (initialYear) {
      update(initialYear)
    } else {
      yearPills.forEach((pill) => pill.classList.toggle('is-active', false))
      if (allPill) allPill.classList.add('is-active')
    }
  }
})()

(() => {
  function layout(gallery) {
    const items = Array.from(gallery.children).filter(el =>
      el.classList && el.classList.contains('pswp-item'));
    if (!items.length) return;
    const cs = getComputedStyle(gallery);
    const gap = parseFloat(cs.columnGap || cs.gap) || 14;
    const W = gallery.clientWidth;
    if (!W) return;
    for (let i = 0; i < items.length; i += 2) {
      const a = items[i], b = items[i + 1];
      if (b) {
        const rA = parseFloat(a.dataset.pswpRatio) || 1;
        const rB = parseFloat(b.dataset.pswpRatio) || 1;
        const sum = rA + rB;
        const avail = W - gap;
        a.style.flex = '0 0 ' + ((rA / sum) * avail) + 'px';
        b.style.flex = '0 0 ' + ((rB / sum) * avail) + 'px';
      } else {
        a.style.flex = '0 0 ' + W + 'px';
        a.style.maxWidth = '100%';
      }
    }
  }
  function run() {
    document.querySelectorAll('.pswp-gallery[data-pswp-layout="justified"]').forEach(layout);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  window.addEventListener('load', run);
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    document.querySelectorAll('.pswp-gallery[data-pswp-layout="justified"] > .pswp-item').forEach(el => {
      el.style.flex = '';
      el.style.maxWidth = '';
    });
    resizeTimer = setTimeout(run, 150);
  });
})();

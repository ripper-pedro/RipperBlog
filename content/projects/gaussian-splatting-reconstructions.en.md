---
title: 'Reconstructing (or trying to) scenes with Gaussian Splatting'
date: '2026-11-14'
translationKey: 'gaussian-splatting-reconstructions'
description: 'Voilà: 3D versions of me and my computer.'
project_classifications: ['3D Rendering']
stack: [Unity, PyTorch, Gaussian Splatting]
---

A name that has become trendy recently is &#34;*Gaussian Splatting*&#34;. It is a *novel view synthesis* technique, that is, it allows us to reconstruct a 3D scene from a few photos of a target object taken from different angles, creating images of this object from completely new angles that were never originally photographed. The name &#34;*Gaussian*&#34; comes from the Gaussian primitives, which are 3D ellipsoids with properties such as color, opacity, and position. The name &#34;*Splatting*&#34; comes from these Gaussians&#39; ability to split or duplicate so they can be projected onto the 2D screen.

Below is an example of a reconstruction I made of myself for a practical assignment some time ago:

{{< gaussian-splat-viewer id="avatar" src="splats/avatar-project.ply" >}}

But today we are going to focus on the step-by-step process I followed to reconstruct my computer. I should warn you in advance that the result did not turn out well, for several reasons:

- The case is entirely black and full of smooth surfaces or repetitive patterns, which makes it difficult to distinguish its points;
- It also has many, many reflective and/or transparent parts, especially the acrylic &#34;windows&#34;;
- The university photography association could not open the cabinet with the good cameras to lend me one, so I had to use the one on my Motorola, which cost 66.66 euros (400 reais);
- I took few photos...

I already knew about all these limitations of the algorithm when dealing with the object I chose to reconstruct, but I chose it anyway for two reasons: first, because my computer is the only relevant personal object I have at home at the moment — it was the only valuable thing I brought from Brazil to France. After all, I am not going to make a 3D reconstruction of my underwear, am I? Second, because I am proud of it. I bought all the parts — even if they were used or from a street vendor — with the salary from my first internship, and assembled it myself, from scratch. I also knew about the limitations of my data acquisition process, but at least this will serve to compare it with a future reconstruction I plan to make much more rigorously for the final project in another course.

With those caveats out of the way, let us get to what matters. The first step was to take the computer somewhere with good lighting and photograph it a few times, from different angles and distances. Below are some examples of the photos I took:
{{< project-gallery layout="grid" images="computer-input-01.jpg|computer-input-02.jpg|computer-input-03.jpg|computer-input-04.jpg" alts="Photo of the computer case from above|Photo of the computer case from above at another angle|Side photo of the computer case|Another side view of the computer case" >}}

Next, I put these photos into COLMAP and followed the instructions for a dense reconstruction, since the sparse one had returned many points for the floor and very few for the computer itself. Below is a screenshot of the point cloud with the calculated camera positions:
{{< project-gallery layout="single" images="computer-colmap.png" alts="COLMAP point cloud with the estimated camera positions around the computer" >}}

Before running the GS training, I used an *open-source* segmentation model (*BiRefNet*) to create masks of only my computer in the photos. I did not use it earlier because the details on the floor helped the algorithm calculate the camera positions and relate the images to one another. But now we want the rendering to show only the computer, so we should ignore the background. Below is an example of the masks and the filtered point cloud, with only the points that were projected inside them:
{{< project-gallery layout="pair" images="computer-mask-preview.jpg|computer-mask.png" alts="Preview of the segmentation mask applied to the computer case|Binary mask of the computer case, in white, on a black background" >}}
{{< project-gallery layout="single" images="computer-filtered-cloud.png" alts="Filtered point cloud showing only the computer case" >}}

Finally, the final result, trained using the gsplat library, was this:

{{< gaussian-splat-viewer id="computer" src="splats/computer-project.sog" >}}

My professor also asked me to import the result into Unity. It was very simple, all I had to do was download the &#34;UnityGaussianSplatting&#34; repository and follow its quick tutorial. The only thing I had to do besides that was adjust the object&#39;s transforms to leave it centered at the origin and with the correct orientations:
{{< project-gallery layout="single" images="unity-gaussian-splatting.png" alts="Gaussian Splatting project open in Unity, with the computer case centered at the origin" >}}

One thing I learned is that I should not repeat the photo from the initial data acquisition angle. The first reconstruction I had made unintentionally rendered a second computer, overlapping the first one, only in the front views. This happened because I always started and finished taking the photos from the front view, which ended up being redundant and leading the algorithm into error. I had to run a second training session, leaving out the &#34;duplicate&#34; photos, to solve the problem. If you scroll up a little and look closely at the COLMAP screenshot, you will notice that the front position has three cameras in the same place, instead of just one.




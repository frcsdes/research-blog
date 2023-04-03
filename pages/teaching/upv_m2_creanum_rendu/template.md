# {{title}}

## Introduction

[Slide de cours (PDF)](resources/1_Introduction.pdf)

[Images de référence (ZIP, 17 MB)](resources/References.zip)

## Modélisation de la lumière

[Slides de cours (PDF)](resources/2_Modelisation_lumiere.pdf)

**Sources lumineuses**

- Page de Bartosz Ciechanowski sur la lumière et les ombres ❤️  
  <https://ciechanow.ski/lights-and-shadows/>

- Bibliothèque de profils de lampes au format IES  
  <https://ieslibrary.com/en/home>

- Documentation Blender sur les sky textures (Hosek-Wilkie etc.)  
  <https://docs.blender.org/manual/en/latest/render/shader_nodes/textures/sky.html>

**Matériaux surfaciques**

- Documentation RenderMan du shader Disney ❤️  
  <https://renderman.pixar.com/resources/RenderMan_20/PxrDisney.html>

- Article fondateur du shader Disney par Brent Burley, 2012  
  <https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf>

**Matériaux volumiques**

- Extrait du livre PBRT sur la diffusion dans les volumes  
  <https://www.pbr-book.org/3ed-2018/Volume_Scattering/Volume_Scattering_Processes>

- Dataset nuage mis à disposition par Disney Animation Studios
  <https://www.disneyanimation.com/resources/clouds/>

**Caméras**

- Page de Bartosz Ciechanowski sur les caméras et les lentilles ❤️  
  <https://ciechanow.ski/cameras-and-lenses/>

- Extrait du livre PBRT sur les modèles de caméras projectives  
  <https://www.pbr-book.org/3ed-2018/Camera_Models/Projective_Camera_Models>

## Fonctionnement du Path Tracing

[Slide de cours (PDF)](resources/3_Path_Tracing.pdf)

**Objectif du rendu 3D**

- Dataset Box mis à disposition par l'université de Cornell  
  <https://www.graphics.cornell.edu/online/box/data.html>

- Article Wikipédia sur l'équation du rendu  
  <https://fr.wikipedia.org/wiki/Équation_du_rendu>

**Construction d'un chemin**

- Présentation de Sebastian Herholz sur le Path Guiding, BCON 2022 ❤️  
  <https://www.youtube.com/watch?v=BS1JLbNqGxI>

- Comparaison de séquences pseudo-aléatoires par David Coeurjolly  
  <https://perso.liris.cnrs.fr/david.coeurjolly/publications/heitz19-supplemental/scenes/cbox.html>

- Article de recherche correspondant au lien précédent  
  <https://perso.liris.cnrs.fr/david.coeurjolly/publications/heitz19.html>

**Le bruit**

- Documentation Blender sur la réduction du bruit avec Cycles ❤️  
  <https://docs.blender.org/manual/en/latest/render/cycles/optimizations/reducing_noise.html>

- Vidéo pratique sur le denoising temporel  
  <https://www.youtube.com/watch?v=851cEK0Taro>

- Add-on Blender SID (Super Image Denoiser)  
  <https://pidgeontools.gumroad.com/l/SuperImageDenoiser>

**Complexité de calcul**

- Article d'Harold Serrano sur la construction des BVH  
  <https://www.haroldserrano.com/blog/visualizing-the-boundary-volume-hierarchy-collision-algorithm>

- Fichier Blender "Scattering Pebbles" par Simon Thommes  
  <https://download.blender.org/demo/geometry-nodes/fields/pebble_scattering.blend>

## Exploiter le rendu en compositing

[Slide de cours (PDF)](resources/4_Compositing.pdf)

**Principe du compositing**

- Livre en ligne de Chris Brejon, chapitre compositing ❤️  
  <https://chrisbrejon.com/cg-cinematography/chapter-9-compositing>

- Page de Natron, logiciel de compositing Open Source ❤️  
  <https://natrongithub.github.io/>

- Introduction technique au format OpenEXR  
  <https://openexr.com/en/latest/TechnicalIntroduction.html>

**Calques de données**

- Dataset EXR mis à disposition par l'Academy Software Foundation  
  <https://github.com/AcademySoftwareFoundation/openexr-images>

- Vidéo sur le relighting 2.5D dans Nuke par The Foundry  
  <https://www.youtube.com/watch?v=KWTiS2DV2CM>

**Calques d'identifiants**

- Poster Cryptomatte par Jonah Friedman et Andrew Jones, Psyop  
  <https://github.com/Psyop/Cryptomatte/raw/master/specification/IDmattes_poster.pdf>

- Vidéo démo OpenEXR/Id par Philippe Llerena, Mercenaries Engineering  
  <https://www.youtube.com/watch?v=Ucn3KE3JDFA&t=238s>

**Light Path Expressions**

- Article sur le compositing à l'aide de LPE avec Iray ❤️  
  <https://blog.irayrender.com/post/76948894710/compositing-with-light-path-expressions>

- Introduction aux LPE dans la documentation Arnold / Maya  
  <https://help.autodesk.com/view/ARNOL/ENU/?guid=arnold_for_maya_aovs_am_Introduction_to_Light_Path_Expressions_html>

- Référence technique des LPE  
  <https://github.com/AcademySoftwareFoundation/OpenShadingLanguage/wiki/OSL-Light-Path-Expressions>

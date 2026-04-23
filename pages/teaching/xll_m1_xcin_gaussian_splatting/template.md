# {{title}}

## Introduction

[Course slides (PDF)](resources/1_Introduction.pdf)

### Structure from Motion

- COLMAP tutorial page that goes through all reconstruction steps\
  <https://colmap.github.io/tutorial.html>

- General introduction to SIFT from the silx software library\
  <https://www.silx.org/doc/silx/latest/description/sift.html>

### Photogrammetry

- Unity Photogrammetry Workflow handbook\
  <https://unity3d.com/files/solutions/photogrammetry/Unity-Photogrammetry-Workflow_2017-07_v2.pdf>

- Surface Reconstruction, graduate school lecture by Pierre Alliez\
  <https://www.youtube.com/watch?v=PWlo7PvtQVw>

### Neural Radiance Fields (NeRFs)

- News site and newsletter about radiance fields in general\
  <https://radiancefields.com/>

- Neural Radiance Fields from scratch by Luc Frachon\
  <https://medium.com/@luc.frachon/neural-radiance-fields-from-scratch-part-i-3a340e2980db>

- Interactive browser demo of NeRFs baked into a grid representation\
  <https://phog.github.io/snerg/#demos>

- Interactive browser demo of streamable, partitioned NeRFs\
  <https://smerf-3d.github.io/#demos>

### 3D Gaussian Splatting (3DGS)

- Community gallery that comes with a great splats viewer and editor\
  <https://superspl.at/>

- 3D Gaussian Splatting Introduction & Paper Explanation\
  <https://learnopencv.com/3d-gaussian-splatting/>

- Optimized splats rendering in Spark 2.0\
  <https://www.worldlabs.ai/blog/spark-2.0>

## Gaussian Splatting Acquisition

[Course slides (PDF)](resources/2_Gaussian_Splatting.pdf)

## Group Projects

These projects are designed to explore different aspects of gaussian splats and how to integrate them in production workflows.
Please return a ZIP archive that contains all code necessary to run your experiments, and a short but illustrated report that answers the successive questions.
Testing on your own gaussian splats will be greatly appreciated!

### Mesh Reconstruction and Shadowing

Geometry processing applied to gaussian splats.

[Instructions (PDF)](resources/Mesh_Reconstruction.pdf)

[Starter code (ZIP)](resources/Mesh_Reconstruction.zip)

### Scene to Splats Unreal Engine Plugin

A peek into Unreal Engine plugin programming in C++.

[Instructions (PDF)](resources/Scene_to_Splats.pdf)

[Starter code (ZIP)](resources/Scene_to_Splats.zip)

### Color Grading and Splats Relighting

Manipulate how radiance is represented in 3D Gaussian Splatting.

[Instructions (PDF)](resources/Color_Grading.pdf)

[Starter code (ZIP)](resources/Color_Grading.zip)

### Efficient Representation of 4DGS

Exploratory subject with hardware considerations and less guidance.

[Instructions (PDF)](resources/Efficient_4DGS.pdf)

[Starter code (ZIP)](resources/Efficient_4DGS.zip)

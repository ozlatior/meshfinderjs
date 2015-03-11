# meshfinderjs

javascript pathfinder algorithm using meshes (for non-grid environments)

This is still work in progress and it is unfortunately not functional yet.
Please come back for updates.

# Description

The purpose of this package is to provide a reliable mesh-based pathfinding
algorithm for javascript applications such as browser games and not only
(I have designed it for a relationship model editor, where I needed to draw
user lines between objects on the screen).

## Features

This is a list of intended features, none of these are currently implemented.

* Finds path between two points in a user-provided mesh pattern
* Different navigation styles: shortest path, straightest path, always go through
  middle, always cut corners etc
* Different object profiles: collision radius, turn radius
* Mesh generator based on an obstacle (polygons) list
* Raycasting for "surprize" obstacles in the mesh

# License

This software is provided under "unlicense". Read LICENSE for more information.

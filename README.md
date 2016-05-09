d3DNAViewer
==============

Overview
==============
d3DNAViewer uses JavaScript to visualize DNA molecules. Users can enter a string of DNA nucleotide bases and a corresponding [Dot-Bracket-Notation](http://ultrastudio.org/en/Dot-Bracket_Notation) (DBN) string to render phosphate backbone bonds and base pair connections in 2D. 

![Demo Screenshot](https://github.com/collinadams/d3DNAViewer/blob/master/demoscreenshot.png)
.git

Features
==============

- Each base in the visualization is labeled (A, T, C, or G) and colored (Red, Blue, Green, or Black).
- The original DNA and DBN sequences are displayed side-by-side with the molecule visualization.
- The 5' and 3' ends of the DNA sequence are annotated.
- Phosphate backbone connections are visually differentiated from base pair complements.
- Users select colors for each nucleotide base, size of the nucleotide nodes, label font, and link width.
- When hovering over a base in the graph, the corresponding base is highlighted in the DNA and DBN sequences.
- At the click of a button, users receive a uniquely customized URL that persists the state of the graph. Just navigating to that URL opens the exact same view.

Technology Stack
==========
JavaScript, D3, jQuery, Node/Express

Style Guide
==========
All code adheres to the Airbnb JavaScript Style Guide.

Engineer
==========
- [Collin Adams](https://github.com/collinadams)

Future Features
=============

-
-
-

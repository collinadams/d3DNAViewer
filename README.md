d3DNAViewer
==============


Overview
==============
d3DNAViewer uses JavaScript to visualize DNA molecules. Users can enter a string of DNA nucleotide bases and a corresponding [Dot-Bracket Notation](http://ultrastudio.org/en/Dot-Bracket_Notation) (DBN) string to render phosphate backbone bonds and base pair connections in 2D. 


![Molecule Viewer Demo Screenshot](https://raw.githubusercontent.com/collinadams/d3DNAViewer/master/client/assets/molecularviewdemo.png)

![User Input Demo Screenshot](https://raw.githubusercontent.com/collinadams/d3DNAViewer/master/client/assets/userinputdemo.png)

Features
==============

- Each base in the visualization is labeled (Adenine, Thymine, Cytosine, or Guanine) and colored (Red, Blue, Green, or Black).
- The original DNA and DBN sequences are displayed side-by-side with the molecule visualization.
- The 5' and 3' ends of the DNA sequence are annotated.
- Phosphate backbone connections (black) are visually differentiated from base pair complement connections (gray).
- Users select size of the nucleotide nodes, label font, link width, and colors for each nucleotide base.
- When hovering over a base in the graph, the corresponding base is highlighted in the DNA and DBN sequences.
- At the click of a button, users receive a uniquely customized URL that persists the state of the graph. Navigating to that URL opens the exact same view.

Technology Stack
==========
JavaScript, D3, jQuery, Node/Express, Mocha/Chai

Installation
=============
To get started, run these commands from the terminal:
```
$ git clone https://github.com/collinadams/d3DNAViewer.git
$ cd d3DNAViewer
$ npm install
$ npm start
```
Then navigate the browser to: http://localhost:4568/

Testing
=============
This product includes 11 server-side integration and 10 client-side unit tests in Mocha/Chai. To launch all tests, run this command from the terminal:
```
$ npm test
```

File Architecture
==========
```
d3DNAViewer
  |-client
    |---app.js                        # High-level variables, DOM event listeners, input validation
    |---helpers
      |-----ajaxHelpers.js            # Helper functions for RESTful AJAX
      |-----d3Helpers.js              # Helper functions for building Force Layout
      |-----inputParsingHelpers.js    # Helper functions for packaging genetic big data
    |---index.html                    # Single page user input form
    |---assets                        # Styleseet, spinner animation for build status and, demo screenshots 
  |-server.js                         # Node/Express server, middleware, routing, and mock database
  |-test
    |---clientUnitTests               # Ten client-side unit tests
    |---serverIntegrationTests        # Eleven server-side integration tests

```

Style Guide
==========
All code adheres to the Airbnb JavaScript Style Guide.

Engineer
==========
- [Collin Adams](https://github.com/collinadams)
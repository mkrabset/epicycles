#!/bin/bash

browserify -r ./paths.js:paths -r ./complex.js:complex -r ./fourier.js:fourier -r ./images.js:images > bundle.js


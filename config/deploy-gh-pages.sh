#!/bin/bash

# quits on first failure, such as if `gh-pages` branch already exists
# see https://unix.stackexchange.com/a/309344
set -e

# Builds the production assets and commit changes on the `gh-pages` branch
# NOTE: still need to set up GitHub Pages to work with the `gh-pages` branch `
# see https://gist.github.com/cobyism/4730490#gistcomment-2375522
npx webpack --mode=production
cd build
git add -A
git commit -m "Deploying new changes on $(date)"
git push origin gh-pages
cd ..

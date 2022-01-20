#!/bin/bash

# quits on first failure, such as if `gh-pages` branch already exists
# see https://unix.stackexchange.com/a/309344
set -e

# create a linked working tree mounted at the build direectory
# see https://gist.github.com/cobyism/4730490#gistcomment-2375522
rm -rf build
git worktree add build gh-pages

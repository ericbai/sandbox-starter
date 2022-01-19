#!/bin/bash

# quits on first failure, such as if `gh-pages` branch already exists
# see https://unix.stackexchange.com/a/309344
set -e

# sets up the GitHub pages branch
# see https://jiafulow.github.io/blog/2020/07/09/create-gh-pages-branch-in-existing-repo/
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initializing gh-pages branch"
git push origin gh-pages
git checkout main

# create a linked working tree mounted at the build direectory
# see https://gist.github.com/cobyism/4730490#gistcomment-2375522
rm -rf build
git worktree add build gh-pages

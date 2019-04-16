#!/usr/bin/env bash

rm -rf dist

lessc src/styles.less dist/assets/css/common.css
lessc src/app/views/home/home.less dist/assets/css/home.css

cp src/app/styles/*.css dist/assets/css/
cp src/app/views/home/home.template.html dist/index.html


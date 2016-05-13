#!/bin/sh
cd /Users/bnewman/databases/mongodb-osx-x86_64-3.0.12/bin
./mongorestore -h localhost:27017 -d blog "/Users/bnewman/WebstormProjects/blog/be/data/blog"
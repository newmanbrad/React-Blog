#!/bin/sh
cd /Users/bnewman/databases/mongodb-osx-x86_64-3.0.12/bin
./mongodump -h localhost:27017 -d blog -o "/Users/bnewman/WebstormProjects/React-Blog/be/data"
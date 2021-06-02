#!/usr/bin/env bash
docker build --rm -f "Dockerfile" -t items-api:latest .
docker run -p 4000:4000 items-api

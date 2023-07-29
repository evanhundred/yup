#!/usr/bin/env bash

# exit on error
set -o errexit

cd frontend
npm run build
cd ..
bundle install
rails db:migrate
rails db:seed #if needed

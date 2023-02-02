#!/usr/bin/env bash

# exit on error
set -o errexit

npm runbuild
bundle install
rails db:migrate
rails db:seed #if needed

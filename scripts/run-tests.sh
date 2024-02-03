#!/bin/bash
set -m
# Start the development server in the background and get its PID
npm run dev &
SERVER_PID=$!

# Function to kill the server process and any child processes
cleanup() {
  echo "Cleaning up..."
  # Kill the server process
  kill -9 $SERVER_PID
  # Optionally, kill any child processes started by npm run dev
  pkill -9 -P $SERVER_PID
}

# Trap EXIT signal to ensure cleanup is called when the script exits
trap cleanup EXIT

# Run Cypress tests
npx cypress run --e2e --browser chrome --headless

# The script exits here, triggering the cleanup function

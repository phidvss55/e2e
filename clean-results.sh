#!/bin/bash

# Exit immediately if any command fails
set -e

# Define the target folder
TARGET_DIR="test-results"

# Check if the folder exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Folder '$TARGET_DIR' does not exist."
  exit 1
fi

echo "🧹 Cleaning folders inside '$TARGET_DIR' ..."

# Remove all subdirectories, but keep files
find "$TARGET_DIR" -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} +

echo "✅ Done! All test results inside '$TARGET_DIR' have been removed."


#!/bin/bash

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp command not found. Please install webp package."
    exit 1
fi

# Find all JPG/JPEG files in the current directory
for img in *.jpg *.jpeg *.JPG *.JPEG; do
    # Skip if no files match the pattern
    [ -e "$img" ] || continue

    # Get filename without extension
    filename="${img%.*}"

    # Convert to webp with the same name
    echo "Converting $img to ${filename}.webp"
    cwebp -quiet "$img" -o "${filename}.webp"

    # Check if conversion was successful
    if [ $? -eq 0 ] && [ -f "${filename}.webp" ]; then
        echo "Successfully converted $img, deleting original..."
        rm "$img"
    else
        echo "Error converting $img, original file preserved."
    fi
done

echo "Conversion complete!"
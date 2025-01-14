#!/usr/bin/env bash

set -Eeuo pipefail

# allow for simple recursive file globs
shopt -s globstar

declare -A replacements=(
    "<title>raylib web game</title>"                        "<title>\$title</title>"
    "<meta name=\"title\" content=\"raylib web game\">"     "<meta name=\"title\" content=\"\$title\">"
    "New raylib web videogame, developed using raylib videogames library" "raylib \[\$category\] example - \$title"
)

function update_tags {
    echo "update tags for: $1"
    filename=$(basename $1)
    noext="${filename%.*}"
    export title="${noext//_/ }"
    export imgname="${noext}.png"
    parts=($title)
    export category=$parts[0]

    echo "${parts[0]}"
    echo "  basename: $filename"
    echo "  title:    $title"
    echo "  imgname:  $imgname"


    for key in "${!replacements[@]}"; do
        r=${replacements[$key]}
        r=$(envsubst <<< "$r")
        bash -c "sed -i 's,$key,$r,g' $1"
    done
}

pushd ../examples

for i in **/*.html; do
    update_tags "$i"
done

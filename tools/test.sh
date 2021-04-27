<<<<<<< HEAD
#!/bin/bash
=======
#!/usr/bin/env bash
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
#
# Using HTML-proofer to test site.
#
# Requirement: https://github.com/gjtorikian/html-proofer
#
<<<<<<< HEAD
# Usage: bash /path/to/test.sh
#
# v2.0
# https://github.com/cotes2020/jekyll-theme-chirpy
# © 2020 Cotes Chung
# MIT Licensed
=======
# Usage: bash /path/to/test.sh [indicated path]
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413

DEST=_site
URL_IGNORE=cdn.jsdelivr.net

<<<<<<< HEAD
bundle exec htmlproofer $DEST \
=======
_build=false

help() {
  echo "Usage:"
  echo
  echo "   bash ./tools/test.sh [options]"
  echo
  echo "Options:"
  echo "     --build                  Run Jekyll build before test."
  echo "     -d, --dir   <path>       Specify the test path."
  echo "     -h, --help               Print this information."
}

if [[ -n $1 && -d $1 ]]; then
  DEST=$1
fi

while (($#)); do
  opt="$1"
  case $opt in
    --build)
      _build=true
      shift
      ;;
    -d | --dir)
      if [[ ! -d $2 ]]; then
        echo -e "Error: path '$2' doesn't exist\n"
        help
        exit 1
      fi
      DEST=$2
      shift
      shift
      ;;
    -h | --help)
      help
      exit 0
      ;;
    *)
      # unknown option
      help
      exit 1
      ;;
  esac
done

if $_build; then
  JEKYLL_ENV=production bundle exec jekyll b
fi

bundle exec htmlproofer "$DEST" \
>>>>>>> 28fb78ad876485cc0a7120c304a1151bc72e5413
  --disable-external \
  --check-html \
  --empty_alt_ignore \
  --allow_hash_href \
  --url_ignore $URL_IGNORE

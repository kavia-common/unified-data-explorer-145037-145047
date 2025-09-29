#!/bin/bash
cd /home/kavia/workspace/code-generation/unified-data-explorer-145037-145047/frontend_nextjs_app
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi


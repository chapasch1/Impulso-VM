#!/bin/sh
# Arma la carpeta public/ que publica Cloudflare Pages.
# Solo van los archivos del sitio: el script de mails (con la lista de destinatarios),
# el prompt y la guía de Play Store quedan fuera.
set -e
rm -rf public
mkdir -p public
cp index.html privacidad.html favicon.png favicon.ico apple-touch-icon.png og.png manifest.webmanifest sw.js public/
cp -r ediciones icons public/

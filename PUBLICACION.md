# Publicación automática de Impulso VM

Todos los jueves a la noche, Claude arma la edición del viernes y la sube a GitHub. Para que eso llegue solo al sitio, Cloudflare tiene que publicar desde GitHub en lugar de recibir los archivos a mano. Se configura **una sola vez**.

## Paso 1. Crear el proyecto conectado a GitHub

1. Entrá a Cloudflare y abrí **Workers y Pages**.
2. Tocá **Crear** y elegí la pestaña **Pages**.
3. Elegí **Conectar a Git** (o "Importar un repositorio de Git").
4. Autorizá GitHub y elegí el repositorio **chapasch1/Impulso-VM**.
5. Completá la configuración:
   - **Nombre del proyecto:** `impulsovm-git` (tiene que ser distinto al que usás hoy).
   - **Rama de producción:** `claude/improve-website-jah76q`.
   - **Framework:** ninguno.
   - **Comando de compilación:** `sh build.sh`
   - **Directorio de salida:** `public`
6. Tocá **Guardar e implementar**. En un minuto te da una dirección terminada en `.pages.dev`. Abrila y fijate que se vea la última edición y que funcione `/ediciones/2026-11-13.html`.

`build.sh` publica solo los archivos del sitio. El script de los mails (que tiene la lista de destinatarios), el prompt y la guía de Play Store quedan fuera, así no aparecen en internet.

## Paso 2. Pasar el dominio al proyecto nuevo

1. En el proyecto que usás hoy: **Dominios personalizados** → quitá `impulsovm.com.ar` (y `www.impulsovm.com.ar`, si está).
2. En el proyecto nuevo, `impulsovm-git`: **Dominios personalizados** → **Configurar un dominio** → agregá `impulsovm.com.ar` (y `www`, si lo usabas).
3. Cloudflare ajusta el DNS solo. El sitio puede tardar unos minutos en volver a responder.
4. Abrí https://impulsovm.com.ar y https://impulsovm.com.ar/og.png para confirmar.

El proyecto viejo podés borrarlo después de unos días, cuando veas que todo anda.

## Cómo funciona desde ahí

- **Jueves a la noche:** Claude investiga la semana, actualiza `index.html`, crea `ediciones/AAAA-MM-DD.html` y lo sube a GitHub. Cloudflare publica solo en uno o dos minutos.
- **Te llega un aviso** con la tabla de cambios y la lista de datos dudosos. Tenés hasta el viernes a las 7 para pedir correcciones.
- **Viernes de 7 a 8:** el script de Google guarda la copia en Drive y manda los mails, como hasta ahora.
- **Si querés subir algo a mano**, ya no se arrastra a Cloudflare: pedímelo y lo subo a GitHub.

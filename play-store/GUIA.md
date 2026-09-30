# Impulso VM en Google Play: guía paso a paso

La app de Android muestra el sitio `https://impulsovm.com.ar` a pantalla completa (es una
"Trusted Web Activity"). Por eso no hay que volver a subirla a la tienda cada viernes: se
actualiza sola cuando actualizás la página.

- **Nombre del paquete (ID de la app):** `ar.com.impulsovm.app`. Una vez publicado no se puede cambiar.
- **Costo:** USD 25, un solo pago (cuenta de desarrollador de Google Play).

---

## Paso 1. Subir el sitio con los archivos de la app

Subí a tu hosting, en la raíz del dominio:

```
index.html
privacidad.html
manifest.webmanifest
sw.js
favicon.png
apple-touch-icon.png
linkedin.png
icons/icon-192.png
icons/icon-512.png
icons/maskable-512.png
.nojekyll            (solo importa si usás GitHub Pages; en otros hostings no molesta)
```

Comprobá que estas direcciones abran bien desde el navegador:

- https://impulsovm.com.ar/manifest.webmanifest
- https://impulsovm.com.ar/privacidad.html

## Paso 2. Generar el paquete de Android con PWABuilder (gratis)

1. Entrá a **https://www.pwabuilder.com**, escribí `https://impulsovm.com.ar` y tocá **Start**.
2. Tocá **Package for stores**, después **Android** y después **Generate Package**.
3. En las opciones completá:
   - **Package ID:** `ar.com.impulsovm.app`
   - **App name:** `Impulso VM` · **Launcher name:** `Impulso VM`
   - **Theme color / Background color / Navigation bar color:** `#FBF6EA`
   - **Signing key:** *Create new* (nombre y datos tuyos)
4. Descargá el `.zip`. Adentro vienen:
   - `app-release-signed.aab` → es lo que se sube a Google Play.
   - `signing.keystore` y `signing-key-info.txt` → **la llave de tu app y sus contraseñas.**
     Guardalas en dos lugares seguros (por ejemplo, Google Drive y un pendrive). Sin ellas no
     vas a poder publicar actualizaciones de la app.
   - `assetlinks.json` → lo usás en el paso 3.

## Paso 3. Demostrarle a Google que el sitio es tuyo

Subí el `assetlinks.json` del zip a tu hosting, en esta ruta exacta:

```
https://impulsovm.com.ar/.well-known/assetlinks.json
```

La carpeta se llama `.well-known`, con el punto adelante. Si este archivo falta o está mal,
la app se abre igual, pero muestra una barra con la dirección web arriba, como un navegador.

## Paso 4. Crear la cuenta y la app en Google Play Console

1. Entrá a **https://play.google.com/console**, creá la cuenta de desarrollador (USD 25) y completá
   la verificación de identidad que te pida Google.
2. **Crear app:** nombre `Impulso VM`, idioma español (Latinoamérica), tipo *App*, *Gratis*.
3. **Importante, la segunda huella digital:** Google vuelve a firmar la app con su propia llave
   (se llama "Play App Signing"). Después de subir el `.aab` por primera vez:
   - Andá a **Configuración → Integridad de la app → Firma de apps**.
   - Copiá el **certificado SHA-256 de la clave de firma de apps**.
   - Agregalo al `assetlinks.json` de tu sitio, al lado del que ya estaba (quedan los dos en la
     lista `sha256_cert_fingerprints`). Si no lo hacés, en la versión descargada de la tienda
     aparece la barra con la dirección.
4. **Prueba cerrada:** las cuentas personales nuevas tienen que probar la app con un grupo de
   testers durante un tiempo antes de poder publicarla para todos. Play Console te muestra la
   cantidad exacta de testers y de días que te exige. Sumá a amigos o colegas con cuenta de Google.

## Paso 5. Completar la ficha de la tienda

Usá los textos de abajo y los archivos de esta carpeta:

| Campo de Play Console | Qué poner |
|---|---|
| Ícono de la app (512×512) | `icons/icon-512.png` |
| Gráfico de funciones (1024×500) | `play-store/banner-1024x500.png` |
| Capturas de teléfono | las 7 de `play-store/capturas/` (mínimo 2, máximo 8) |
| Categoría | Noticias y revistas |
| Política de privacidad | `https://impulsovm.com.ar/privacidad.html` |
| Anuncios | No, la app no tiene anuncios |
| Público objetivo | Mayores de 18 años (no está dirigida a niños) |
| Clasificación de contenido | Completá el cuestionario: app de noticias, sin violencia, sin contenido sensible |
| Correo de contacto | El que quieras mostrar en la ficha (es obligatorio) |

### Nombre de la app (máximo 30 caracteres)

```
Impulso VM: Vaca Muerta
```

### Descripción breve (máximo 80 caracteres)

```
Producción, exportaciones, empresas y noticias de Vaca Muerta, cada viernes.
```

### Descripción completa

```
Impulso VM es un seguimiento semanal de Vaca Muerta, pensado para entender en pocos minutos qué pasó en la cuenca y por qué importa.

Todos los viernes actualizamos los datos oficiales del INDEC y la Secretaría de Energía, y resumimos los hechos que marcaron la semana.

QUÉ VAS A ENCONTRAR
• La semana en cinco puntos: lo más importante, arriba de todo.
• Balanza energética: el superávit mes a mes y el acumulado del año.
• Exportaciones e importaciones: cuánto vende y cuánto compra el sector.
• Producción: petróleo del país y el aporte de Vaca Muerta.
• Empresas: quién lidera la actividad en la cuenca.
• Infraestructura y RIGI: oleoductos, GNL y las grandes inversiones.
• La semana: el hecho, la pregunta abierta y las notas más relevantes, con link a cada medio.
• El termómetro del viernes: riesgo país, precios y lo que viene.

POR QUÉ IMPULSO VM
• Datos de fuentes oficiales, con la fuente indicada en cada gráfico.
• Lectura rápida: gráficos claros y textos cortos.
• Funciona sin conexión con la última edición que abriste.
• Gratis y sin anuncios.

Impulso VM es un proyecto independiente. No está afiliado a ninguna empresa ni organismo público.
```

### Seguridad de los datos (formulario "Data safety")

Respuestas que coinciden con la política de privacidad del sitio. Revisalas antes de enviar:

- **¿La app recopila o comparte datos?** Sí, recopila.
- **Información personal → Dirección de correo electrónico:** se recopila, no se comparte;
  es **opcional** (solo si te suscribís); finalidad: *comunicaciones del desarrollador*.
- **Actividad en la app → Interacciones con la app**, y **Dispositivo u otros IDs:** se recopilan
  con Google Analytics, no se comparten; finalidad: *estadísticas (analytics)*.
- **¿Los datos se encriptan en tránsito?** Sí (HTTPS).
- **¿Los usuarios pueden pedir que se borren sus datos?** Sí, por el contacto indicado en la política
  de privacidad.

> Esta guía no es asesoramiento legal. Si más adelante sumás funciones (notificaciones,
> cuentas de usuario, anuncios), hay que actualizar la política de privacidad y este formulario.

# Envío semanal automático de Impulso VM

Un script de Google que, cada vez que subís una edición nueva al sitio:

1. guarda una copia del HTML en Drive, en **Impulso VM › Ediciones**, con la fecha como nombre (`2026-10-16.html`);
2. manda el mail de aviso a cada persona de la lista, con su nombre, el titular de la semana y **el link directo, sin redirección de Google**.

Revisa el sitio todos los días a las 20 h. Si la edición no cambió, no hace nada; por eso nunca manda dos veces la misma.

Se configura **una sola vez**. Tarda unos 10 minutos.

---

## Paso 1. Compartir la carpeta de Drive con la cuenta de Impulso VM

La carpeta *Ediciones* está en tu Drive personal (chapa.uca23@gmail.com) y el script va a correr desde impulsovm1@gmail.com, que es la cuenta que manda los mails.

1. Entrá a Drive con **chapa.uca23@gmail.com** y abrí *Impulso VM*.
2. Clic derecho sobre la carpeta **Ediciones** → **Compartir**.
3. Escribí `impulsovm1@gmail.com`, elegí **Editor** y tocá **Enviar**.

## Paso 2. Crear el script

1. Entrá a **script.google.com** con la cuenta **impulsovm1@gmail.com**.
2. Tocá **Nuevo proyecto**. Arriba a la izquierda, cambiale el nombre a `Impulso VM semanal`.
3. Borrá todo lo que aparece en el editor y pegá el contenido completo de `impulso_semanal.gs`.
4. Tocá el ícono de **guardar** (o Ctrl+S / Cmd+S).

## Paso 3. Probar (solo te llega a vos)

El script viene con `MODO_PRUEBA = true`: el mail solo sale para Juan, la primera persona de la lista.

1. Arriba, en el menú desplegable de funciones, elegí **revisarEdicion** y tocá **Ejecutar**.
2. La primera vez Google te pide permisos: **Revisar permisos** → elegí impulsovm1@gmail.com → **Configuración avanzada** → **Ir a Impulso VM semanal (no seguro)** → **Permitir**. Ese "no seguro" aparece porque el script es tuyo y no está publicado; es normal.
3. Revisá:
   - que te haya llegado el mail a juandelacruzschia@gmail.com y que el link abra **directo** el sitio;
   - que en Drive, en *Ediciones*, esté el archivo con la fecha de la edición.

## Paso 4. Activarlo para toda la lista

1. En el código, cambiá `const MODO_PRUEBA = true;` por `const MODO_PRUEBA = false;` y guardá.
2. En el menú de funciones elegí **instalarDisparador** y tocá **Ejecutar** (una sola vez).

Listo. Desde ahora, el día que subas el `index.html` nuevo, a las 20 h se guarda la copia y salen los 7 mails.

**Si la edición que hoy está en el sitio ya la mandaste a mano**, antes del paso 4.2 corré una vez **marcarEdicionActualComoEnviada**: la deja como enviada sin mandar mails, y el primer envío automático sale con la edición siguiente. Si no la mandaste, salteá esto y a las 20 h sale para toda la lista.

---

## Uso del día a día

- **No tenés que hacer nada.** Subís el `index.html` como siempre y a las 20 h sale todo solo.
- **Si querés que salga antes de las 20 h:** entrá a script.google.com, abrí el proyecto, elegí **revisarEdicion** y tocá **Ejecutar**.
- **Sumar o sacar gente:** editá la lista `DESTINATARIOS` en el código y guardá.
- **Reenviar la edición actual:** corré **olvidarUltimaEdicion** y después **revisarEdicion**.
- **Ver qué hizo:** en el menú de la izquierda, **Ejecuciones** muestra cada corrida y su registro.
- **Ya no hace falta pedirme los borradores** de cada viernes.

## Si algo falla

- *"El sitio respondió con error 403"*: Cloudflare está bloqueando al script. En Cloudflare, revisá que **Bot Fight Mode** siga apagado.
- *"No encontré la fecha de la edición"*: el `index.html` del sitio no tiene la línea `const EDICION = '...'`. No la borres al editar.
- *Error de permisos sobre la carpeta*: falta el paso 1 (compartir *Ediciones* con impulsovm1@gmail.com como Editor).

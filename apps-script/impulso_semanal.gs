/*
  Impulso VM · Envío semanal automático
  -------------------------------------
  Qué hace, todos los viernes a las 8 h:
    1. Mira el sitio y lee la fecha de la edición (const EDICION).
    2. Si es una edición nueva:
       - guarda una copia del HTML en la carpeta "Ediciones" de Drive, con la fecha como nombre;
       - le manda el mail de aviso a cada persona de la lista, con su nombre y el link directo.
    3. Si la edición es la misma de la última vez, no hace nada.

  Se instala UNA sola vez, desde la cuenta impulsovm1@gmail.com. Ver los pasos en
  apps-script/INSTRUCCIONES.md.
*/

const SITIO = 'https://impulsovm.com.ar/';
const CARPETA_ID = '1HmsOTGoNqCtolvst8yMsT-atQ79UX_EE';   // Drive: Impulso VM > Ediciones

// true  = solo le manda el mail a la primera persona de la lista (para probar).
// false = le manda a toda la lista.
const MODO_PRUEBA = true;

// Lista de envío: [nombre, email]. Para sumar o sacar gente, editá estas líneas.
const DESTINATARIOS = [
  ['Juan',     'juandelacruzschia@gmail.com'],
  ['Eduardo',  'egomez@ceira.com.ar'],
  ['Fernando', 'fernandodggonza@gmail.com'],
  ['Santiago', 'santis100@hotmail.com'],
  ['Federico', 'fdetomaso@udesa.edu.ar'],
  ['Timoteo',  'timoteo.auza@gmail.com'],
  ['Santiago', 's.acuna@aqcapital.com.ar'],
];

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
               'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/* Función principal: la corre el disparador automático. También podés correrla a mano. */
function revisarEdicion() {
  const html = leerSitio();
  const edicion = extraer(html, /const EDICION = '(\d{4}-\d{2}-\d{2})'/);
  if (!edicion) throw new Error('No encontré la fecha de la edición (const EDICION) en el sitio.');

  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('ultimaEdicion') === edicion) {
    Logger.log('Sin edición nueva. La última enviada es la del ' + edicion + '.');
    return;
  }

  guardarEnDrive(edicion, html);
  avisarPorMail(edicion, html);

  // En modo prueba no se marca como enviada, así después sale para toda la lista.
  if (!MODO_PRUEBA) props.setProperty('ultimaEdicion', edicion);
}

function leerSitio() {
  const r = UrlFetchApp.fetch(SITIO + '?copia=' + Date.now(), {muteHttpExceptions: true, followRedirects: true});
  if (r.getResponseCode() !== 200) throw new Error('El sitio respondió con error ' + r.getResponseCode() + '.');
  return r.getContentText('UTF-8');
}

function guardarEnDrive(edicion, html) {
  const carpeta = DriveApp.getFolderById(CARPETA_ID);
  const nombre = edicion + '.html';
  if (carpeta.getFilesByName(nombre).hasNext()) {
    Logger.log('La copia ' + nombre + ' ya estaba en Drive.');
    return;
  }
  carpeta.createFile(nombre, html, MimeType.HTML);
  Logger.log('Guardada en Drive: ' + nombre);
}

function avisarPorMail(edicion, html) {
  const fecha = fechaLarga(edicion);                       // ej.: viernes 16 de octubre de 2026
  const fechaAsunto = fecha.replace(/ de \d{4}$/, '');     // ej.: viernes 16 de octubre
  const titular = textoPlano(extraer(html, /<meta property="og:title" content="([^"]*)"/) || '');
  const bajada = textoPlano(extraer(html, /<meta property="og:description" content="([^"]*)"/) || '');
  const asunto = 'Impulso VM | Actualización del ' + fechaAsunto;

  const lista = MODO_PRUEBA ? DESTINATARIOS.slice(0, 1) : DESTINATARIOS;
  lista.forEach(([nombre, email]) => {
    const texto =
      'Hola ' + nombre + ',\n\n' +
      'Te escribimos para avisarte que ya se encuentra disponible la actualización semanal de Impulso VM correspondiente al ' + fecha + '.\n\n' +
      (titular ? 'Esta semana: ' + titular + '. ' + bajada + '\n\n' : '') +
      'Podés revisar todos los gráficos interactivos, los enlaces a los informes oficiales y mucho más ingresando en:\n' +
      SITIO + '\n\n' +
      '¡Gracias por seguir siendo parte de Impulso VM!\n\n' +
      'Impulso VM · Panel semanal independiente sobre Vaca Muerta y la economía energética.';
    const htmlMail =
      '<p>Hola ' + nombre + ',</p>' +
      '<p>Te escribimos para avisarte que ya se encuentra disponible la <b>actualización semanal de Impulso VM</b> correspondiente al ' + fecha + '.</p>' +
      (titular ? '<p>Esta semana: <b>' + titular + '</b>. ' + bajada + '</p>' : '') +
      '<p>Podés revisar todos los gráficos interactivos, los enlaces a los informes oficiales y mucho más ingresando en:</p>' +
      '<p><a href="' + SITIO + '">' + SITIO + '</a></p>' +
      '<p>¡Gracias por seguir siendo parte de Impulso VM!</p>' +
      '<p><i>Impulso VM · Panel semanal independiente sobre Vaca Muerta y la economía energética.</i></p>';
    GmailApp.sendEmail(email, asunto, texto, {htmlBody: htmlMail, name: 'Impulso VM'});
    Logger.log('Mail enviado a ' + nombre + ' (' + email + ').');
  });
}

/* Instala el disparador: revisa el sitio los viernes a las 8 h. Correla UNA sola vez.
   Google lo ejecuta en algún momento entre las 8 y las 9. */
function instalarDisparador() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('revisarEdicion').timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(8).create();
  Logger.log('Listo: el script va a revisar el sitio todos los viernes a las 8 h.');
}

/* Marca la edición que hoy está en el sitio como ya enviada, sin mandar mails.
   Sirve al activar el script, si esa edición ya la mandaste a mano. */
function marcarEdicionActualComoEnviada() {
  const edicion = extraer(leerSitio(), /const EDICION = '(\d{4}-\d{2}-\d{2})'/);
  PropertiesService.getScriptProperties().setProperty('ultimaEdicion', edicion);
  Logger.log('Listo: la edición del ' + edicion + ' queda como enviada. El próximo mail sale con la edición siguiente.');
}

/* Si alguna vez necesitás reenviar la edición actual a toda la lista, corré esta función. */
function olvidarUltimaEdicion() {
  PropertiesService.getScriptProperties().deleteProperty('ultimaEdicion');
  Logger.log('Listo: la próxima revisión va a tratar la edición del sitio como nueva.');
}

/* Sube UNA sola vez las ediciones anteriores al script, tomadas del historial de GitHub.
   No manda mails. Si una ya está en la carpeta, la saltea. */
function guardarEdicionesAnteriores() {
  const BASE = 'https://raw.githubusercontent.com/chapasch1/Impulso-VM/';
  const ANTERIORES = [
    ['2026-09-30', '72f26b120f7643b2fa0a374375739a840a28d74a'],
    ['2026-10-02', '701e265c7ec2543d534d23100954f70bbb23a8cb'],
    ['2026-10-09', '62f67b0239f32b4486d1dc2c22e4c17f8d608e52'],
    ['2026-10-15', 'fb8167ebdf1439ae81fb6fd970865e09a5488bd3'],
  ];
  ANTERIORES.forEach(([edicion, version]) => {
    const r = UrlFetchApp.fetch(BASE + version + '/index.html', {muteHttpExceptions: true});
    if (r.getResponseCode() !== 200) { Logger.log('No pude bajar la edición del ' + edicion + '.'); return; }
    guardarEnDrive(edicion, r.getContentText('UTF-8'));
  });
}

/* ---------- ayudas ---------- */
function extraer(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}
function fechaLarga(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  const f = new Date(a, m - 1, d);
  return DIAS[f.getDay()] + ' ' + d + ' de ' + MESES[m - 1] + ' de ' + a;
}
function textoPlano(s) {
  return s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

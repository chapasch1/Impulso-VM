FECHA DE ESTA EDICIÓN: viernes [DD] de [mes] de [AAAA]
PERÍODO A CUBRIR: los 7 días anteriores a esa fecha, inclusive

Te adjunto el index.html de Impulso VM, un sitio semanal sobre Vaca Muerta. Tu tarea es actualizar el contenido para la edición de esta fecha. No toques el diseño: el trabajo es solo de datos y textos.

## 0. Antes de empezar: guardar la edición anterior
1. Hacé una copia del index.html que te adjunto, tal como está, y llamala edicion-AAAA-MM-DD.html, con la fecha de ESA edición (la que figura en `const EDICION`). Ejemplo: edicion-2026-09-30.html. Va en la misma ubicación que el index.html, sin carpetas.
2. En esa copia:
   - agregá `<meta name="robots" content="noindex, follow">` dentro del <head>;
   - cambiá el <title> a "Impulso VM | Edición del [fecha]";
   - pegá este aviso justo después de <body>:
     <div style="background:#332B1E;color:#FBF6EA;font:600 14px/1.4 system-ui,sans-serif;padding:10px 16px;text-align:center;">Estás viendo una edición anterior, la del [fecha]. <a href="./" style="color:#F0B429;">Ir a la edición actual →</a></div>
3. En el index.html nuevo, sumá esa edición al principio de la lista "Ediciones anteriores" del pie:
   <li><a href="edicion-AAAA-MM-DD.html"><b>DD mes AAAA</b> · tema principal en 3 a 5 palabras</a></li>

## 1. Qué NO tenés que cambiar
- Colores, tipografías, CSS, estructura de secciones ni el orden del menú.
- El código de Google Analytics, la clave de Web3Forms, el formulario de suscripción, la sección de Contacto/LinkedIn, los botones de Compartir, el glosario "Vaca Muerta en un minuto" ni la imagen og.png.
- Las funciones de JavaScript. Solo podés editar estos bloques de datos: EDICION, SUPERAVIT_2026, PRODUCCION_2026, FRACTURAS_2026, FRACTURAS_ACUMULADO, FRACTURAS_PROYECCION y TERMOMETRO.

## 2. Reglas de verificación (lo más importante)
- Cada número, porcentaje y fecha que publiques tiene que coincidir en al menos 3 fuentes independientes.
- Al menos una tiene que ser primaria cuando exista: INDEC, Secretaría de Energía, Ministerio de Energía de Neuquén, Boletín Oficial, Ministerio de Economía, comunicado oficial de la empresa, CNV o la bolsa.
- Dos medios que reproducen el mismo cable (EFE, Reuters, etc.) o el mismo comunicado cuentan como UNA sola fuente.
- Si las fuentes no coinciden, usá la oficial y anotá la diferencia en el reporte.
- Si no conseguís 3 fuentes que coincidan, no cambies el dato: dejá el valor anterior y marcalo como "no verificado" en el reporte.
- Nunca inventes, redondees ni estimes un dato sin avisarlo. Si algo es una estimación o un cálculo propio, tiene que decirlo en la página.
- El INDEC (balanza), la Secretaría de Energía (producción de petróleo y gas) y el relevamiento de fracturas de Luciano Fucello salen una vez por mes. Si esta semana no hubo dato nuevo, no cambies esas secciones y decilo en el reporte.
- Controlá que las notas sean realmente de los últimos 7 días (fecha de publicación, no de actualización) y abrí cada link para confirmar que lleva a la nota correcta. Si no podés abrir un link, decilo en el reporte.

## 3. Hacé tres revisiones antes de entregar
- Revisión 1, relevamiento: buscá todos los datos y noticias de la semana y armá una lista de cada dato con sus fuentes.
- Revisión 2, contraste: dato por dato, confirmá que las 3 fuentes dicen lo mismo, incluidas las unidades (millones o miles de millones, b/d, m³/d o MMm³/d, interanual o mensual).
- Revisión 3, coherencia del HTML. Hacé las cuentas, no las supongas:
  - la suma de los meses de SUPERAVIT_2026 tiene que dar el acumulado de la tabla y de la portada. Si no da, no escribas una cuenta que no cierra: anotalo en el reporte;
  - exportaciones menos superávit tiene que dar las importaciones;
  - los porcentajes de empresas tienen que sumar 100%;
  - la suma de FRACTURAS_2026 tiene que dar FRACTURAS_ACUMULADO, o anotá la diferencia;
  - en Gas, Vaca Muerta + resto de Neuquén + resto del país tiene que dar el total nacional, y los % tienen que sumar 100;
  - un mismo dato tiene que tener el mismo valor en todos los lugares donde aparece (portada, tablas, resumen, gráficos, vista previa);
  - no pueden quedar textos de la semana anterior.

## 4. Qué actualizar, sección por sección
1. Fecha: cambiá SOLO `const EDICION = 'AAAA-MM-DD';`. Se completa sola en la barra superior, en "La semana", en el pie y en el link para compartir. Revisá también cualquier "enero–[mes]" o "[mes] 2026" de los textos.
2. Vista previa al compartir: arriba de todo del archivo, debajo del comentario "VISTA PREVIA AL COMPARTIR", reemplazá el titular y la bajada en estas 5 etiquetas por los de la edición nueva (los mismos textos que el h1 y la bajada de la portada): <title>, og:title, og:description, twitter:title y twitter:description.
3. Números animados: los que tienen `<span data-count>` se escriben una sola vez, el número que se ve, con formato argentino. Ejemplo: `USD <span data-count>10.667</span>`.
4. Portada:
   - el título chico (tema), el titular y la bajada, sobre el hecho más importante de los últimos 7 días;
   - "La semana en cinco puntos": 5 oraciones cortas con lo más importante, cada una con su link "Ver más →" a la sección que corresponde;
   - las 3 cifras de "Los números de [mes]" con el último dato oficial disponible.
5. Balanza energética:
   - si hay dato nuevo del INDEC, agregá el mes a SUPERAVIT_2026;
   - actualizá la tabla del acumulado y el texto del gráfico (con fecha de publicación del INDEC);
   - revisá que el título de la sección siga siendo cierto.
6. Exportaciones e importaciones: las 4 cifras (mes y acumulado), qué productos explican cada flujo y el peso de la energía en el superávit comercial total.
7. Producción (petróleo):
   - completá PRODUCCION_2026 con los meses publicados (reemplazá los null solo con datos verificados);
   - actualizá la tabla "La cuenca, en [mes]".
8. Gas (cuando salga el dato mensual):
   - la cifra grande (producción nacional en MMm³/d) y su variación interanual;
   - la barra "De dónde sale el gas": los anchos (style="width:X%"), los textos de cada tramo, los 3 valores de la leyenda y el aria-label;
   - la tabla "Neuquén, en [mes]" y el recuadro "Por qué importa".
9. Actividad (cuando salga el informe mensual de fracturas, a principios de mes):
   - agregá el mes a FRACTURAS_2026 (reemplazá el null);
   - actualizá FRACTURAS_ACUMULADO y, si cambió, FRACTURAS_PROYECCION;
   - actualizá el texto de fuente debajo de los casilleros.
10. Empresas:
   - los % de participación en etapas de fractura con el último relevamiento publicado, y el ancho de las barras (style="width:X%");
   - los datos de YPF;
   - si cambió el ranking, el texto de la sección.
11. Infraestructura y RIGI:
   - el % de avance del VMOS, en el número y en la barra (width y aria-valuenow);
   - la fecha del primer embarque, la inversión y la "Novedad";
   - si en la semana se aprobó o se presentó un RIGI relevante para Vaca Muerta, agregalo a la tabla con la etiqueta "Nuevo · DD/M". Sacale la etiqueta a los RIGI que ya no son de esta semana;
   - Argentina LNG: estado de la FID, socios y montos.
12. La semana:
   - "El hecho": el motor principal de la semana, en 2 o 3 oraciones;
   - "La pregunta": el interrogante que deja abierto la semana, en una oración;
   - las 5 notas: noticias relevantes sobre Vaca Muerta de los últimos 7 días, de la más nueva a la más vieja, de medios distintos y sin dos notas sobre el mismo hecho. Cada nota lleva fecha, título propio (no copies el del medio), resumen de 1 o 2 oraciones y nombre del medio. El mismo link va en el título y en el botón "Leer nota".
13. El termómetro del viernes:
   - en TERMOMETRO, poné el cierre del viernes y la variación % contra el viernes anterior. Usá SIEMPRE la fuente fija de cada fila como fuente principal: Brent = ICE Londres, WTI = NYMEX, YPF y Vista = NYSE, riesgo país = JP Morgan. Confirmá cada valor con 2 medios más;
   - si un dato no se pudo verificar, dejalo en null (así no se muestra);
   - "La lectura": 2 o 3 oraciones que conecten los números con Vaca Muerta;
   - "Lo que viene": 3 o 4 temas para seguir, con su momento aproximado. No pongas fechas exactas que no estén confirmadas oficialmente.

## 5. Estilo
- Español rioplatense, tono periodístico y sobrio, como un diario económico.
- Titulares que informen un hecho concreto, sin adjetivos exagerados ("histórico", "impresionante", "clave") salvo que sea literalmente un récord.
- No uses rayas largas (—). Usá comas, dos puntos o punto.
- Números con formato argentino en los textos (1.234,5). En los bloques de JavaScript van con punto decimal (930.5) y sin separador de miles (19230).

## 6. Qué me tenés que entregar
1. Dos archivos completos, listos para subir, como archivos descargables (el HTML es muy largo para pegarlo en el chat):
   - index.html (la edición nueva);
   - edicion-AAAA-MM-DD.html (la edición anterior archivada).
   Los dos se suben en el mismo lugar, uno al lado del otro.
2. Una tabla de cambios con estas columnas: Sección | Dato | Valor anterior | Valor nuevo | Fuente 1 | Fuente 2 | Fuente 3 (con links) | Estado (Verificado / Sin cambios / No verificado).
3. Una lista corta de lo que no pudiste confirmar, de las cuentas que no cerraron o de las fuentes que no coincidían, para que yo lo revise antes de publicar.

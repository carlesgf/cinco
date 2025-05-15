// ==UserScript==
// @name           CINCO
// @namespace      https://accesosede.my.salesforce.com/
// @description    Mejoras en CUATRO
// @match          http*://*.force.com/*
// @match          http*://*.salesforce.com/*
// @author         Carles Garcia Floriach (carles.garcia@enel.com)
// @version        1.0
// @require        //https://code.jquery.com/jquery-latest.js
// @grant          GM_addStyle
// @grant          GM_getResourceText
// ==/UserScript==

(function() {
    let debounceTimeout = null;
    const DEBOUNCE_DELAY = 10;

    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            tablaPrerrequisitos();
            tablaEstudios();
            tablaDocumentosEstado();
            tablaDocumentosNombre();
            //expedienteNNSS();
            //expedienteSAT();

        }, DEBOUNCE_DELAY);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    function tablaPrerrequisitos() {
        const tablas = getElementsByXPath("//table[@aria-label = 'Pre-requisitos']");

        for (let i = 0; i < tablas.length; i++) {
            let tabla = tablas[i];

            let spanFrf = getElementsByXPath("*//span[@title = 'Fecha real fin']", tabla)[0];
            if (!spanFrf) continue;
            let posicionFrf = spanFrf.closest('th').cellIndex;

            let filas = getElementsByXPath("*//a[contains(@href,'/a2c')]", tabla);

            for (let j = 0; j < filas.length; j++) {
                let fila = filas[j].closest('tr');

                if (fila) {
                    if (fila.children[posicionFrf].innerText == "") {
                        fila.style.backgroundColor = '#AA000055';
                    } else {
                        fila.style.backgroundColor = '#00AA0055';
                    }
                }
            }
        }
    }

    function tablaEstudios() {
        const tablas = getElementsByXPath("//table[@aria-label = 'Estudios Técnicos']");

        for (let i = 0; i < tablas.length; i++) {
            let tabla = tablas[i];

            let spanEstado = getElementsByXPath("*//span[@title = 'Estado']", tabla)[0];
            if (!spanEstado) continue;
            let posicionEstado = spanEstado.closest('th').cellIndex;

            let filas = getElementsByXPath("*//a[contains(@href,'/006')]", tabla);

            for (let j = 0; j < filas.length; j++) {
                let fila = filas[j].closest('tr');

                if (fila) {
                    if (fila.children[posicionEstado].innerText == "Seleccionado") {
                        fila.style.backgroundColor = '#00AA0055';
                    } else {
                        fila.style.backgroundColor = '#AA000055';
                    }
                }
            }
        }
    }

    function tablaDocumentosEstado() {
        const tablas = getElementsByXPath("//table[starts-with(@aria-label, 'Documentos')]");

        for (let i = 0; i < tablas.length; i++) {
            let tabla = tablas[i];

            let spanEstado = getElementsByXPath("*//span[@title = 'Estado']", tabla)[0];
            if (!spanEstado) continue;
            let posicionEstado = spanEstado.closest('th').cellIndex;

            let filas = getElementsByXPath("*//a[contains(@href,'/a1x')]", tabla);

            for (let j = 0; j < filas.length; j++) {
                let fila = filas[j].closest('tr');

                if (fila) {
                    if (fila.children[posicionEstado].innerText.startsWith("Válido")) {
                        fila.style.backgroundColor = '#00AA0055';
                    } else {
                        fila.style.backgroundColor = '#AA000055';
                    }
                }
            }
        }
    }

    function tablaDocumentosNombre() {
        const tablas = getElementsByXPath("//table[starts-with(@aria-label, 'Documentos')]");

        for (let i = 0; i < tablas.length; i++) {
            let tabla = tablas[i];

            let filas = getElementsByXPath("//span[contains(., 'DAT') and contains(., 'EST')]", tabla);

            for (let j = 0; j < filas.length; j++) {
                let fila = filas[j].closest('td');

                if (fila) {
                    fila.style.backgroundColor = '#7F7FFF7F';
                    fila.style.fontWeight = 700;
                }
            }

            filas = getElementsByXPath("//span[contains(., 'EXPLOT') or contains(., 'EXECUT') or contains(., 'EJECUT') or (contains(., 'INICI') and contains(., 'TERC'))]", tabla);

            for (let j = 0; j < filas.length; j++) {
                let fila = filas[j].closest('td');

                if (fila) {
                    fila.style.backgroundColor = '#00AAAA7F';
                    fila.style.fontWeight = 700;
                }
            }
        }
    }

    function expedienteNNSS() {
        if (window.location.href.includes('a2f'))
        {
            resaltar("Estado", "#FFFF5055");

            resaltar("Descripción del expediente", "#FFFF5055");
            resaltar("Tipo de solicitud", "#FFFF5055");
            resaltar("Subtipo de solicitud", "#FFFF5055");
            resaltar("Potencia Solicitada consumo (kW)", "#FFFF5055");

            resaltar("Fecha de Aceptación", "#FFFF5055");

            let header = getElementsByXPath("//div[contains(@class, 'ge-header_record-home')]");

            for (let i = 0; i < header.length; i++) {
                header[i].style.backgroundColor = "#FFAAAAFF"
            }
        }
    }

    function expedienteSAT() {
        if (window.location.href.includes('a36'))
        {
            resaltar("Dirección Normalizada", "#FFFF5055");
        }
    }

    function resaltar(label, color) {
        let campos = getElementsByXPath("//records-record-layout-item[@field-label = '" + label + "']/div[1]");

        for (let i = 0; i < campos.length; i++) {
            campos[i].style.backgroundColor = color
        }
    }

    function getElementsByXPath(xpath, parent) {
        let results = [];
        let query = document.evaluate(xpath, parent || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = query.snapshotLength; i < length; ++i) {
            results.push(query.snapshotItem(i));
        }
        return results;
    }
})();
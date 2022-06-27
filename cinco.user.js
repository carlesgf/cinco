// ==UserScript==
// @name           CINCO
// @namespace      https://accesosede.my.salesforce.com/
// @description    Mejoras en CUATRO
// @match          http*://*.force.com/*
// @match          http*://*.salesforce.com/*
// @author         Carles Garcia Floriach (carles.garcia@enel.com)
// @version        0.5
// @require        //https://code.jquery.com/jquery-latest.js
// @grant          GM_addStyle
// @grant          GM_getResourceText
// ==/UserScript==

window.setInterval(documentos, 500);
window.setInterval(prerrequisitos, 500);
window.setInterval(estudios, 500);

function documentos() {
    var elements = findByXpath("//a[text()='Descargar']");

    for (var i = 0; i < elements.snapshotLength; i++) {
        elements.snapshotItem(i).href = elements.snapshotItem(i).href.replace('http:', 'https:');
    }

    elements = findByXpath("//span[text()='Válido'] | //lst-formatted-text[text()='Válido']");

    for (i = 0; i < elements.snapshotLength; i++) {
        elements.snapshotItem(i).closest('tr').style.backgroundColor = '#00AA0055';
    }

    elements = findByXpath("//span[text()='No Válido'] | //lst-formatted-text[text()='No válido']");

    for (i = 0; i < elements.snapshotLength; i++) {
        elements.snapshotItem(i).closest('tr').style.backgroundColor = '#AA000055';
    }

    elements = findByXpath("//span[text()='Subiendo'] | //lst-formatted-text[text()='Subiendo']");

    for (i = 0; i < elements.snapshotLength; i++) {
        elements.snapshotItem(i).closest('tr').style.backgroundColor = '#AAAA0055';
    }

    elements = findByXpath("//span[text()='Error Subida'] | //lst-formatted-text[text()='Error Subida']");

    for (i = 0; i < elements.snapshotLength; i++) {
        elements.snapshotItem(i).closest('tr').style.backgroundColor = '#AA000055';
    }
}

function prerrequisitos() {
    var elements = findByXpath("//a[contains(@href,'a2c2o')]");

    for (var i = 0; i < elements.snapshotLength; i++) {
        var fila = elements.snapshotItem(i).closest('tr');

        if (fila) {
            var numColumnas = fila.children.length;
            console.log(fila.children[numColumnas - 3].innerText);
            if (fila.children[numColumnas - 3].innerText == "") {
                fila.style.backgroundColor = '#AA000055';
            } else {
                fila.style.backgroundColor = '#00AA0055';
            }
        }
    }
}

function estudios() {
    var elements = findByXpath("//a[contains(@href,'r/0062o')]");

    for (var i = 0; i < elements.snapshotLength; i++) {
        var fila = elements.snapshotItem(i).closest('tr');

        if (fila) {
            var numColumnas = fila.children.length;

            if (fila.children[numColumnas - 5].innerText == "Seleccionado") {
                fila.style.backgroundColor = '#00AA0055';
            } else {
                fila.style.backgroundColor = '#AAAA0055';
            }
        }
    }
}

function findByXpath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
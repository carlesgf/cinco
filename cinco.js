// ==UserScript==
// @name           CINCO
// @namespace      https://accesosede.my.salesforce.com/
// @description    Mejoras en CUATRO
// @match          https://accesosede.lightning.force.com/*
// @match          https://*.salesforce.com/*
// @match          http://*.salesforce.com/*
// @author         Carles Garcia Floriach (carles.garcia@enel.com)
// @version        0.1
// @require        https://code.jquery.com/jquery-latest.js
// @require        //https://cdn.tailwindcss.com
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

    elements = findByXpath("//span[starts-with(text(),'Válido')] | //lst-formatted-text[starts-with(text(),'Válido')]");

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
    /*while (elementActual) {
        elementActual.style.background = 'red';
        elementActual.href = elementActual.href.replace('http:', 'https:');
        elementActual = elements.iterateNext();
    }
    $("a:contains(Descargar)").each(function() {
        console.log('aa');
        var hrefCorrecto = $(this).attr('href').replace('http:', 'https:');
        $(this).attr('href', hrefCorrecto);
        $(this).css('background-color', 'yellow');
    });
    */
}

function prerrequisitos() {

    var elements = findByXpath("//tr[starts-with(@data-row-key-value,'a2c2o')]");

    for (var i = 0; i < elements.snapshotLength; i++) {
        if (elements.snapshotItem(i).children[5].innerText == "") {
            elements.snapshotItem(i).style.backgroundColor = '#AA000055';
        } else {
            elements.snapshotItem(i).style.backgroundColor = '#00AA0055';
        }
    }

}

function estudios() {

    var elements = findByXpath("//tr[starts-with(@data-row-key-value,'0062o')]");

    for (var i = 0; i < elements.snapshotLength; i++) {
        if (elements.snapshotItem(i).children[4].innerText == "Seleccionado") {
            elements.snapshotItem(i).style.backgroundColor = '#00AA0055';
        } else {
            //elements.snapshotItem(i).style.backgroundColor = '#AA000055';
        }
    }

}

function findByXpath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
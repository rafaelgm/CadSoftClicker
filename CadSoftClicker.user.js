// ==UserScript==
// @name         CadSoftClicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script que (des)marca automaticamente as demais faltas em uma mesma aula.
// @author       Rafael Monteiro
// @match        http://netaplw.unifeso.edu.br/UniversusNet/DigitacaoFaltasDiarias.aspx
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function pad(str, max)
{
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

(function() {
    'use strict';

    // Your code here...
    var nChecks = $("table.GridViewDigitacaoFaltasDiarias > tbody > tr:first > td:nth-child(4) > span").length;

    $('input[type="checkbox"]').click(function() {
        var checked = $(this).is(":checked");

        var text = $(this).attr("id").split("_");
        for (var c = 0; c < nChecks; c++)
        {
            text[10] = "ctl" + pad(c, 2);
            $("input#" + text.join("_")).prop("checked", checked);
        }
    });
})();

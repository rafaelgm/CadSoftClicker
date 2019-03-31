// ==UserScript==
// @name         CadSoftClicker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Script que (des)marca automaticamente as demais faltas em uma mesma aula no sistema do CadSoft.
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

$(document).keydown(function(event){
    if (event.which=="17")
        cntrlIsPressed = true;
});

$(document).keyup(function(){
    cntrlIsPressed = false;
});

var cntrlIsPressed = false;

(function() {
    'use strict';

    // Your code here...
    var nChecks = $("table.GridViewDigitacaoFaltasDiarias > tbody > tr:first > td:nth-child(4) > span").length;
    var nColunas = $("table.GridViewDigitacaoFaltasDiarias > tbody > tr:first > td").length - 3

    $('input[type="checkbox"]').click(function() {
        var checked = $(this).is(":checked");
        var text = $(this).attr("id").split("_");
        if (cntrlIsPressed)
        {
            for (var i = 0; i < nColunas; i++)
                for (var c = 0; c < nChecks; c++)
                {
                    text[9] = "ctl" + pad(i, 2);
                    text[10] = "ctl" + pad(c, 2);
                    $("input#" + text.join("_")).prop("checked", checked);
                }
        }
        else
        {
            for (var c = 0; c < nChecks; c++)
            {
                text[10] = "ctl" + pad(c, 2);
                $("input#" + text.join("_")).prop("checked", checked);
            }
        }
    });

    $('table.GridViewDigitacaoFaltasDiarias > tbody > tr > td').click(function (event) {
        if (!$(event.target).is('input')) {
            var inputs = $(this).find('input');
            if (inputs.attr('id'))
                inputs[0].click();
        }
    });
})();

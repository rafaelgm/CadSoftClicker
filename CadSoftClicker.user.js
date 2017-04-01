// ==UserScript==
// @name         CadSoftClicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script que (des)marca automaticamente as demais faltas em uma mesma aula no sistema do CadSoft.
// @author       Rafael Monteiro
// @match        http://netaplw.unifeso.edu.br/UniversusNet/DigitacaoFaltasDiarias.aspx
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

(function() {
    'use strict';

    // Your code here...

    // $("input#ctl00_ctl00_PrincipalContentPlaceHolder_PrincipalContentPlaceHolder_ctl03_GridAlunos_AlunosRepeater_ctl06_PresencaRepeater_ctl00_ctl00").prop("checked", true);
    var nAlunos = $("table.GridViewDigitacaoFaltasDiarias > tbody > tr").length;
    var nDias = $("table.GridViewDigitacaoFaltasDiarias > tbody > tr:first > td").length - 3;
    var nChecks = $("table.GridViewDigitacaoFaltasDiarias > tbody > tr:first > td:nth-child(4) > span").length;
    
    alert("Teste " + pad(nAlunos, 2) + " " + nDias + " " + nChecks);
    
    //*
    for (var a = 0; a < nAlunos; a++)
    {
        for (var d = 0; d < nDias; d++)
        {
            for (var c = 0; c < nChecks; c++)
            {
                //$("input#ctl00_ctl00_PrincipalContentPlaceHolder_PrincipalContentPlaceHolder_ctl03_GridAlunos_AlunosRepeater_ctl" + pad(a + 1, 2) + "_PresencaRepeater_ctl" + pad(d, 2) + "_ctl" + pad(c, 2)).prop("checked", true);
            }
        }
    }
    
    $('input[type="checkbox"]').click(function() {
        var checked = $(this).is(":checked");
        
        var text = $(this).attr("id").split("_");
        for (var c = 0; c < nChecks; c++)
        {
            text[10] = "ctl" + pad(c, 2);
            $("input#" + text.join("_")).prop("checked", checked);
        }
    });
    
    //*/
    alert("done");
})();
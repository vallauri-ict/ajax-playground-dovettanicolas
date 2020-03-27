"use strict"

$(document).ready(function(){
    //Variables Declaration
    let _richiesta
    let _wFiliali=$("#wFiliali");
    let _lstBanche = $("#lstBanche");
    let _lstFiliali = $("#lstFiliali");
	let _wCorrentisti= $("#wCorrentisti");
    _wCorrentisti.css("display", "none");

    //Branches Loading
    _richiesta = inviaRichiesta("GET", "server/elencoBanche.php" );
	_richiesta.fail(error);
    _richiesta.done(function (data) {
		_wFiliali.css("display", "block");
        for (let filiale of data) {
            $("<option>", {
                "value": filiale.cBanca,
                "text": filiale.nome
            }).appendTo(_lstBanche);
        }
        _lstBanche.prop("selectedIndex", -1);
    });

    //Load New Branches On Switch Of Banck
    _lstBanche.on("change", function () {
        let cBanca = this.value;
        _lstFiliali.html("");
        _wCorrentisti.css("display", "none");
        _richiesta = inviaRichiesta("POST", "server/elencoFiliali.php",  "cBanca=" + cBanca);
        _richiesta.fail(error);
        _richiesta.done(function (data) {
            _wFiliali.css("display", "block");
            for (let record of data)
            {
                $("<option>", {
                    "value": record["cFiliale"],
                    "text": record["nomeFiliale"] + " - " + record["nomeComune"]
                }).appendTo(_lstFiliali);
            }
            //_lstFiliali.prop("selectedIndex", -1);
            _lstFiliali.prop("selectedIndex", 0);
            loadCorrentisti(_lstFiliali.prop("value"));
        });
    });

    //Account Holders Switching On Branches Switch
    _lstFiliali.on("change", function () {
        loadCorrentisti(this.value);
    });

    //Account Holders Loading Table
    function loadCorrentisti(val){
        _richiesta = inviaRichiesta("POST", "server/elencoCorrentisti.php", "cFiliale=" + val);
        _richiesta.fail(error);
        _richiesta.done(function (data) {
            let _table = $("#tCorrentisti tbody");
            _table.html("");
            _wCorrentisti.css("display", "block");
            for (let record of data)
            {
                let _tr = $("<tr>");
                for (let key in record)
                {
                    $("<td>", {"text": record[key]}).appendTo(_tr);
                }
                _tr.appendTo(_table);
            }
            $("#tCorrentisti").DataTable();
        });
    }
});
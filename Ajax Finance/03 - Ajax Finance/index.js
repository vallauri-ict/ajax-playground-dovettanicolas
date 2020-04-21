"use strict"

let beDelete=false;

$(document).ready(function () {
    //alert("Since the key on which this page runs is free, we are not allowed to make more than 5 calls per minute or 500 calls per day.");
    let slctSymbol=$("#slctSymbol");
    slctSymbol.prop("selectedIndex","-1");

    //Creazione chart
    var ctx = document.getElementById('myChart').getContext('2d');
    $.getJSON("http://localhost:3000/chart", function(data){
        var myChart = new Chart(ctx,data);
    });

    //getGlobalQuotes("IBM");
    slctSymbol.on("change",function() {
        if(beDelete)
        {
            deleteRows();
        }
        createRows(0);
        getGlobalQuotes(this.value,0);
    });

    $("#search").on("keyup",function(){
        let str=$("#search").val();

        if(str.length>1)
        {
            if(beDelete)
            {
                deleteRows();
            }
            getGlobalSymbol(str);
        }
        else
        {

        }
    });

    function getGlobalQuotes(symbol,n) {

        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=VMSN8M8PZENUR7OR";//chiave gratuita VMSN8M8PZENUR7OR
        $.getJSON(url,
            function (data) {
                let globalQuoteData = data["Global Quote"];
                $("#symbol"+n).text(globalQuoteData["01. symbol"]);
                $("#previousClose"+n).text(globalQuoteData["08. previous close"]);
                $("#open"+n).text(globalQuoteData["02. open"]);
                $("#lastTrade"+n).text(globalQuoteData["05. price"]);
                $("#lastTradeTime"+n).text(globalQuoteData["07. latest trading day"]);
                $("#change"+n).text(globalQuoteData["09. change"]);
                $("#daysLow"+n).text(globalQuoteData["04. low"]);
                $("#daysHigh"+n).text(globalQuoteData["03. high"]);
                $("#volume"+n).text(globalQuoteData["06. volume"]);
            }
        );
    }

    function getGlobalSymbol(keywords) {

        let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + keywords + "&apikey=VMSN8M8PZENUR7OR";//chiave gratuita VMSN8M8PZENUR7OR
        $.getJSON(url,
            function (data) {
                let vect=data["bestMatches"];
                for(let i=0; i<vect.length-1; i++)
                {
                    createRows(i);
                    getGlobalQuotes(vect[i]["1. symbol"],i);
                }
            }
        );
    }

    function createRows(i)
    {
        let table=$("#table");
        let row=$('<tr class="toDelete">');
        row.append($('<td id="symbol'+i+'"></td>'));
        row.append($('<td id="lastTrade'+i+'"></td>'));
        row.append($('<td id="lastTradeTime'+i+'"></td>'));
        row.append($('<td id="change'+i+'"></td>'));
        row.append($('<td id="open'+i+'"></td>'));
        row.append($('<td id="previousClose'+i+'"></td>'));
        row.append($('<td id="daysLow'+i+'"></td>'));
        row.append($('<td id="daysHigh'+i+'"></td>'));
        row.append($('<td id="volume'+i+'"></td>'));
        row.appendTo(table);
        beDelete=true;
    }

    function deleteRows()
    {
        $(".toDelete").remove();
        beDelete=false;
    }
});
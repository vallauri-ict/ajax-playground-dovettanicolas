"use strict"

let beDelete=false;
let myChart;
let incrementale=false;

$(document).ready(function () {
    $("#download").hide();
    $("#upload").hide();
    $("#file").hide();

    $.getJSON("http://localhost:3000/chart", function(data){
        let ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx,data);
        $("#myChart").hide();
    });

    let slctSymbol=$("#slctSymbol");
    slctSymbol.prop("selectedIndex","-1");

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
            slctSymbol.prop("selectedIndex","-1");
            if(beDelete)
            {
                deleteRows();
            }
            getGlobalSymbol(str);
        }
        else
        {
            if(incrementale)
            {
                deleteRows();
            }
        }
    });

    function getGlobalQuotes(symbol,n)
    {
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

    function getGlobalSymbol(keywords)
    {
        incrementale=true;
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

    $.getJSON("http://localhost:3000/sector", function(data)
    {
        for(let key in data)
        {
            if(key != "Meta Data")
            {
                $("<option>", {
                    text: key,
                    value: key,
                }).appendTo($("#slctSector"));
            }
        }
        $("#slctSector").prop("selectedIndex",-1);
    });

    $("#slctSector").on("change", function(){
        $("#myChart").show();
        let c=this.value;
        let i;
        let ctx = document.getElementById('myChart').getContext('2d');
        myChart.destroy();
        //Creazione chart
        $.getJSON("http://localhost:3000/chart", function(data){
            console.log(c);
            console.log(data);
            console.log(data["data"]["datasets"][0]["data"]);
            $.getJSON("https://www.alphavantage.co/query?function=SECTOR&apikey=VMSN8M8PZENUR7OR",function(data2){
                i=0;
                for(let key in data2[c])
                {
                    data["data"]["labels"][i]=key;
                    data["data"]["datasets"][0]["data"][i]=data2[c][key].replace("%","");
                    i++;
                }
                console.log(data["data"]);
                myChart = new Chart(ctx,data);
                $("#download").show();
                $("#upload").show();
                $("#file").show();
            });
        });
    });

    $("#download").on("click", function(){
        let url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
        let a =  document.getElementById("download");
        a.href = url_base64jp;
    });

    $("#upload").on("click", function(){
        // client id of the project
        let clientId = "841441706255-6rei3amskonf6g98gmj2k21u95q30o17.apps.googleusercontent.com";
        // redirect_uri of the project
        let redirect_uri = "http://127.0.0.1:8080/uploadDrive/upload.html";
        // scope of the project
        let scope = "https://www.googleapis.com/auth/drive";
        // the url to which the user is redirected to
        let url = "";
        // the actual url to which the user is redirected to
        url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirect_uri + "&prompt=consent&response_type=code&client_id=" + clientId + "&scope=" + scope + "&access_type=offline";
        // this line makes the user redirected to the url
        window.location = url;
    });
});
"use strict"

let beDelete=false;
let myChart;

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
            if(beDelete)
            {
                deleteRows();
            }
            getGlobalSymbol(str);
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
            $.getJSON("http://localhost:3000/sector",function(data2){
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
        if ($("#file").val() == "")
        {
            alert("Devi selezionare almento un file.");
            return;
        }
        if (localStorage.getItem("accessToken") === null)
        {
            //logIn
            let urlParams=new URLSearchParams(window.location.search);
            let url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + "http://127.0.0.1:8080"+
            "&prompt=consent&response_type=code&client_id=" + "1038056986277-vut3p867fr1r339rvsphn0jfh3qe009a.apps.googleusercontent.com"+
            "&scope=" + "https://www.googleapis.com/auth/drive" + "&access_type=offline";
            let r_ = inviaRichiesta("POST", "https://www.googleapis.com/oauth2/v4/token",
                {
                    code: urlParams.get('code'),
                    redirect_uri: "http://127.0.0.1:8080/index.html",
                    client_secret: "t7UXoa-PNwRMdW1WGTE4H5iu",
                    client_id: "1038056986277-vut3p867fr1r339rvsphn0jfh3qe009a.apps.googleusercontent.com",
                    scope: "https://www.googleapis.com/auth/drive",
                    grant_type: "authorization_code"
                }, false);
            r_.done(function (data) {
                localStorage.setItem("accessToken", data.access_token);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("expires_in", data.expires_in);
                window.history.pushState({}, document.title, "index.html");
            });
            window.location = url;
        }
        else {
            let file = $("#file")[0].files[0];
            let upload_ = new Upload(file).doUpload();
            upload_.done(function (data){
                alert("Caricamento effettuato con successo.");
            }).fail(function (){
                alert("Errore durante il caricamento. Caricamento del file interrotto, riprolete.");
            });
        }
    });

    let Upload = function (file) {
        this.file = file;
    };

    Upload.prototype.getType = function () {
        localStorage.setItem("type", this.file.type);
        return this.file.type;
    };

    Upload.prototype.getSize = function () {
        localStorage.setItem("size", this.file.size);
        return this.file.size;
    };

    Upload.prototype.getName = function () {
        return this.file.name;
    };

    Upload.prototype.doUpload = function () {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);

        return $.ajax({
            type: "POST",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));

            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data: {
                uploadType: "media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };
});
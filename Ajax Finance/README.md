# Ajax Finance
## Dovetta Nicolas, 4^B Informatica - I.I.S. "G. Vallauri" Fossano

In questo progetto Andiamo a prendere dei dati da [AlphaVantage](http://alphavantage.co) e gli rielaboriamo a seconda di cosa dobbiamo fare. Purtroppo, avendo una chiave gratuita, le chiamate che si possono effettuare ad esso __*sono limitate a 5/1 min e 500 al giorno*__. Per ovviare a parte di questo problema usiamo dei moduli node.js quali [json-server](https://www.npmjs.com/package/json-server) (sul db.json) e [http-server](https://www.npmjs.com/package/http-server). Pertanto l'esercizio funzionerà completamente solo con questi 2 moduli attivi nella sua directory e, con il secondo, **_solo sull'indirizzo http://127.0.0.1:8080_**, per un problema dovuto all'asegnamento dinamico degli indirizzi e quindi l'impossibilità di prevedere quali saranno assegnati.


### Selezione di un'azienda specifica o ricerca incrementale a partire dal secondo carattere

La prima funzione di questo progetto è quella di, tramite un casella di selezione a discesa, andare a inserire in una tabella i dati relativi all'azienda specificata utilizzando l'API ["GLOBAL_QUOTE"](https://www.alphavantage.co/documentation/), mentre, se si scrive nella casella di ricerca, **da quando si scriverà il secondo carattere** l'applicazione ricercherà i risultati su alphavantage tramite l'API "SYMBOL_SEARCH" e, tramite un'altra chiamata alla prima API caricherà i dati nella tabella.

```javascript

    function getGlobalQuotes(symbol,n)
    {
        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=demo";
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
        let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + keywords + "&apikey=demo";
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
```

Per fare in modo che, tutte le volte che si modifichi la tabella non si vada a modificare dati vecchi o che si lascino dati vecchi, tutte le volte che dobbiamo modificare dei dati cancelliamo tutte le righe della tabella, tranne l'intestazione, e poi le ricreiamo con i dati che ci servono.

```javascript
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
```


### Creazione di un grafico in base ai dati dei settori

Nella seconda parte del progetto carichiamo dinamicamente i nomi dei settori, salvati sul db.json, in una casella a discesa e, una volta selezionato il settore che ci interessa l'applicazione creerà un grafico con i dati presi al momento su AlphaVantage. Per fare ciò usiamo l'API "SECTOR".

```javascript
//Creazione del grafico
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
            $.getJSON("https://www.alphavantage.co/query?function=SECTOR&apikey=demo",function(data2){
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
```


### Download del grafico sotto forma di immagine e upload di un file su google drive

Per scaricare il grafico, posto all'interno di un canvas, prima si preme sul bottone blu, sotto al grafico a sinistra, e po la funzione converte in una stringa di dati il canvas e poi, dopo aver impostato come valore nell'href del tag a ciò che ne risulta della conversione, scarica l'immagine.

```javascript
    let url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
    let a =  document.getElementById("download");
    a.href = url_base64jp;
```

Mentre per l'upload su Google Drive di un file si preme sul bottone blu (sotto il grafico a destra), l'applicazione web utilizza una API di Google, che ha bisogno, in alcune sue parti, dell'abilitazione di alcuni link e, al momento, l'unico abilitato è, riprendendo il discorso iniziale, http://127.0.0.1:8080. Utilizza in oltre anche altre pagine, non utilizzando la pagina principale. Bisogna aggiungere alcune credenziali che vengono date al momento dell'iscrizione al programma per le Google API e poi bisogna gestirlo tramite alcuni passaggi. I passaggi e il codice utilizzato in questa parte è stato preso e, successivamente, in parte modificato, dal sito "https://codingshiksha.com/how-to-upload-files-to-google-drive-in-javascript-using-google-drive-rest-api-v3"

#### Primo passaggio: reindirizzamento alla pagina di login
In questo passaggio si viene reinderizzati alla pagina che si occupa del login con la mail desiderata per il salvataggio del/dei file.

```javascript
    // client id of the project
    let clientId = "***************************************************************************";

    // redirect_uri of the project
    let redirect_uri = "ttp://127.0.0.1:8080/uploadDrive/upload.html";

    // scope of the project
    let scope = "************************************";

    // the url to which the user is redirected to
    // the actual url to which the user is redirected to
    let url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirect_uri + "&prompt=consent&response_type=code&client_id=" + clientId + "&scope=" + scope + "&access_type=offline";

    // this line makes the user redirected to the url
    window.open(url);
```

#### Secondo passaggio: reindirizzamento post-autenticazione
Dopo l'autenticazione si viene reindirizzati alla pagina che si occuperà di effettuare il caricamento

#### Terzo passaggio: caricamento dei file su Google Drive
Una volta completata la procedura di autenticazione si aprirà una pagina con un pulsante e un componente apposito per la selezione del file. Dopo aver scelto il file si clicca sul pulsante.

```javascript
$("#upload").on("click", function (e) {
        let file = $("#files")[0].files[0];
        let upload = new Upload(file);
        upload.doUpload();
        window.close();
    });

    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {
            code: code,
            redirect_uri: redirect_uri,
            client_secret: client_secret,
            client_id: client_id,
            scope: scope,
            grant_type: "authorization_code"
        },
        dataType: "json",
        success: function (resultData) {
            localStorage.setItem("accessToken", resultData.access_token);
            localStorage.setItem("refreshToken", resultData.refreshToken);
            localStorage.setItem("expires_in", resultData.expires_in);
            window.history.pushState({}, document.title, "/GitLoginApp/" + "upload.html");
        }
    });
```
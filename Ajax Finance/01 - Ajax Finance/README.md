# 01 - Ajax Finance
## Dovetta Nicolas, 4^B Informatica - I.I.S. "G. Vallauri" Fossano

Using the API GLOBAL_QUOTE by [Alpha Vantage](https://www.alphavantage.co/documentation/#latestprice) we are able to take some data of some comanies and we put it in the table.
Alpha Vantage gave you the opportunity to get your [free key](https://www.alphavantage.co/support/#api-key) that encrase your test possibility.

### Code explenation
First we set the URL and substitute the apikey "demo" with ours, then we take a JSON by the link and put the data to the respective cell.
```javascript
let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=demo";
    $.getJSON(url,
        function (data) {
            $("#symbol").text(data["Global Quote"]["01. symbol"]);
            let globalQuoteData = data["Global Quote"];
            $("#previousClose").text(globalQuoteData["08. previous close"]);
            $("#open").text(globalQuoteData["02. open"]);
            $("#lastTrade").text(globalQuoteData["05. price"]);
            $("#lastTradeTime").text(globalQuoteData["07. latest trading day"]);
            $("#change").text(globalQuoteData["09. change"]);
            $("#daysLow").text(globalQuoteData["04. low"]);
            $("#daysHigh").text(globalQuoteData["03. high"]);
            $("#volume").text(globalQuoteData["06. volume"]);
        }
    );
```
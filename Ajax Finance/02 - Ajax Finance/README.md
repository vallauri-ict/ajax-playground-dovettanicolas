# 01 - Ajax Finance
## Dovetta Nicolas, 4^B Informatica - I.I.S. "G. Vallauri" Fossano

Using the API GLOBAL_QUOTE by [Alpha Vantage](https://www.alphavantage.co/documentation/#latestprice) we are able to take some data of some comanies and we put it in the table.
Alpha Vantage gave you the opportunity to get your [free key](https://www.alphavantage.co/support/#api-key) that encrase your test possibility.

### Code explenation
**Based on previous exercise**
By this function when you have more than one letter written down in the tag ```html <intup type="text">``` this function search
all the companies with a symbol that is nearly the same symbol, than it call the [previous exercise]() function and fill the table row.
```javascript
function getGlobalSymbol(keywords) {
        console.log(keywords);
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

If the results of the first URL are more than 5 the code will go in error because the used key is a free one and don't permitt to make more than 5 reques for minute
and no more than 500 in a day.
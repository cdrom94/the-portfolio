// document.querySelector('#amount').addEventListener()
function showLabel(selection, field) {
    document.querySelector(field).value !== "" ? 
    document.querySelector(selection).style.visibility = 'visible'
    : document.querySelector(selection).style.visibility = 'hidden'
}

function dropdownObj(obj){
    for (var currency in obj){
            var newOption = document.createElement('option');
            newOption.innerHTML = currency + ': ' + obj[currency].name;
            newOption.value = currency;
            document.querySelector('#currency').appendChild(newOption);
    }
}
var currencyObj = 
    {AED: {name: 'UAE Dirham', region: 'United Arab Emirates'},
    ARS: {name: 'Argentine Peso', region: 'Argentina'},
    AUD: {name: 'Australian Dollar', region: 'Australia'},
    BGN: {name: 'Bulgarian Lev', region: 'Bulgaria'},
    BRL: {name: 'Brazilian Real', region: 'Brazil'},
    BSD: {name: 'Bahamian Dollar', region: 'Bahamas'},
    CAD: {name: 'Canadian Dollar', region: 'Canada'},
    CHF: {name: 'Swiss Franc', region: 'Switzerland'},
    CLP: {name: 'Chilean Peso', region: 'Chile'},
    CNY: {name: 'Chinese Renminbi', region: 'China'},
    COP: {name: 'Colombian Peso', region: 'Colombia'},
    CZK: {name: 'Czech Koruna', region: 'Czech Republic'},
    DKK: {name: 'Danish Krone', region: 'Denmark'},
    DOP: {name: 'Dominican Peso', region: 'Dominican Republic'},
    EGP: {name: 'Egyptian Pound', region: 'Egypt'},
    EUR: {name: 'Euro', region: 'European Union'},
    FJD: {name: 'Fiji Dollar', region: 'Fiji'},
    GBP: {name: 'Pound Sterling', region: 'United Kingdom'},
    GTQ: {name: 'Guatemalan Quetzal', region: 'Guatemala'},
    HKD: {name: 'Hong Kong Dollar', region: 'Hong Kong'},
    HRK: {name: 'Croatian Kuna', region: 'Croatian'},
    HUF: {name: 'Hungarian Forint', region: 'Hungary'},
    IDR: {name: 'Indonesian Rupiah', region: 'Indonesia'},
    ILS: {name: 'Israeli Shekel', region: 'Israel'},
    INR: {name: 'Indian Rupee', region: 'India'},
    ISK: {name: 'Icelandic Krona', region: 'Iceland'},
    JPY: {name: 'Japanese Yen', region: 'Japan'},
    KRW: {name: 'South Korean Won', region: 'Korea'},
    KZT: {name: 'Kazakhstani Tenge', region: 'Kazakhstan'},
    MXN: {name: 'Mexican Peso', region: 'Mexico'},
    MYR: {name: 'Malaysian Ringgit', region: 'Malaysia'},
    NOK: {name: 'Norwegian Krone', region: 'Norway'},
    NZD: {name: 'New Zealand Dollar', region: 'New Zealand'},
    PAB: {name: 'Panamanian Balboa', region: 'Panama'},
    PEN: {name: 'Peruvian Nuevo Sol', region: 'Peru'},
    PHP: {name: 'Philippine Peso', region: 'Philippines'},
    PKR: {name: 'Pakistani Rupee', region: 'Pakistan'},
    PLN: {name: 'Polish Zloty', region: 'Poland'},
    PYG: {name: 'Paraguayan Guarani', region: 'Paraguay'},
    RON: {name: 'Romanian Leu', region: 'Romania'},
    RUB: {name: 'Russian Ruble', region: 'Russian Federation'},
    SAR: {name: 'Saudi Riyal', region: 'Saudi Arabia'},
    SEK: {name: 'Swedish Krona', region: 'Sweden'},
    SGD: {name: 'Singapore Dollar', region: 'Singapore'},
    THB: {name: 'Thai Baht', region: 'Thailand'},
    TRY: {name: 'Turkish Lira', region: 'Turkey'},
    TWD: {name: 'New Taiwan Dollar', region: 'Taiwan'},
    UAH: {name: 'Ukrainian Hryvnia', region: 'Ukraine'},
    USD: {name: 'US Dollar', region: 'United States'},
    UYU: {name: 'Uruguayan Peso', region: 'Uruguay'},
    ZAR: {name: 'South African Rand', region: 'South Africa'}};
dropdownObj(currencyObj);
//make sure input is valid, number is not too long
function conversion() {
    var amount = document.querySelector('#amount').value,
        currency = document.querySelector('#currency').value;
    // fetch( "../.netlify/functions/token-hider/token-hider" + '/latest/' + currency)
    // fetch(  "https://v6.exchangerate-api.com/v6/" + process.env.API_TOKEN + '/latest/' + currency)
    fetch( ".../.netlify/functions/token-hider/token-hider.js")
        .then(response => {
            return response.json();
        })
        .then(data => {
            updateDOM(amount, data);
        })
        .catch(() => {
            document.querySelector('#results').innerHTML = 'Sorry. There was an error, please try again later.'; 
        });
}
function updateDOM(amount, data) {
    var lastUpdate = new Date(data.time_last_update_unix * 1000),
        options = {hour: 'numeric', minute: '2-digit', day: '2-digit', month: 'long', year: 'numeric', timeZoneName: 'short' },
        conversions = data.conversion_rates;
    document.querySelector('#results').innerHTML = ''; 
    document.querySelector('#results').style.backgroundColor = 'rgba(255, 255, 255, 0.521)';
    document.querySelector('#update-date').innerHTML = 'As of ' + lastUpdate.toLocaleDateString('en-US',options);
    for (var conv in conversions){
        var newConversion = document.createElement('div'),
            newCurrency = document.createElement('p'),
            newExchange = document.createElement('p'),
            currencyOptions = {style: 'currency', currency: conv, currencyDisplay: 'symbol'},
            conversion;
            if (conv === 'DKK'|| conv === 'NOK' || conv === 'SEK'){
                conversion = (conversions[conv] * amount).toFixed(2) + ' kr';
            }
            else {
                conversion = new Intl.NumberFormat('en-US',currencyOptions).format((conversions[conv] * amount));
            }
        newCurrency.innerHTML = currencyObj[conv].name + ' (' + conv + ')';
        newExchange.innerHTML = conversion;
        newConversion.id = conv;
        newConversion.className = 'currency-conversion';
        newCurrency.className = 'currency-symbol';
        newExchange.className = 'currency-exchange';
        newConversion.appendChild(newCurrency);
        newConversion.appendChild(newExchange);
        document.querySelector('#results').appendChild(newConversion);
        document.querySelector("#filter").style.display = "block";
    }
}
function filterResults(){
    var filter = document.querySelector('#filter').value.toLowerCase(),
        symbols = document.querySelectorAll(".currency-conversion");
    for(i = 0; i < symbols.length; i++){
        if(document.querySelectorAll(".currency-symbol")[i].textContent.toLowerCase().indexOf(filter) > -1) {
            symbols[i].style.display = "";
        }
        else{
            symbols[i].style.display = "none";
        }
    }
}
<!-- FOR BASE CURRENCY  -->

const options = {
method: 'GET',
headers: {accept: 'application/json', 'x_cg_demo_api_key': 'CG-WBiAUmyhrtqMvAUk27pVsTaj'}
};

fetch('https://api.coingecko.com/api/v3/coins/list', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

  <!--CRYPTOCURRENCY BY  MCAP  -->

const options = {
method: 'GET',
headers: {accept: 'application/json', 'x_cg_demo_api_key': 'CG-WBiAUmyhrtqMvAUk27pVsTaj'}
};

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

<!-- EXCHANGE RATES -->

const options = {
method: 'GET',
headers: {accept: 'application/json', 'x_cg_demo_api_key': 'CG-WBiAUmyhrtqMvAUk27pVsTaj'}
};

fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

<!-- pie chart data -->

const options = {
method: 'GET',
headers: {accept: 'application/json', 'x_cg_demo_api_key': 'CG-WBiAUmyhrtqMvAUk27pVsTaj'}
};

fetch('https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

  <!-- main visualization chart -->

const options = {
method: 'GET',
headers: {accept: 'application/json', 'x_cg_demo_api_key': 'CG-WBiAUmyhrtqMvAUk27pVsTaj'}
};

fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

<!--
1 day from current time = 5-minutely data
2 - 90 days from current time = hourly data
above 90 days from current time = daily data (00:00 UTC)

so use suitable library to convert the data into required formate.
 -->

import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

import Coin from './Coin.js';


function App() {

  const [coins,setCoins] =useState([]);
  const [search,setSearch]=useState('');

  useEffect(()=>{

    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data)
    }).catch(error=>console.log("error  while fetching data from api error"+error));

    console.log(coins);
  },[])

  const handleChange=(e)=>{
    setSearch(e.target.value);
  }

  const filteredCoins=coins.filter(coin=>{
   return coin.name.toLowerCase().includes(search.toLowerCase());
  })

  return (
    <div className="coin-app">
    <div className="coin-search">
      <h1 className="coin-text">Crypto Tracker</h1>
      <form>
        <input type="text" placeholder='search... ' className="coin-input" onChange={handleChange}/>
      </form>
    </div>
    {filteredCoins.map(coin=>{
      return <Coin key={coin.id} name={coin.name} image={coin.image} price={coin.current_price}  symbol={coin.symbol} volume={coin.total_volume} priceChange={coin.price_change_percentage_24h} marketcap={coin.market_cap}/>
    })}
    </div>
  );
}

export default App;

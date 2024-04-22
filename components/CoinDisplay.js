import React, { useState, useEffect } from "react";
import CoinCard from "./CoinCard";

function CoinDisplay({ coin }) {
  const [coins, setCoins] = useState([]);

  async function getTopCoinsInfo() {
    const response = await fetch("https://api.coinlore.net/api/tickers/");
    const coinsData = await response.json();
    // console.log(coinsData);
    const top20Coins = await coinsData.data.slice(0, 20);
    // console.log(top20Coins);
    setCoins(top20Coins);
  }

  useEffect(() => {
    getTopCoinsInfo();
  }, []);

  return (
    <div className="home">
      <h1>Top 20 Cryptos</h1>
      <div className="coins-container">
        {/* {coins.map((coin) => ( */}
        {coins.map(({ id, name, symbol, rank, price_usd }) => (
          <CoinCard
            id={id}
            name={name}
            symbol={symbol}
            rank={rank}
            price={price_usd}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}

export default CoinDisplay;

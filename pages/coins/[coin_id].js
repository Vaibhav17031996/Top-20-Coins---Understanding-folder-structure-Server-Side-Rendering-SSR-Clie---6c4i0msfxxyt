import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function CoinDetail() {
  // const [coin, setCoin] = useState(null); // null k case mein dynamic values are : {coins?.name} etc.
  const [coin, setCoin] = useState({}); // & in this case values would be: {coins.name} etc.
  const router = useRouter();
  // console.log(router);

  async function getCoinDetails() {
    // console.log(router.query.coin_id);
    try {
      const response = await fetch(
        `https://api.coinlore.net/api/ticker/?id=${router.query.coin_id}`
      );
      const data = await response.json();
      // console.log(data);
      setCoin(data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (router.isReady && router.query.coin_id) {
      getCoinDetails();
    }
  }, [router.isReady]);

  return (
    <div className="coin-detail">
      <div className="name-symbol">
        <h1 className="name">{coin.name}</h1>
        <h2 className="symbol">{coin.symbol}</h2>
      </div>
      <div className="market-description">
        <p className="coin-rank">Rank: {coin.rank}</p>
        <p className="coin-price">Price: {coin.price_usd}</p>
        <p className="coin-market-cap">Market Cap: {coin.market_cap_usd}</p>
        <p className="coin-total-supply">Total Supply: {coin.tsupply}</p>
        <p className="coin-max-supply">
          Max Supply: {coin.msupply ? coin.msupply : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default CoinDetail;

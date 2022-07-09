import "./coins.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "../coin/Coin";
import Loader from "../loader/Loader";
import ScrollToTop from "react-scroll-to-top";

function Coins() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
        console.log(response.data.coins);
        setIsLoading(true);
        setFiltered(response.data.coins);
      }
    );
  }, []);

  const searchHandler = (event) => {
    setSearchWord(event.target.value);
    const searchCoins = listOfCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFiltered(searchCoins);
  };

  const profitCoinsHandler = () => {
    const profitCoins = listOfCoins.filter((key) => {
      return key.priceChange1d > 0;
    });

    setFiltered(profitCoins);
  };

  const lossCoinsHandler = () => {
    const lossCoins = listOfCoins.filter((key) => {
      return key.priceChange1d < 0;
    });

    setFiltered(lossCoins);
  };

  return (
    <div className="App">
      <ScrollToTop smooth color="rgb(255, 196, 0)" />
      <div className="cryptoHeader">
        <div className="logo">
        <img
          src="http://store-images.s-microsoft.com/image/apps.9133.14263488601983276.beb21534-542c-4a71-92dc-ab81cc3761d8.df9f32c2-b8c8-4215-b075-62ee89945905"
          alt="logo"
        />
        <h1>MyCrypto</h1>
        </div>
      
        <input
          type="text"
          placeholder="search..."
          onChange={searchHandler}
        />
      </div>

      <div className="cryptoDisplay">
        <div className="buttons">
          <button onClick={profitCoinsHandler}>profitable today</button>
          <button onClick={lossCoinsHandler}>loss today</button>
        </div>

        {isLoading ? (
          filtered.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                icon={coin.icon}
                price={coin.price}
                symbol={coin.symbol}
                change={coin.priceChange1d}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Coins;

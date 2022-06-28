import "./coins.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "../coin/Coin";
import Loader from "../loader/Loader";


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
      <div className="cryptoHeader">
        <h1>MyCrypto</h1>
        <input
          type="text"
          placeholder="search here..."
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
          < Loader />
        )}
      </div>
    </div>
  );
}

export default Coins;



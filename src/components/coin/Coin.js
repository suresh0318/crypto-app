import React from "react";

function Coin({ name, icon, price, symbol, change }) {
  const divStyle = {
    color: change < 0 ? "#FF0000" : "#00FF00",
  };

  return (
    <div className="coin">
      <h1> Name: {name}</h1>
      <img src={icon} alt="logo" />
      <h3> Price: {price}</h3>
      <h3> Symbol: {symbol}</h3>
      <h5>
        price change : <span style={divStyle}>{change}</span>
      </h5>
    </div>
  );
}

export default Coin;

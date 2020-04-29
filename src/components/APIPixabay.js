import React, { useState, useEffect } from "react";

import GameSession from './GameSession'
import axios from "axios";

const API_KEY = "16289190-97a0bc0be3bee47cca51d8097";
const query1 = "brazil";
const query2 = "food";

function APIPixabay() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const fetchData = async () => {
  const result = await axios("https://pixabay.com/api/", {
      params: {
        key: API_KEY,
        q: `${query1} + ${query2}`,
        image_type: "photo",
      },
    });
    setData(result.data.hits.slice(0, 8));
    setIsLoaded(!isLoaded);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shuffle = (array) => {
    const _array = array.slice(0)
    for (let i = 0; i < array.length - 1; i++) {
        let randomIndex = Math.floor(Math.random() * (i + 1))
        let temp = _array[i]
        _array[i] = _array[randomIndex]
        _array[randomIndex] = temp
    }
    return _array
}

    const tab1 = data.map((picture, index)=> ({id: index, type: picture.webformatURL}))
    const tab2 = data.map((picture, index)=> ({id: index + 8, type: picture.webformatURL}))
    const cards = [...tab1, ...tab2]
    console.log(shuffle(cards))
    console.log(cards)

  return (
    <div className="App">
      <div>
        <p>Query: {query1}</p>
        <p>Category : {query2}</p>
      </div>
      {isLoaded ? (
        <GameSession shuffledCards={shuffle(cards)}/>
      ) : (
        <div>loading...</div>
      )} 
    </div>
  );
}

export default APIPixabay;
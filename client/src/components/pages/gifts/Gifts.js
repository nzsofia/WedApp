import React, {useState, useEffect} from "react";
import './Gifts.css';

function Gifts() {
  const [gifts, setGifts] = useState({list: []});

  function getGiftList() {
    fetch("http://localhost:9000/gifts")
      .then(res => res.json())
      .then(res => setGifts({list: res.giftList}))
      .catch(err => err);
  }

  useEffect(getGiftList, []);

  return (
    <div>
      <div className="gift-list-container">
        <ul>
          {gifts.list.map((gift) =>
            <li key={gift._id}>{gift.name}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Gifts;

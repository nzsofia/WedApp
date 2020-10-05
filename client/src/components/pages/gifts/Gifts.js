import React, {useState, useEffect} from "react";
import './Gifts.css';
import ListItemWithImage from "../../shared/list-item-with-image/ListItemWithImage";

function Gifts() {
  const [gifts, setGifts] = useState({list: []});

  function getGiftList() {
    fetch("http://localhost:9000/gifts")
      .then(res => res.json())
      .then(res => setGifts({list: res.giftList}))
      .catch(err => err);
  }

  function reserveGift(event, giftId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({giftId: giftId})
    };
    fetch("http://localhost:9000/gifts/reserve", requestOptions)
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(err => err);

    event.preventDefault();
  }

  useEffect(getGiftList, []);

  return (
    <div>
      <div className="gift-list-container">
        {gifts.list.map((gift) => console.log(gifts) ||
          <ListItemWithImage key={gift._id}
                             title={gift.name}
                             description={gift.description}
                             imageURL={gift.imgURL}
                             buttonText="Reserve"
                             onClickCallback={(event) => reserveGift(event, gift._id)}
                             buttonDisabled={!!gift.userId}
          />
        )}
      </div>
    </div>
  );
}

export default Gifts;

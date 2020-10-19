import React, {useState, useEffect} from "react";
import './Gifts.css';
import ListItemWithImage from "../../shared/list-item-with-image/ListItemWithImage";
import { useHistory } from "react-router-dom";

function Gifts() {

  const history = useHistory();
  const [gifts, setGifts] = useState({list: []});

  function getGiftList() {
    fetch("http://localhost:9000/gifts", {
      method: "GET",
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        //if authentication failed redirect to login page
        if (res.message.code === 401){
          history.push("/login");
        }
        else if (res.message.code === 200){
          setGifts({list: res.giftList})
        }
      })
      .catch(err => err);
  }

  function reserveGift(event, giftId) {
    const requestOptions = {
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({giftId: giftId})
    };
    fetch("http://localhost:9000/gifts/reserve", requestOptions)
      .then(res => res.json())
      .then(res => {
        //if authentication failed redirect to login page
        if (res.message.code === 401){
          history.push("/login");
        }
        else if (res.message.code === 200){
          getGiftList();
        }
      })
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

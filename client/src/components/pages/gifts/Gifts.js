import React, {useState, useEffect} from "react";
import './Gifts.scss';
import { useHistory } from "react-router-dom";
import NavigationBar from "../../shared/navigation-bar/NavigationBar";
import { Card, CardContent, CardHeader, CardMedia, Typography, CardActions, Button, Avatar } from "@material-ui/core";
import leaf1 from "../../../assets/svg/leaf-1.svg";
import leaf2 from "../../../assets/svg/leaf-2.svg";
import grass1 from "../../../assets/svg/grass-1.svg";
import grass2 from "../../../assets/svg/grass-2.svg";

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
        if (res.message.code === 401) {
          history.push("/sign");
        }
        else if (res.message.code === 200) {
          setGifts({list: res.giftList});
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
        if (res.message.code === 401) {
          history.push("/sign");
        }
        else if (res.message.code === 200) {
          getGiftList();
        }
      })
      .catch(err => err);

    event.preventDefault();
  }

  useEffect(getGiftList, []);

  function renderAvatarImage(index) {
    switch (index) {
      case 0:
        return leaf1;
      case 1:
        return grass2;
      case 2:
        return leaf2;
      default:
        return grass1;
    }
  }

  return (
    <div>
      <NavigationBar />
      <div className="gift-list-container">
        {gifts.list.map((gift, index) =>
          <Card className="gift" key={gift._id}>
            <CardHeader title={gift.name}
                        className="gift__title"
                        avatar={
                          <Avatar variant="square"
                                  alt="Leaf"
                                  className={"gift__avatar gift__avatar--" + (index % 4 + 1)}
                                  src={renderAvatarImage(index % 4)} />
                        } />
            <CardMedia className="gift__img" image={gift.imgURL} />
            <CardContent>
              <Typography component="p" className="gift_description">{gift.description}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button disabled={!!gift.userId}
                      onClick={(event) => reserveGift(event, gift._id)}
                      className="gift__button">Reserve</Button>
            </CardActions>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Gifts;

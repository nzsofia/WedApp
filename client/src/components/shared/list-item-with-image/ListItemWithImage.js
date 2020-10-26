import React from "react";
import "./ListItemWithImage.scss";

function ListItemWithImage({title, description, imageURL, buttonText, onClickCallback, buttonDisabled}) {
  return (
    <div className="list-item-container">
      <div>
        <h1 className="list-item-title">{title}</h1>
        <p className="list-item-description">{description}</p>
        <button onClick={onClickCallback}
                disabled={buttonDisabled}
                className="list-item-button">
          {buttonText}
        </button>
      </div>
      <img src={imageURL} alt={title} className="list-item-img" />
    </div>
  );
}

export default ListItemWithImage;

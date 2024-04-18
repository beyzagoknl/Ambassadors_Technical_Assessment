import React from "react";

function Stickers({ classes, stickers, setSelectedSticker }) {
  const setSelectedStickerWithImage = (sticker) => {
    const image = new Image();
    image.onload = () => {
      setSelectedSticker({ ...sticker, img: image });
    };
    image.onerror = () => {
      console.error("Image failed to load:", sticker.img);
    };
    image.src = sticker.img;
  };

  const handleStickerSelection = (sticker) => {
    setSelectedStickerWithImage(sticker);
  };

  return (
    <section className={classes.Stickers}>
      <h2> Select your mood! </h2>
      {stickers.map((sticker, index) => (
        <label key={index} className={classes.StickerLabel}>
          <input
            type="radio"
            name="sticker"
            value={sticker.id}
            onChange={() => handleStickerSelection(sticker)}
            style={{ marginRight: "10px" }}
          />
          <img
            src={sticker.img}
            alt={`Sticker ${index}`}
            style={{ verticalAlign: "middle" }}
          />
          {sticker.alt}
        </label>
      ))}
    </section>
  );
}

export default Stickers;

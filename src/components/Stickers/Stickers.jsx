import React from "react";

function Stickers({ classes, stickers, setSticker }) {
  return (
    <section className={classes.Stickers}>
      Step 2: Select your sticker...
      {stickers.map((sticker, index) => (
        <button key={index} onClick={() => setSticker(sticker)}>
          <img src={sticker.url} alt={`Sticker ${index}`} />
        </button>
      ))}
    </section>
  );
}

export default Stickers;

import React from "react";

function Gallery({ classes, picture, title, setTitle }) {
  return (
    <section className={classes.Gallery}>
      <h2> Write your title! </h2>
      <input
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        placeholder="Enter a title for your picture"
      />
      {picture && (
        <div className={classes.Picture}>
          <img src={picture.dataUri} alt={title} />
          <h3>{title}</h3>
        </div>
      )}
    </section>
  );
}

export default Gallery;

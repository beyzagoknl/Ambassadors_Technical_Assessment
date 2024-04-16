import { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./useWebcamCapture";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Stickers from "./components/Stickers/Stickers";
import Gallery from "./components/Gallery/Gallery";

import logo from "./slap.png";

import { Link, Switch, Route, Redirect } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
  "@global body": {
    background: theme.palette.background,
    color: theme.palette.text,
    fontFamily: "sans-serif",
  },
  App: {
    padding: "20px",
    background: theme.palette.background,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    maxWidth: "800px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    "& a": {
      color: theme.palette.text,
    },
  },
  fadeIn: {
    animation: "$fadeIn 3s ease-in-out infinite",
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
  Header: {
    textAlign: "center",
    "& h1": {
      fontFamily: "sans-serif",
      cursor: "pointer",
      fontSize: "2.5rem",
      margin: "0",
    },
  },
  Main: {
    background: theme.palette.secondary,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& canvas": {
      width: "100%",
      height: "auto",
    },
    "& video": {
      display: "none",
    },
  },
  Stickers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& img": {
      height: "4rem",
      margin: "10px",
    },
  },
  Gallery: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& img": {
      height: "16rem",
      margin: "10px 20px",
    },
  },
  Picture: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& h3": {
      padding: "8px",
      textAlign: "center",
      width: "100%",
    },
  },
}));

const stickers = [logo].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

function App(props) {
  const classes = useStyles(props);
  const [sticker, setSticker] = useState();
  const [title, setTitle] = useState("SLAPPE!");
  const [displayedText, setDisplayedText] = useState("");

  const text = "Welcome to SlapSticker!";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(intervalId);
    }, 100); // Adjust time for faster or slower typing

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const [handleVideoRef, handleCanvasRef, handleCapture, picture] =
    useWebcamCapture(sticker?.img, title);

  return (
    <div className={classes.App}>
      <Navbar />
      <Header classes={classes} />
      <h1 className={classes.fadeIn}>{displayedText}</h1>
      <Switch>
        <Route path="/" exact>
          <main>
            <Stickers
              classes={classes}
              stickers={stickers}
              setSticker={setSticker}
            />
            <section className={classes.Main}>
              Step three: Slap your self!
              <video ref={handleVideoRef} />
              <canvas
                ref={handleCanvasRef}
                width={2}
                height={2}
                onClick={handleCapture}
              />
              <Gallery
                classes={classes}
                picture={picture}
                title={title}
                setTitle={setTitle}
              />
            </section>
          </main>
        </Route>
        <Route path="/readme">{/* Other Routes and Components */}</Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

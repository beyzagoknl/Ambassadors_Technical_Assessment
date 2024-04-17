import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./useWebcamCapture";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Stickers from "./components/Stickers/Stickers";
import Gallery from "./components/Gallery/Gallery";

import logo from "../src/assets/slap.png";
import smile from "../src/assets/smile.png";
import crown from "../src/assets/crown.png";

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
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
    justifyContent: "center",
    "& canvas": {
      width: "640px",
      height: "480px",
      cursor: "pointer",
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

const initialStickers = [
  { id: "logo1", img: logo, alt: "Slappppp!", active: false },
  { id: "logo3", img: smile, alt: "Kiss me!", active: false },
  { id: "logo2", img: crown, alt: "I am a king!", active: false },
];

function App(props) {
  const classes = useStyles(props);
  const [title, setTitle] = useState("SLAPPE!");
  const [displayedText] = useState("Welcome to SlapSticker!");
  const { videoRef, canvasRef, onCapture, picture, setSelectedSticker } =
    useWebcamCapture(initialStickers, title);

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
              stickers={initialStickers}
              setSelectedSticker={setSelectedSticker}
            />
            <section className={classes.Main}>
              <video ref={videoRef} style={{ display: "none" }} />
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                onClick={onCapture}
                style={{ cursor: "none" }}
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
        <Route path="/readme"></Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

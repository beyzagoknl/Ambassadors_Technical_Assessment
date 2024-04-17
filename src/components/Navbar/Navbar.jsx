// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  Nav: {
    width: "100%",
    background: "#31afd4",
    padding: "10px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& ul": {
      listStyle: "none",
      padding: 0,
      display: "flex",
      justifyContent: "space-around",
      width: "50%",
    },
    "& li": {
      padding: "10px",
    },
    "& a": {
      color: theme.palette.text,
      textDecoration: "none",
      fontSize: "1.2rem",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <nav className={classes.Nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/readme">Readme</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

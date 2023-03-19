import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import store from "../../assets/store1.jpg";

const useStyles = makeStyles({

  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

function FrontPage(props) {
  const classes = useStyles();

  function Item(props) {
    return (
      <Paper>
        <img src={props.item} className={classes.image} />
      </Paper>
    );
  }

  return (
    <div>
      <Navbar />
        <Carousel sx={{ height:'90vh', width:'80%' }}>
          <Item key="" item={store} />
        </Carousel>
    </div>
  );
}

export default FrontPage;

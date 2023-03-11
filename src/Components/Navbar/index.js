import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Fab,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { KeyboardArrowUp, Search, ShoppingCart } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import styled from "@emotion/styled";
import { getProducts } from "../../action/action";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Grid, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      backgroundColor: "#FEFBE9",
      color: "#183A1D",
      width: "100%",
      height: "2rem",
      lineHeight: "2rem",
    },
    heroStyle: {
      backgroundColor: "#183A1D",
      marginTop: "2rem",
      height: "10rem",
      color: "#FEFBE9",
    },
    cartStyle: {
      width: "20rem",
      position: "absolute",
      top: "41%",
      left: "75%",
      transform: "translate(-50%, -50%)",
    },
    item: {
      "& span, & p": {
        fontSize: "10px",
      },
    },
  })
);

const logoStyle = {
  position: "absolute",
  left: "8%",
  transform: "translate(-50%, -50%)",
};

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FEFBE9",
  },
  "& .MuiInputBase-input": {
    color: "#FEFBE9",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#FEFBE9",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FEFBE9",
  },
});

function Navbar(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { getProductsList } = useSelector((state) => state.ProductsReducer);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const triggerFabFading = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const backToTop = (e) => {
    const anchor = document.getElementById("back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  const handleCartOpen = (e) => setAnchorEl(e.currentTarget);
  const handleCartClose = () => setAnchorEl(null);
  const isCartOpen = Boolean(anchorEl);

  return (
    <Box>
      <AppBar className={classes.appBar} elevation={0}>
        <Container>Download MyStore App</Container>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.heroStyle}
      >
        <Grid item xs={2}>
          <img src={logo} alt="logo" style={logoStyle} width="200" />
        </Grid>
        <Grid item xs={8}>
          <FormControl>
            <CssTextField
              id="search-input"
              variant="standard"
              sx={{ width: "52rem" }}
              placeholder="Find in Everies"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#FEFBE9" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Box
            aria-controls={isCartOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isCartOpen ? "true" : undefined}
            onMouseOver={handleCartOpen}
            onMouseLeave={handleCartClose}
          >
            <IconButton>
              <ShoppingCart
                sx={{ color: "#FEFBE9" }}
              />
            </IconButton>
            <Paper
              sx={{ display: isCartOpen ? "inline" : "none" }}
              className={classes.cartStyle}
            >
              <MenuList>
                {getProductsList ? (
                  getProductsList.slice(0, 5).map((el) => (
                    <MenuItem className={classes.item} key={el.id}>
                      <Avatar
                        src={el.images[0]}
                        variant="square"
                        sx={{ marginRight: "10px", width: 24, height: 24 }}
                      />
                      <ListItemText className={classes.item}>
                        {el.title}
                      </ListItemText>
                      <span> ${el.price}</span>
                    </MenuItem>
                  ))
                ) : (
                  <p>issem</p>
                )}
              </MenuList>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Container>
        <Box></Box>
      </Container>
      <Fade in={triggerFabFading}>
        <Box
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={(e) => backToTop(e)}
        >
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </Box>
      </Fade>
    </Box>
  );
}

export default Navbar;

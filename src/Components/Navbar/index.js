import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Fab,
  Fade,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
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
      // display:'none',
      backgroundColor: "#FEFBE9",
      // backgroundColor: "red",
      color: "#183A1D",
      height: "1.5rem",
      lineHeight: "1.5rem",
      fontSize:'11px'
    },
    heroStyle: {
      [theme.breakpoints.down("md")]: {
        width: "100vh",
        backgroundColor: "#183A1D",
        marginTop: "1.5rem",
        height: "7rem",
        color: "#FEFBE9",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
        backgroundColor: "#183A1D",
        marginTop: "1.5rem",
        height: "7rem",
        color: "#FEFBE9",
      },
    },
    inputSearchField: {
      [theme.breakpoints.down("md")]: {
        width: "50vh",
        marginLeft:'5rem !important'
      },
      [theme.breakpoints.up("md")]: {
        width: "130vh",
        marginLeft:'2rem !important'
      },
    },

    logoStyle: {
      [theme.breakpoints.down("md")]: {
        left: "35%",
        top:'7%',
        '& .css-l086p4-MuiImageListItem-root .MuiImageListItem-img':{
          width:"25vh"
        }
      },     
      [theme.breakpoints.up("md")]: {
        left: "20%",
        top:'10%',
        '& .css-l086p4-MuiImageListItem-root .MuiImageListItem-img':{
          width:"35vh"
        }
      },        
      position: "absolute",
     
      transform: "translate(-50%, -50%)",
    },
    cartStyle: {
      [theme.breakpoints.down("md")]: {
        width: "20rem",
        position: "absolute",
        top: "26%",
        left: "110%",
        transform: "translate(0%, -50%)",
      },
      [theme.breakpoints.up("md")]: {
        width: "20rem",
        top: "33%",
        left: "75%",
        transform: "translate(-50%, -50%)",
      },
    },
    item: {
      "& span, & p": {
        fontSize: "10px",
      },
    },
  })
);

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
          <ImageList className={classes.logoStyle} variant="quilted">
            <ImageListItem>
              <img src={logo} alt="logo" />
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid item xs={8}>
          <FormControl className={classes.inputSearchField}>
            <CssTextField
              id="search-input"
              variant="standard"
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
            <IconButton onClick={handleCartOpen}>
              <ShoppingCart sx={{ color: "#FEFBE9" }}  />
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

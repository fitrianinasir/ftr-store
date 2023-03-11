import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles({
  makeRed: {
    backgroundColor: 'red'
  },
  item: {
    // color: theme.palette.secondary.main,
    "& span, & p": {
      fontSize: "10px",
    },
  },
});


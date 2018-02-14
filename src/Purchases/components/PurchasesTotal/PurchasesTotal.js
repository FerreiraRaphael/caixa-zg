import React from "react";
import { Typography, withStyles } from "material-ui";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "normal",
    padding: theme.spacing.unit * 2,
    borderTop: `1px solid ${theme.palette.divider}`
  },
  flexSpaceBetween: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const PurchasesTotal = ({ subtotal, discount, total, classes }) => (
  <div className={classes.container}>
    <div className={classes.flexSpaceBetween}>
      <Typography>Subtotal:</Typography>
      <Typography>{subtotal}</Typography>
    </div>
    <div className={classes.flexSpaceBetween}>
      <Typography>Desconto:</Typography>
      <Typography>{discount}</Typography>
    </div>
    <div className={classes.flexSpaceBetween}>
      <Typography>Total:</Typography>
      <Typography>{total}</Typography>
    </div>
  </div>
);

export default withStyles(styles)(PurchasesTotal);

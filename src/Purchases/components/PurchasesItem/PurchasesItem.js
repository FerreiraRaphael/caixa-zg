import React from "react";
import { withStyles, ListItem, Typography } from "material-ui";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "normal",
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  flexSpaceBetween: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
});

const PurchasesItem = ({
  name,
  sku,
  quantity,
  subtotal,
  discount,
  total,
  price,
  classes
}) => (
  <ListItem className={classes.container}>
    <div>
      <Typography>{`${name} ${sku}`}</Typography>
    </div>
    <div className={classes.flexSpaceBetween}>
      <Typography>Preço {price}</Typography>
      <Typography>Quantidade {quantity}</Typography>
    </div>
    <div className={classes.flexSpaceBetween}>
      <Typography>Subtotal {subtotal}</Typography>
      <Typography>Desconto {discount}</Typography>
    </div>
    <div className={classes.flexEnd}>
      <Typography>Total {total}</Typography>
    </div>
  </ListItem>
);

export default withStyles(styles)(PurchasesItem);

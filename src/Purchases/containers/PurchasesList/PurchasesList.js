import React from "react";
import { List, Button, Divider, withStyles } from "material-ui";

import PurchasesTotal from "../../components/PurchasesTotal";
import PurchasesItem from "../../components/PurchasesItem";

const items = [
  {
    product: 1,
    name: "teste",
    sku: "tes",
    quantity: 1,
    subtotal: 19,
    discount: 9,
    total: 10,
    price: 19
  },
  {
    product: 2,
    name: "teste",
    sku: "tes",
    quantity: 1,
    subtotal: 19,
    discount: 9,
    total: 10,
    price: 19
  },
  {
    product: 3,
    name: "teste",
    sku: "tes",
    quantity: 1,
    subtotal: 19,
    discount: 9,
    total: 10,
    price: 19
  },
  {
    product: 4,
    name: "teste",
    sku: "tes",
    quantity: 1,
    subtotal: 19,
    discount: 9,
    total: 10,
    price: 19
  }
];

const styles = theme => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
    height: `100%`
  },
  list: {
    flex: 1
  },
  button: {
    borderRadius: 0,
    height: 80
  }
});

const PurchasesList = ({ classes }) => (
  <div className={classes.container}>
    <List className={classes.list}>
      {items.map(item => (
        <PurchasesItem key={item.product || item.name} {...item} />
      ))}
    </List>
    <PurchasesTotal subtotal={19} total={10} discount={9} />
    <Button
      className={classes.button}
      variant="raised"
      size="large"
      color="primary"
      fullWidth
    >
      Finalizar
    </Button>
  </div>
);

export default withStyles(styles)(PurchasesList);

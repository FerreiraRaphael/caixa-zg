import React from 'react';
import {
  List,
  Button,
  withStyles,
  Typography,
  Divider,
  CircularProgress
} from 'material-ui';

import PurchasesTotal from '../../components/PurchasesTotal';
import PurchasesItem from '../../components/PurchasesItem';

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
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    flexDirection: 'column',
    padding: `0 ${theme.spacing.unit * 2}px`,
    justifyContent: 'center'
  }
});

const PurchasesList = ({
  classes,
  items,
  subtotal,
  total,
  discount,
  creating,
  simulating,
  createPurchase
}) => (
  <div className={classes.container}>
    <div className={classes.drawerHeader}>
      <Typography color="textSecondary" variant="title">
        Compras
      </Typography>
      <Typography color="textSecondary" variant="subheading">
        Lista de Compras
      </Typography>
    </div>
    <Divider />
    <List style={{ overflow: `auto` }} className={classes.list}>
      {items.map(item => (
        <PurchasesItem key={item.product || item.name} {...item} />
      ))}
    </List>
    <PurchasesTotal subtotal={subtotal} total={total} discount={discount} />
    <Button
      className={classes.buttonfosdi}
      variant="raised"
      size="large"
      color="primary"
      fullWidth
      style={{ borderRadius: 0, height: 70 }}
      disabled={creating || simulating}
      onClick={() => createPurchase()}
    >
      {(creating || simulating) && (
        <CircularProgress style={{ marginRight: 10 }} />
      )}
      {creating && 'Criando compra'}
      {simulating && 'Calculando descontos'}
      {!creating && !simulating && 'Finalizar'}
    </Button>
  </div>
);

export default withStyles(styles)(PurchasesList);

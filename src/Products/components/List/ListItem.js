import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem as Item,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  withStyles
} from 'material-ui';
import { Remove, Add, Delete } from 'material-ui-icons';
import cs from 'classnames';

const styles = theme => ({
  selected: {
    background: theme.palette.action.hover
  },
  buttonIconRoot: {
    width: 24,
    marginRight: theme.spacing.unit,
    height: 24,
    marginTop: 12
  },
  buttonDelete: {
    marginLeft: theme.spacing.unit
  }
});

const ListItem = ({
  product,
  name,
  sku,
  quantity,
  price,
  highLight,
  classes,
  onAdd,
  onDelete,
  onRemove
}) => (
  <Item
    className={cs({ [classes.selected]: highLight })}
    button
    onKeyUp={args => console.log(`item`, args)}
    tabIndex={-1}
  >
    <ListItemText primary={`${name} ${sku}`} secondary={`Preço UN ${price}`} />
    {quantity !== null ? (
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => onAdd({ product, name, sku, price })}
          tabIndex={-1}
          classes={{ root: classes.buttonIconRoot }}
        >
          <Add />
        </IconButton>
        <IconButton tabIndex={-1} classes={{ root: classes.buttonIconRoot }}>
          <Typography variant="button">{quantity}</Typography>
        </IconButton>
        <IconButton
          tabIndex={-1}
          classes={{ root: classes.buttonIconRoot }}
          onClick={() => onRemove({ product })}
        >
          <Remove />
        </IconButton>
        <IconButton
          classes={{
            root: `${classes.buttonIconRoot} ${classes.buttonDelete}`
          }}
          style={{ marginLeft: 5 }}
          tabIndex={-1}
          onClick={() => onDelete({ product })}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    ) : null}
  </Item>
);

export default withStyles(styles)(ListItem);

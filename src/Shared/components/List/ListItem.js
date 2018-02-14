import React from "react";
import PropTypes from "prop-types";
import {
  ListItem as Item,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  withStyles
} from "material-ui";
import { Remove, Add } from "material-ui-icons";
import cs from "classnames";

const styles = theme => ({
  selected: {
    background: theme.palette.action.hover
  }
});

const ListItem = ({ id, name, quantity, price, highLight, classes }) => (
  <Item
    className={cs({ [classes.selected]: highLight })}
    button
    onKeyUp={args => console.log(`item`, args)}
    tabIndex={-1}
  >
    <ListItemText primary={name} secondary={price} />
    {quantity !== null ? (
      <ListItemSecondaryAction>
        <IconButton tabIndex={-1}>
          <Add />
        </IconButton>
        <IconButton tabIndex={-1}>
          <Typography variant="button">{quantity}</Typography>
        </IconButton>
        <IconButton tabIndex={-1}>
          <Remove />
        </IconButton>
      </ListItemSecondaryAction>
    ) : null}
  </Item>
);

export default withStyles(styles)(ListItem);

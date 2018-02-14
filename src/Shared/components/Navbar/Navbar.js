import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import { withStyles } from "material-ui";

import { drawerWidth } from "../Drawer/Drawer";

const styles = theme => ({
  appBar: {
    right: "auto",
    position: "absolute",
    top: 0,
    width: "100%",
    margin: `-${theme.spacing.unit * 7}px -${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up("sm")]: {
      margin: `-${theme.spacing.unit * 8}px -${theme.spacing.unit * 3}px`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

const Navbar = ({ title, classes, onDrawerToggle, children }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" style={{ flex: 1 }}>
        {title}
      </Typography>
      {children}
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Navbar);

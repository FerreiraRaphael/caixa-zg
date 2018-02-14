import React from "react";
import { List, ListItem, Drawer, Hidden, withStyles } from "material-ui";

export const drawerWidth = 300;

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  drawerDocked: {
    height: "100%"
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "relative",
      height: "100%"
    }
  }
});

const CommonDrawer = ({
  open,
  onDrawerToggle,
  classes,
  theme,
  children,
  anchor,
  variant
}) => (
  <div style={{ display: "flex" }}>
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        anchor={anchor || theme.direction === "rtl" ? "right" : "left"}
        open={open}
        classes={{
          paper: classes.drawerPaper,
          docked: classes.drawerDocked
        }}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {children}
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">
      <Drawer
        variant={variant || "persistent"}
        anchor={anchor || theme.direction === "rtl" ? "right" : "left"}
        open={open}
        classes={{
          paper: classes.drawerPaper,
          docked: classes.drawerDocked
        }}
        onClose={onDrawerToggle}
      >
        {children}
      </Drawer>
    </Hidden>
  </div>
);

export default withStyles(styles, { withTheme: true })(CommonDrawer);

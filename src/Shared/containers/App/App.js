import React, { Component } from "react";
import {
  withStyles,
  List,
  ListItem,
  Button,
  Divider,
  Typography
} from "material-ui";
import { withRouter } from "react-router-dom";
import cs from "classnames";
import MediaQuery from "react-responsive";

import Drawer from "../../components/Drawer";
import Navbar from "../../components/Navbar";
import ProductsScreen from "../../../Products/screens/ProductsScreen";
import { drawerWidth } from "../../components/Drawer/Drawer";
import PurchasesList from "../../../Purchases/containers/PurchasesList";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: theme.palette.background.default,
    "&:after": {
      position: "fixed",
      backgroundColor: theme.palette.primary.main,
      width: "100%",
      height: 127,
      content: `''`,
      bottom: 0,
      left: 0
    }
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: `calc(100% - ${theme.spacing.unit * 3}px)`,
    height: `calc(100% - ${theme.spacing.unit * 5}px)`,
    boxShadow: theme.shadows[4],
    overflow: "hidden",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      width: `calc(100% - ${theme.spacing.unit / 2}px)`,
      height: `100%`
    }
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: "flex",
    flexDirection: "column",
    padding: `0 ${theme.spacing.unit * 2}px`,
    justifyContent: "center"
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    padding: theme.spacing.unit * 3,
    height: `calc(100% - ${theme.spacing.unit * 7}px)`,
    marginTop: theme.spacing.unit * 7,
    position: "relative",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up("sm")]: {
      height: `calc(100% - ${theme.spacing.unit * 8}px)`,
      marginTop: theme.spacing.unit * 8
    }
  },
  contentNavDrawerClosed: {
    marginLeft: -drawerWidth
  },
  contentPurchasesDrawerClosed: {
    marginRight: -drawerWidth
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class App extends Component {
  state = {
    navDrawer: false,
    purchasesDrawer: false
  };

  handleNavDrawerToggle = toggle => {
    const navDrawer = toggle || !this.state.navDrawer;
    this.setState({ navDrawer });
  };

  handlePurchasesDrawerToggle = toggle => {
    const purchasesDrawer = toggle || !this.state.purchasesDrawer;
    this.setState({ purchasesDrawer });
  };

  handlePageTitle = () => {
    const { location } = this.props;
    const pages = {
      "/": "Produtos",
      "/config": "Configurações",
      "/about": "Sobre"
    };
    return pages[location.pathname];
  };

  componentDidMount() {
    const { classes, focus } = this.props;
    console.log(this.props.theme.breakpoints.up("sm"));
    window.addEventListener("keydown", e => {
      console.log(e);
      focus();
    });
  }
  render() {
    const { classes, focus, theme } = this.props;
    return (
      <div className={classes.root}>
        <MediaQuery query={theme.breakpoints.down("sm").replace("@media ", "")}>
          {isMobile => (
            <div className={classes.appFrame}>
              <Drawer
                onDrawerToggle={() => this.handleNavDrawerToggle(false)}
                open={this.state.navDrawer}
              >
                <div className={classes.drawerHeader}>
                  <Typography color="textSecondary" variant="title">
                    Caixa ZG
                  </Typography>
                  <Typography color="textSecondary" variant="subheading">
                    v0.1.0
                  </Typography>
                </div>
                <Divider />
                <List>
                  <ListItem button>
                    <Typography>Produtos</Typography>
                  </ListItem>
                  <ListItem button>
                    <Typography>Configurações</Typography>
                  </ListItem>
                  <ListItem button>
                    <Typography>Sobre</Typography>
                  </ListItem>
                </List>
              </Drawer>
              <main
                className={cs(classes.content, {
                  [classes.contentNavDrawerClosed]:
                    !this.state.navDrawer && !isMobile
                })}
              >
                <Navbar
                  onDrawerToggle={() =>
                    this.handleNavDrawerToggle(!this.state.navDrawer)
                  }
                  title={this.handlePageTitle()}
                >
                  <Button
                    onClick={() =>
                      this.handlePurchasesDrawerToggle(
                        !this.state.purchasesDrawer
                      )
                    }
                    className={classes.navIconHide}
                    color="inherit"
                  >
                    Compra
                  </Button>
                </Navbar>
                <ProductsScreen />
              </main>

              <Drawer
                variant="permanent"
                onDrawerToggle={() => this.handlePurchasesDrawerToggle(false)}
                open={this.state.purchasesDrawer}
                anchor={theme.direction === "rtl" ? "left" : "right"}
              >
                <div className={classes.drawerHeader}>
                  <Typography color="textSecondary" variant="title">
                    Compras
                  </Typography>
                  <Typography color="textSecondary" variant="subheading">
                    Lista de Compras
                  </Typography>
                </div>
                <Divider />
                <PurchasesList />
              </Drawer>
            </div>
          )}
        </MediaQuery>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(App));

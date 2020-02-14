import React, { Fragment, useState } from "react";
import "./Menu.css"
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  stick: {
    background: 'white',
    position: '-webkit-sticky',
    position: 'sticky',
    top: 0, 
    bottom: 20, 
    paddingTop: '0px',
    paddingBottom: '0px',
    zIndex: 5,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <MenuItem onClick={handleMenuClose}>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/user/dashboard">User Dashboard</Link>
        </MenuItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem onClick={handleMenuClose}>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/admin/dashboard">Admin Dashboard</Link>
        </MenuItem>
      )}
      <MenuItem onClick={() => signout(() => {
        handleMenuClose()
        props.history.push("/signup")
      })}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div  className={classes.grow, classes.stick}>
      <AppBar position="static" color="transparent">
        <Toolbar >
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h5" noWrap>
            <Link className="nav-link" style={isActive(props.history, "/")} to="/">Tradewins</Link>
          </Typography>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link className="nav-link" style={isActive(props.history, "/shop")} to="/shop">Catalogue</Link>
          </Typography>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link className="nav-link" style={isActive(props.history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
            )}
          </Typography>
          <Typography className={classes.title} variant="h6" noWrap>
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link className="nav-link" style={isActive(props.history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
            )}
          </Typography> */}
          {!isAuthenticated() && (
            <Fragment>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link className="nav-link" style={isActive(props.history, "/signin")} to="/signin">Sign In</Link>
              </Typography>

              <Typography className={classes.title} variant="h6" noWrap>
                <Link className="nav-link" style={isActive(props.history, "/signup")} to="/signup">Start Selling</Link>
              </Typography>
            </Fragment>
          )}
          {/* <Typography className={classes.title} variant="h6" noWrap>
            {isAuthenticated() && (
              <span className="nav-link" style={{ cursor: "pointer" }} onClick={() => signout(() => {
                props.history.push("/signup")
              })}>Sign Out</span>
            )}
          </Typography> */}
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated() && (
              <Fragment>
                <IconButton aria-label="show new mail" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <MailIcon fontSize="large"/>
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              </Fragment>)}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black" }
  } else {
    return { color: "black" }
  }
}

const Menu2 = (props) => {
  return (
    <>
      {/* <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <a class="navbar-brand" href="#" style={{fontWeight: 900, fontSize: "1.5rem"}}>TradeWins</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">

                            <a class="nav-link" href="#">
                            <span class="glyphicon glyphicon-log-in"></span>
                            Login <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Start Selling</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav> */}

      <ul className="nav nav-tabs">

        <li className="nav-item">
          <Link className="nav-link" style={isActive(props.history, "/")} to="/">Tradewins</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={isActive(props.history, "/shop")} to="/shop">Shop</Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" style={isActive(props.history, "/signin")} to="/signin">Sign In</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" style={isActive(props.history, "/signup")} to="/signup">Start Selling</Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item" style={{ backgroundColor: "#e73c7e", borderRadius: "10px", marginLeft: "5px" }}>
            <span className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} onClick={() => signout(() => {
              props.history.push("/signup")
            })}>Sign Out</span>
          </li>
        )}


      </ul>

    </>
  )
}

export default withRouter(Navbar)
import React, { useState, useEffect } from "react";

// React Router DOM
import { Link, useHistory, useLocation } from "react-router-dom";

// JWT
import decode from "jwt-decode";

// Material-ui
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";


import useStyles from "./styles";


import { useDispatch } from "react-redux";



import nostalgia from "./../../images/nostalgia.png"

const Navbar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  
  const logout = () => {
    
    dispatch({ type: "LOGOUT" });

   
    history.push("/");

    setUser(null);
  };

  
  useEffect(() => {
    const token = user?.token;

    
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={nostalgia} alt="icon" height="45px" />

      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button style={{backgroundColor:"#22223b",color:"white"}}
              variant="contained"
              className={classes.logout}
              
            
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button style={{backgroundColor:"#22223b",color:"white"}}
            component={Link}
            to="/auth"
            variant="contained"
            
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { pathname } = useLocation();
  const path = pathname === "/" ? "home" : pathname.slice(1);
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(path);
  
  const handleLogout = () => {
    logout();
  };

  // set active nav item when location changes
  useEffect(() => {
    setActiveItem(path)
  }, [path])

  return user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name={user.username}
        active
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          onClick={handleLogout}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;

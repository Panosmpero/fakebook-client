import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.slice(1);

  const { user, logout } = useContext(AuthContext);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLogout = () => {
    logout();
  };

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
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;

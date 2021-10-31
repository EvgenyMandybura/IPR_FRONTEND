import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import StorageService from "../../services/StorageService";
import HeaderStyles from "./index.module.scss";
import { logoutUser } from "../../store/auth/actions";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  NavbarText,
} from "reactstrap";

const Header = ({ logoutUser, history }) => {
  const user = StorageService.user.value;
  const onSubmitLogOut = () => {
    logoutUser(history);
  };

  return (
    <div>
      <Navbar
        light
        expand="md"
        className={`navbar navbar-dark bg-dark ${HeaderStyles.navbar}`}
      >
        <NavbarBrand href="/">Site Logo</NavbarBrand>
        {!!user ? (
          <>
            <Nav className={HeaderStyles.nav} navbar>
              <NavbarText className={HeaderStyles.userInfoName}>
                {user.firstName}
              </NavbarText>
              <NavItem>
                <Button className={HeaderStyles.navbarBtn}>
                  I am an Artist
                </Button>
              </NavItem>
              <NavItem>
                <Button
                  className={HeaderStyles.navbarBtn}
                  onClick={onSubmitLogOut}
                >
                  Sign Out
                </Button>
              </NavItem>
            </Nav>
          </>
        ) : (
          <>
            <Nav className={HeaderStyles.nav} navbar>
              <NavItem>
                <NavLink href="/sign-in">Sign In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/sign-up">Sign Up</NavLink>
              </NavItem>
            </Nav>
          </>
        )}
      </Navbar>
    </div>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));

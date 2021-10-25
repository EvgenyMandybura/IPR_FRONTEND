import React, { useState } from "react";
import { NavLink as NavLinkRoute, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import StorageService from "../../services/StorageService";
import HeaderStyles from "./index.module.scss";
import { logoutUser } from "../../store/auth/actions";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Header = ({ logoutUser, history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = StorageService.user.value;
  const toggle = () => setIsOpen(!isOpen);
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
        <NavbarBrand href="/"> Marketplace</NavbarBrand>
        {!!user && (
          <>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className={HeaderStyles.nav} navbar>
                {user.role === 2 && (
                  <NavItem>
                    <NavLink href="/product/">My Products</NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink href="/all-products/">All Products</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Account
                  </DropdownToggle>
                  <DropdownMenu right className={HeaderStyles.cropdownitem}>
                    <DropdownItem>
                      <NavLink to={"/profile"} tag={NavLinkRoute}>
                        Profile
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onSubmitLogOut}>
                      <NavLink>LogOut</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </>
        )}
      </Navbar>
    </div>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));

import React from "react";
import { supabaseAuth } from "../Configs/supabase";
import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import { NotificationsSharp, PersonCircleSharp } from "react-ionicons";
import { Link } from "react-router-dom";

export default function Header() {
  const [userEmail, setUserEmail] = React.useState(null);
  const [userRole, setUserROle] = React.useState(null);

  const fetchUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabaseAuth.getUser();
      if (error) {
        throw error;
      }
      console.log("Fetched user: ", user);
      if (user) {
        setUserEmail(user.email);
        setUserROle(user.role);
      } else {
        setUserEmail(null);
      }
    } catch (error) {
      console.error("Error fetching user: ", error.message);
    }
  };

  // Use effect to fetch user data on component mount
  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">[Project-Name]</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/admin">
                Home
              </NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Link to="/authentication" className="success">
                Login
              </Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
              {/* <Button type="button"> */}
              <PersonCircleSharp height="30px" width="30px" className="mr-8" />
              <NotificationsSharp height="30px" width="30px" />
              {/* </Button> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>
        Navbar user email: {userEmail} and user-role: {userRole}
      </h1>
    </div>
  );
}

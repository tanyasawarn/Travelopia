import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Travelopia
          </Navbar.Brand> 
        
         {props.children}
           
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

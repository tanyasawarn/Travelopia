//importing dependencies
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import {Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { Link } from "react-router-dom";
import { baseurl } from "../App";
 
const UserBookingHistory = () => {
  const [userBookingHistory, setUserBookingHistory] = useState();

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  // Function to fetch user travel history
  const getUsersBookingHistory = async () => {
    try {
      const response = await axios.get(`${baseurl}/user/${id}`);
      if (response.status === 200) {
        setUserBookingHistory(response.data.users);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    getUsersBookingHistory();
  }, []);

  if (userBookingHistory && userBookingHistory.travelHistory.length <= 0) {
    return (
      <>
        <Header>
        <Link to='/booking-history'  style={{textDecoration:"none", color:"white"}}>
            Create New Booking
          </Link>
        </Header>
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} className="text-center">
              <h2>No Travel Histories Found for {userBookingHistory.name}</h2>
              <Link to='/booking-history'  style={{textDecoration:"none", color:"white"}}>
            Create New Booking
          </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (userBookingHistory && userBookingHistory.travelHistory.length > 0) {
    return (
      <>
        <Header>
        <Link to='/booking-history'  style={{textDecoration:"none", color:"white"}}>
            Create New Booking
          </Link>
        </Header>
        <Container>
          <Row className="mb-3">
            <Col xs={12} className="text-center">
              <h4>
                {userBookingHistory.name.charAt(0).toUpperCase() +
                  userBookingHistory.name.slice(1)}{" "}
                Travel History
              </h4>
            </Col>
          </Row>
          <Row>
            {userBookingHistory.travelHistory.map((data) => (
              <Col xs={12} sm={6} md={4} lg={3} key={data._id} className="text-center m-2">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-center">
                      Destination: {data.destination.name}
                    </Card.Title>
                    <Card.Text className="text-center">
                      Budget per person: ${data.destination.pricePerPerson}
                    </Card.Text>
                    <Card.Text className="text-center">
                      No. of travelers: {data.numberOfPersons}
                    </Card.Text>
                    <Card.Text className="text-center">
                      Total Budget: $
                      {data.destination.pricePerPerson * data.numberOfPersons}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
};

export default UserBookingHistory;


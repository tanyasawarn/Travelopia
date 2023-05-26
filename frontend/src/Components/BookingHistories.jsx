import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { baseurl } from "../App";
 import Header from "./Header";

const BookingHistories = () => {
  const [bookingHistories, setBookingHistories] = useState();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Function to fetch all travel histories for all users
  const getAllBookingHistories = async () => {
    try {
      const response = await axios.get(`${baseurl}/user`);
      if (response.status === 200) {
        setBookingHistories(response.data.users);
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
    getAllBookingHistories();
  }, []);

  if (bookingHistories && bookingHistories.length <= 0) {
    return (
      <>
        <Header>
          <Link to='/'  style={{textDecoration:"none", color:"white"}}>
            Create New Booking
          </Link>
        </Header>
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} className="text-center">
              <h2>No Booking History Found</h2>
              <Button variant="primary" onClick={() => navigate("/")}>
                Create New Booking
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (bookingHistories && bookingHistories.length > 0) {
    return (
      <>
        <Header>
        <Link to='/'  style={{textDecoration:"none", color:"white"}}>
            Create New Booking
          </Link>
        </Header>
        <Container>
          <Row className="mb-3">
            <Col  xs={12} className="text-center gap-3">
              <h4>Travel Histories</h4>
              
            </Col>
          </Row>
          <Row>
            {bookingHistories.map((data) => (
              <Col
              className="text-center m-2"
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={data._id}
                onClick={() => navigate(`/user-travel-history/${data._id}`)}
              >
                <Card>
                  <Card.Body>
                    <Card.Title className="text-center">
                      {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                    </Card.Title>
                    <Card.Text className="text-center">{data.email}</Card.Text>
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

export default BookingHistories;

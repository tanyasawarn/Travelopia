// import dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Select, MenuItem,InputLabel,FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { baseurl } from "../App";
 import Header from "./Header";

// Yup validation schema for user input form
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Must be a valid email address")
    .required("Email address is required"),
  destinationName: Yup.string().required("Destination name is required"),
  numberOfPersons: Yup.number()
    .min(1)
    .required("Number of persons is required"),
});

const NewBooking = () => {
  const [destinations, setDestinations] = useState([]);
  const [pricePerPerson, setPricePerPerson] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      destinationName: "",
      numberOfPersons: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const body = { ...values, pricePerPerson: pricePerPerson };

      console.log(body);

      // API call to submit the details
      try {
        const response = await axios.post(
          `${baseurl}/user/create/travel-history`,
          body
        );
        if (response.status === 201) {
          console.log("Posted Successfully");
          enqueueSnackbar("Successfully Submitted !!", {
            variant: "success",
            autoHideDuration: 3000,
          });
          resetForm();
          //setPricePerPerson(0);
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    },
  });

  const { values, handleChange, handleSubmit } = formik;

  // function to get all destinations
  const getAllDestinatons = async () => {
    try {
      const response = await axios.get(`${baseurl}/destination`);
      
      if (response.status === 200) {
        setDestinations(response.data.destinations);
        console.log(response.data.destinations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // set price per person on selection of destination from dropdown
  const handleDestinationChange = (event) => {
    const optionValue = event.target.value;
    formik.setFieldValue("destinationName", optionValue);
  console.log(optionValue);
    // update price per person based on destination selected
    const budget = destinations.find(
      (data) => data.name.toLowerCase() === optionValue.toLowerCase()
    );
    if (budget) {
      setPricePerPerson(budget.pricePerPerson);
    }
  };

  useEffect(() => {
    getAllDestinatons();
  }, []);

  return (
    <>
       <section>
       <Header>
        <Link to='/booking-history' style={{textDecoration:"none", color:"white"}}>
          View All Bookings
        </Link>
      </Header>

      <Container className="p-4" style={{ maxWidth: "40vw", marginTop:"2rem" }}>
      <Card className="p-4">
      <h1 className="text-center">New Booking</h1>
      <Form onSubmit={handleSubmit} size="md">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="destinationName">
                <Form.Label>Where Do You Want To Go?</Form.Label>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="destination-label">
                    Select Destination
                  </InputLabel>
                  <Select
                    labelId="destination-label"
                    id="destinationName"
                    name="destinationName"
                    value={formik.values.destinationName}
                    onChange={handleDestinationChange}
                    label="Where do you want to go?"
                  >
                       {destinations &&
                      destinations.map((data) => (
                        <MenuItem value={data.name} key={data._id}>
                          {data.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Form.Group>

              <Form.Group className="mb-3" controlId="numberOfPersons">
                <Form.Label>No. of travelers</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="No. of travelers"
                  name="numberOfPersons"
                  value={values.numberOfPersons}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Budget per person</Form.Label>
                <Form.Control
                  type="text"
                  value={pricePerPerson}
                  readOnly
                />
              </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Card>
      </Container>
       </section>
    </>
  );
};

export default NewBooking;


 
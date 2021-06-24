import React, { useState } from "react";
import { Form, TextField, SubmitField } from "react-components-form";
const [city, setCity] = useState("");
const [postalCode, setPostalCode] = useState("");
const [country, setCountry] = useState("");
const [comment, setComment] = useState("");
const { shippingAddress } = useSelector((values) => ({ ...setValues }));

const AddressForm = ({
  submitForm,
  address,
  setAddress,
  city,
  setCity,
  postalCode,
  setPostalCode,
  country,
  setCountry,
  comment,
  setComment,
  values,
}) => (
  <Form className="text-center" onSubmit={submitForm}>
    <TextField
      className="d-block w-75 text-center mx-auto ultralight-border"
      name="address"
      label="Address :"
      value={address}
      placeholder="enter your street address"
      type="text"
      onChange={(e) => setAddress(e.target.value)}
    />
    <TextField
      className="d-block w-75 text-center mx-auto ultralight-border"
      name="city"
      label="City :"
      value={city}
      placeholder="enter your city"
      type="text"
      onChange={(e) => setCity(e.target.value)}
    />
    <TextField
      className="d-block w-75 text-center mx-auto ultralight-border"
      name="postalCode"
      label="PostalCode :"
      placeholder="enter your postal code"
      type="text"
      value={postalCode}
      onChange={(e) => setPostalCode(e.target.value)}
    />
    <TextField
      className="d-block w-75 text-center mx-auto ultralight-border"
      name="country"
      label="Country :"
      placeholder="enter your country of business"
      type="text"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
    />

    <SubmitField
      className="mx-auto thinner-border mt-2 pointer icon-gray-9"
      value="Submit"
    />
  </Form>
);
export default AddressForm;

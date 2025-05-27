"use client";

import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./AddProductComponent.module.scss";
import { addProductItemAsyncThunk } from "@/redux/slice/addProductSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const AddProductComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
      dispatch(addProductItemAsyncThunk(values));
      console.log("dispa", values);
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className={styles.add_wrapper}>
            <h2>Post a Product</h2>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={values.price}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="category">Category</Form.Label>
                {/* <Form.Control
                  type="text"
                  name="category"
                  onChange={handleChange}
                  value={values.category}
                /> */}
                <select
                  id="category"
                  data-testid="category"
                  className="form-select mb-2 mb-md-0 d-block"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={values.category}
                  name="category"
                >
                  <option value="">All</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men&apos;s clothing</option>
                  <option value="women's clothing">Women&apos;s clothing</option>
                </select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="image">Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  onChange={handleChange}
                  value={values.image}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductComponent;

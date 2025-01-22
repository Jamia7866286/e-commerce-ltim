"use client";

import SearchProduct from "@/app/_components/filter/searchProduct";
import React, { useEffect, useState } from "react";
import ListingCard from "../listingCard/listingCard";
import {
  filteredProducts,
  selectorAllProductList,
} from "@/redux/slice/allProductSlice";
import Alert from "react-bootstrap/Alert";
import styles from "./productListing.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export const ProductListingComponent = () => {
  // state variables
  const [alertShow, setAlertShow] = useState<boolean>(false);

  // hooks
  const dispatch = useAppDispatch();
  const { products, loading, error, filteredProductsData, filterKeys } =
  useAppSelector(selectorAllProductList);

  // object destructure
  const { title, category, minPrice, maxPrice, minRating } = filterKeys;

  // functions
  const priceRange = (filterItem: any) => {
    if (minPrice && maxPrice) {
      return filterItem.price >= minPrice && filterItem.price <= maxPrice;
    } else if (minPrice) {
      return filterItem.price >= minPrice;
    } else if (maxPrice) {
      return filterItem.price <= maxPrice;
    }
  };

  const onMySubmit = (e) => {
    e.preventDefault();
    // console.log("filterKeys :", filterKeys);

    if (title || category || minPrice || maxPrice || minRating !== "0") {
      const filterResult = products.filter((filterItem) => {
        const titleText = filterItem.title.toLowerCase();
        const categoryText = filterItem.category.toLowerCase();
        const ratingText = filterItem.rating.rate.toString();

        return (
          (title && titleText.includes(title.toLowerCase())) ||
          categoryText === category ||
          priceRange(filterItem) ||
          (minRating !== "0" && ratingText >= minRating)
        );
      });

      // console.log("filterResult", filterResult);
      dispatch(filteredProducts(filterResult));
    } else {
      // console.log("All data else part :", products);
      dispatch(filteredProducts(products));
    }
  };

  useEffect(() => {
    !loading && error && setAlertShow(true);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Product Listing</h4>
        </div>
      </div>

      {/* Filter component */}
      <form>
        <SearchProduct onMySubmit={onMySubmit} />
      </form>

      <div className="row" id="product-list">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          
          alertShow && <Alert
            variant="danger"
            className={styles.topAlert}
            onClose={() => setAlertShow(false)}
            dismissible
          >
            {error}
          </Alert>
        ) : filteredProductsData?.length > 0 ? (
          filteredProductsData?.map((product) => (
            <ListingCard key={product.id} {...product} />
          ))
        ) : (
          <p>No search results found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListingComponent;

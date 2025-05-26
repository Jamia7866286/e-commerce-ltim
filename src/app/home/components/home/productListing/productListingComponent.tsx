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
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/types/product";

export const ProductListingComponent = () => {
  // state variables
  const [alertShow, setAlertShow] = useState<boolean>(false);

  // hooks
  const dispatch = useDispatch();
  const { products, loading, error, filteredProductsData, filterKeys } =
    useSelector(selectorAllProductList);

  // object destructure
  const { category, minPrice, maxPrice, minRating } = filterKeys;

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

  const onMySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("filterKeys :", filterKeys);

    if (category || minPrice || maxPrice || minRating !== "0") {
      const filterResult = products.filter((filterItem:Product) => {
        const categoryText = filterItem.category.toLowerCase();
        const ratingText = filterItem.rating.rate.toString();

        return (
          categoryText === category ||
          priceRange(filterItem) ||
          (minRating !== "0" && ratingText >= minRating)
        );
      });
      dispatch(filteredProducts(filterResult));
    } else {
      dispatch(filteredProducts(products));
    }
  };

  useEffect(() => {
    if(error){
      setAlertShow(true);
    }
  }, [error, loading]);

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
          alertShow && (
            <Alert
              variant="danger"
              className={styles.topAlert}
              onClose={() => setAlertShow(false)}
              dismissible
            >
              {error}
            </Alert>
          )
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

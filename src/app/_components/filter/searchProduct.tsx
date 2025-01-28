import React from "react";
import styles from "./searchProduct.module.scss";
import {
  clearFilter,
  selectorAllProductList,
  updateFilterKeys,
} from "@/redux/slice/allProductSlice";
import { useDispatch, useSelector } from "react-redux";

export interface OtherProps {
  title?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
}

const SearchProduct = ({ onMySubmit }) => {
  const { btnIsDisbaled, filterKeys } = useSelector(selectorAllProductList);

  const dispatch = useDispatch();

  return (
    <div className={`mt-3 mb-5 row`}>
      <div className="col-12 col-md-2">
        <label htmlFor="title" className="small">
          Search Product
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control mb-2 mb-md-0 d-block"
          placeholder="Search..."
          onChange={(e) => {
            // dispatch(updateBtnDisabled(e.target.name))
            dispatch(updateFilterKeys({ title: e.target.value.toLowerCase() }));
          }}
          value={filterKeys?.title}
        />
      </div>
      <div className="col-12 col-md-2">
        <label htmlFor="category" className="small">
          Category
        </label>
        <select
          id="category"
          data-testid="category"
          className="form-select mb-2 mb-md-0 d-block"
          onChange={(e) => {
            // dispatch(updateBtnDisabled(e.target.name))
            dispatch(
              updateFilterKeys({ category: e.target.value.toLowerCase() })
            );
          }}
          value={filterKeys?.category}
          name="category"
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </div>
      <div className="col-12 col-md-2">
        <label htmlFor="minPrice" className="small">
          Min Price
        </label>
        <input
          type="number"
          id="minPrice"
          placeholder="min"
          className="form-control mb-2 mb-md-0 d-block"
          name="minPrice"
          onChange={(e) => {
            // dispatch(updateBtnDisabled(e.target.name))
            dispatch(
              updateFilterKeys({ minPrice: e.target.value.toLowerCase() })
            );
          }}
          value={filterKeys?.minPrice}
        />
      </div>
      <div className="col-12 col-md-2">
        <label htmlFor="maxPrice" className="small">
          Max Price
        </label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="max"
          className="form-control mb-2 mb-md-0 d-block"
          onChange={(e) => {
            // dispatch(updateBtnDisabled(e.target.name))
            dispatch(
              updateFilterKeys({ maxPrice: e.target.value.toLowerCase() })
            );
          }}
          value={filterKeys?.maxPrice}
        />
      </div>
      <div className="col-12 col-md-2">
        <label htmlFor="minRating" className="small">
          Min Rating
        </label>
        <select
          id="minRating"
          className="form-select"
          onChange={(e) => {
            // dispatch(updateBtnDisabled(e.target.name))
            dispatch(
              updateFilterKeys({ minRating: e.target.value.toLowerCase() })
            );
          }}
          value={filterKeys?.minRating}
          name="minRating"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="col-12 col-md-2">
        <label style={{ visibility: "hidden" }}>Filter</label>
        <div className={`d-flex ${styles.filterBtnBox}`}>
          <button
            type="submit"
            className="w-50 btn btn-primary"
            disabled={btnIsDisbaled}
            onClick={onMySubmit}
          >
            Filter
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(clearFilter());
            }}
            className="w-50 btn btn-danger"
            disabled={btnIsDisbaled}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;

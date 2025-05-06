"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "@/../public/images/logo.png";
import styles from "./navbar.module.scss";
import { useEffect } from "react";
import {
  fetchAllProductList,
  filteredProducts,
  selectorAllProductList,
  setSearchText,
} from "@/redux/slice/allProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

const NavbarComponent = () => {
  // hooks
  const dispatch = useDispatch();
  const { products, searchText } = useSelector(selectorAllProductList);

  const filterSerachData = () => {
    if (searchText.length) {
      const searchItems = products.filter(({ title }: { title: string }) => {
        return title.toLowerCase().includes(searchText.toLowerCase());
      });
      dispatch(filteredProducts(searchItems));
    } else {
      dispatch(filteredProducts(products));
    }
  };

  // Use Effect
  useEffect(() => {
    dispatch(fetchAllProductList());
  }, [dispatch]);

  useEffect(() => {
    filterSerachData();
  }, [searchText]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`py-0 shadow position-fixed w-100 z-1 ${styles.navbar_box}`}
    >
      <Container>
        <Link href="/home">
          <Image src={Logo} width={0} height={70} alt={"logo"} />
        </Link>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          id={""}
          value={""}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className={styles.rightNavbarBox}>
            <div className={styles.childTabs}>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/add-product">Add Product</Link>
              <Link href="/cart">Cart (0)</Link>
            </div>
            <div className={styles.searchBox}>
              <FiSearch onClick={filterSerachData} data-testid="searchBtn" />
              <input
                type="text"
                id="title"
                name="title"
                className="form-control mb-2 mb-md-0 d-block"
                placeholder="Search..."
                onChange={(e) => {
                  dispatch(setSearchText(e.target.value));
                }}
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

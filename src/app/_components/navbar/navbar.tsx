"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "@/../public/images/logo.png";
import styles from "./navbar.module.scss";
import { useEffect } from "react";
import { fetchAllProductList } from "@/redux/slice/allProductSlice";
import { useDispatch } from "react-redux";

const NavbarComponent = () => {

  // hooks
  const dispatch = useDispatch();

  // Use Effect
  useEffect(()=>{
    dispatch(fetchAllProductList())
  },[dispatch])

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
          <Nav>
            <Link href="/" className='pe-4'>
              Home
            </Link>
            <Link href="/about" className='pe-4'>About</Link>
            <Link href="/cart">Cart (0)</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

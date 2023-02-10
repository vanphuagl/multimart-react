import React, { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

/* ---------------------------------- redux --------------------------------- */
import { useSelector } from "react-redux";

/* -------------------------------- firebase -------------------------------- */
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

/* --------------------------------- assets --------------------------------- */
import logo from "../../assets/images/eco-logo.png";
import user_icon from "../../assets/images/user-icon.png";

/* ---------------------------------- utils --------------------------------- */
import useAuth from "../../utils/useAuth";

import "./Header.css";

const nav__link = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeader();

    return () => window.removeEventListener("scroll", stickyHeader);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const profileToggle = () =>
    profileActionRef.current.classList.toggle("show__profileActions");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Link className="logo" to="home">
              <img src={logo} alt="logo" />

              <div>
                <h1>Multimart</h1>
              </div>
            </Link>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>

              <span className="cart__icon" onClick={() => navigate("/cart")}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.1 }}
                  src={currentUser ? currentUser.photoURL : user_icon}
                  alt="user-icon"
                  onClick={profileToggle}
                />

                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={profileToggle}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

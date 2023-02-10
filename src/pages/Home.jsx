import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";

/* --------------------------------- assets --------------------------------- */
import heroImg from "../assets/images/hero-img.png";
import counterImg from "../assets/images/counter-timer-img.png";
import products from "../assets/data/products";

/* ------------------------------- components ------------------------------- */
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";

/* -------------------------------- services -------------------------------- */
import Services from "../services/Services";

/* ---------------------------------- utils --------------------------------- */
import useGetData from "../utils/useGetData";

import "../styles/Home.css";

const Home = () => {
  const { data: productsAPI, isLoading } = useGetData("products");

  const year = new Date().getFullYear();

  const [trendingData, setTrendingData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [mobileData, setMobileData] = useState([]);
  const [wirelessData, setWirelessData] = useState([]);
  const [popularData, setPopularData] = useState([]);

  useEffect(() => {
    const filterdTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );
    const filterdSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );
    const filterdMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );
    const filterdWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );
    const filterdPopularProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrendingData(filterdTrendingProducts);
    setSalesData(filterdSalesProducts);
    setMobileData(filterdMobileProducts);
    setWirelessData(filterdWirelessProducts);
    setPopularData(filterdPopularProducts);
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtit">Trending product in {year}</p>

                <h2>Make Your Interior More Minimalistic & Modern</h2>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, harum tempora debitis, natus delectus quos,
                  possimus maiores iure animi nihil dolor molestias a corporis
                  exercitationem fugit voluptatibus ducimus. Esse, iusto.
                </p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={heroImg} alt="hero" />
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Trending Products</h2>
            </Col>

            {isLoading ? (
              <h4 className="fw-bold">Loading......</h4>
            ) : (
              <ProductsList data={trendingData} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Best Sales</h2>
            </Col>

            <ProductsList data={salesData} />
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="countdown__col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>

              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>

            <ProductsList data={mobileData} />
            <ProductsList data={wirelessData} />
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>

            <ProductsList data={popularData} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;

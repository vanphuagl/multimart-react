import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

/* --------------------------------- assets --------------------------------- */
import products from "../assets/data/products";

/* ------------------------------- components ------------------------------- */
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductsList from "../components/UI/ProductsList";

/* ---------------------------------- redux --------------------------------- */
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

/* -------------------------------- firebase -------------------------------- */
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

/* ---------------------------------- utils --------------------------------- */
import useGetData from "../utils/useGetData";

import "../styles/ProductDetail.css";

const ProductDetails = () => {
  // const docRef = doc(db, "products", id);
  // const { data: products } = useGetData("products");

  // useEffect(() => {
  //   const getProduct = async () => {
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setProduct(docSnap.data());
  //     } else {
  //       console.log("no product!");
  //     }
  //   };

  //   getProduct();
  // });

  const dispatch = useDispatch();

  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(5);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");

  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    console.log("reviewObj", reviewObj);

    toast.success("Review submiited");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imgUrl,
        productName,
        price,
      })
    );

    toast.success("Product added successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>

            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>

                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <motion.span whileTap={{ scale: 1.2 }}>
                      <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span whileTap={{ scale: 1.2 }}>
                      <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span whileTap={{ scale: 1.2 }}>
                      <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span whileTap={{ scale: 1.2 }}>
                      <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span whileTap={{ scale: 1.2 }}>
                      <i className="ri-star-s-fill"></i>
                    </motion.span>
                  </div>

                  <p>
                    (<span>{avgRating}</span> rating)
                  </p>
                </div>

                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>Leonardo</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>

                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <span onClick={() => setRating(1)}>
                            1 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(2)}>
                            2 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(3)}>
                            3 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(4)}>
                            4 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(5)}>
                            5 <i className="ri-star-s-fill"></i>
                          </span>
                        </div>

                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            ref={reviewMsg}
                            required
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;

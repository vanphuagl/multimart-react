import React from "react";
import { useImmer } from "use-immer";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/* -------------------------------- firebase -------------------------------- */
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const AddProducts = () => {
  const [product, setProduct] = useImmer({
    title: "",
    shortDesc: "",
    description: "",
    price: "",
    category: "",
    imgUrl: null,
    isLoading: false,
  });

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setProduct((draft) => {
      draft.isLoading = true;
    });

    // add product to the firebase database

    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + product.imgUrl.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, product.imgUrl);

      uploadTask.on(
        () => {
          toast.error("images not uploaded!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("downloadURL", downloadURL);
            await addDoc(docRef, {
              title: product.title,
              shortDesc: product.shortDesc,
              description: product.description,
              price: product.price,
              category: product.category,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setProduct((draft) => {
        draft.isLoading = false;
      });
      toast.success("product successfully added!");
      navigate("/dashboard/all-products");
    } catch (err) {
      setProduct((draft) => {
        draft.isLoading = false;
      });
      toast.error("product not added!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {product.isLoading ? (
              <h4 className="py-5">Loading..........</h4>
            ) : (
              <>
                <h4 className="mb-5">Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Double sofa"
                      value={product.title}
                      onChange={(e) =>
                        setProduct((draft) => {
                          draft.title = e.target.value;
                        })
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder="lorem......."
                      value={product.shortDesc}
                      onChange={(e) =>
                        setProduct((draft) => {
                          draft.shortDesc = e.target.value;
                        })
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description"
                      value={product.description}
                      onChange={(e) =>
                        setProduct((draft) => {
                          draft.description = e.target.value;
                        })
                      }
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="$100"
                        value={product.price}
                        onChange={(e) =>
                          setProduct((draft) => {
                            draft.price = e.target.value;
                          })
                        }
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form__group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={product.category}
                        onChange={(e) =>
                          setProduct((draft) => {
                            draft.category = e.target.value;
                          })
                        }
                      >
                        <option value="">Select Category</option>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group">
                      <span>Product Image</span>
                      <input
                        type="file"
                        onChange={(e) =>
                          setProduct((draft) => {
                            draft.imgUrl = e.target.files[0];
                          })
                        }
                        required
                      />
                    </FormGroup>
                  </div>

                  <button className="buy__btn" type="submit">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;

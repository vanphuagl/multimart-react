import React from "react";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

/* ---------------------------------- utils --------------------------------- */
import useGetData from "../utils/useGetData";

/* -------------------------------- firebase -------------------------------- */
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

const Users = () => {
  const { data: usersData, isLoading } = useGetData("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("user deleted!");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td>
                      <h4 className="py-5 text-center fw-bold">
                        Loading.........
                      </h4>
                    </td>
                  </tr>
                ) : (
                  usersData?.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt="" />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteUser(user.uid);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;

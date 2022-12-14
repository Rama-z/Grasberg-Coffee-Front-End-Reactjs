import React, { Component } from "react";

// import Navbar & Footer
import Header from "../components/HeaderHome";
import Footer from "../components/Footer.js";

// import Css
import styles from "../styles/Payment.module.css";

// import image
import icon_card from "../assets/Payment/icon_card.png";
import icon_cod from "../assets/Payment/icon_cod.png";
import icon_bank from "../assets/Payment/icon_bank.png";
import TabTitle from "../utils/WebDinamis";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import transactionAction from "../redux/actions/transaction";
import CardPayment from "../components/CardPayment";
import EmptyCart from "../components/EmptyCart";
import VaPayment from "../components/VaPayment";
import { useEffect } from "react";
import { createTransaction } from "../utils/transaction";
import { toast } from "react-toastify";
// import CloseIcon from "@mui/icons-material/Close";
// import { useEffect } from "react";

export default function Payment() {
  TabTitle("Payment");
  const cart = useSelector((state) => state.transaction.cart);
  const transaction = useSelector((state) => state.transaction);
  const auth = useSelector((state) => state.auth);
  const [body, setBody] = useState(cart);
  console.log(body);
  const [modal, setModal] = useState(false);
  const [va, setVa] = useState("");
  const [transId, setTransId] = useState();
  const [bank, setBank] = useState("Permata Bank");
  const [price, setPrice] = useState(0);
  const [productItems, setProductItem] = useState([]);
  const dispatch = useDispatch();
  let total = 0;
  const paymentHandler = async () => {
    const result = await createTransaction(body, auth.token);
    setVa(`${result.data.data.midTrans.permata_va_number}`);
    setTransId(result.data.data.results.id);
    setModal(true);
  };
  useEffect(() => {
    setPrice(price + total);
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className={`container-fluid ${styles["background-payment"]}`}>
          <div className={`container ${styles["title-payment"]}`}>
            <h3>
              Checkout your <br></br> item now!
            </h3>
            {cart.product_item.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="row d-flex justify-content-between">
                <div
                  className={`${styles["content-left-payment"]} col-md-5 col-sm-12 bg-white rounded-5`}
                >
                  <div className={styles["box-left"]}>
                    <p>Order Summary</p>
                    <div className={styles.overflow}>
                      {cart.product_item?.map((item, idx) => {
                        total += item.subtotal;
                        return (
                          <>
                            <CardPayment
                              key={idx}
                              idx={idx}
                              menu={item.menu}
                              image={item.image}
                              quantity={item.quantity}
                              size_id={item.size_id}
                              subtotal={item.subtotal}
                              trans_id={item.trans_id}
                            />
                          </>
                        );
                      })}
                    </div>
                    <hr className="mx-5 my-4"></hr>
                    <div className={styles["total-payment"]}>
                      <div className={styles["total-payment-left"]}>
                        <p>SUBTOTAL</p>
                        <p>TAX & FEES</p>
                        <p>SHIPPING</p>
                      </div>
                      <div className={styles["total-payment-right"]}>
                        <p>IDR: {total}</p>
                        <p>IDR: {total * 0.11}</p>
                        <p>IDR: 10.000</p>
                      </div>
                    </div>
                    <div className={styles["subtotal-payment"]}>
                      <p>TOTAL</p>
                      <p>IDR {10000 + total + total * 0.11}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-sm-12 d-flex flex-column mb-5">
                  <div className="row d-flex flex-column">
                    <div className={`${styles["adress"]} col-12`}>
                      <div className={styles["address-detail"]}>
                        <h2>Address</h2>
                        <p>edit</p>
                      </div>
                      <div className={styles["box-address"]}>
                        <h5>
                          <b className="me-1">Delivery</b>to
                        </h5>
                        <p className={styles["address-column"]}>
                          {cart.delivery_address}
                        </p>
                        <p>{cart.phone}</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className={styles["payment-method"]}>
                        <h2>Payment Method</h2>
                      </div>
                      <div className={styles["choose-payment"]}>
                        <div className={styles["radio-payment"]}>
                          <div
                            className={`form-check d-flex flex-row align-items-center ${styles["styling-data-radio"]}`}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              onChange={() => {
                                setBody({
                                  ...body,
                                  payment_method: "Card",
                                  total_price: 10000 + total + total * 0.11,
                                });
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            ></label>
                            <div className={styles["data-content-payment"]}>
                              <img
                                src={icon_card}
                                alt="icon-card"
                                width="40px"
                                className="rounded-2 mx-3"
                              ></img>
                              <span>Card</span>
                            </div>
                          </div>
                          <div
                            className={`form-check d-flex flex-row align-items-center ${styles["styling-data-radio"]}`}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              onChange={() => {
                                setBody({
                                  ...body,
                                  payment_method: "Bank",
                                  total_price: 10000 + total + total * 0.11,
                                });
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            ></label>
                            <div className={styles["data-content-payment"]}>
                              <img
                                src={icon_bank}
                                alt="icon-bank"
                                width="40px"
                                className="rounded-2 mx-3"
                              ></img>
                              <span>Bank</span>
                            </div>
                          </div>
                          <div
                            className={`form-check d-flex flex-row align-items-center ${styles["styling-data-radio"]}`}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              onChange={() => {
                                setBody({
                                  ...body,
                                  payment_method: "COD",
                                  total_price: 10000 + total + total * 0.11,
                                });
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            ></label>
                            <div className={styles["data-content-payment"]}>
                              <img
                                src={icon_cod}
                                alt="icon-cod"
                                width="40px"
                                className="rounded-2 mx-3"
                              ></img>
                              <span>Cash On Delivery</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles["confirm-pay"]}>
                      <button
                        onClick={() => {
                          if (body.total_price === null)
                            return toast.error("Choose payment method!");
                          paymentHandler();
                        }}
                      >
                        <span>Confirm and Pay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <VaPayment
          open={modal}
          setOpen={setModal}
          title={bank}
          body={va}
          id={transId}
        />
      </main>
      <Footer />
    </>
  );
}

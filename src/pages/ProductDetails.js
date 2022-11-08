import React, { Component } from "react";

import styles from "../styles/ProductDetails.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/HeaderHome";
import Footer from "../components/Footer";
// import prod_cold_brew from "../assets/Product/img_coldbrew.png";
import withRouteParams from "../helpers/withRouteParams";
import axios from "axios";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: "",
    };
  }
  componentDidMount() {
    this.coffeeClick();
    // {this.state.product.map((item, idx) => {
    //   return <div key={idx}>{item.description}</div>;
    // })}
  }
  coffeeClick = async () => {
    const { params } = this.props;
    axios
      .get(`http://localhost:8080/api/v1/products/${params.id}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.result);
        console.log(res.data.result.description);
        const product = res.data.result;
        this.setState({ product });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    // const { params } = this.props;
    // console.log(params);
    const role = JSON.parse(localStorage.getItem("user-info"))
      ? JSON.parse(localStorage.getItem("user-info")).role
      : "";
    return (
      <>
        <Header />
        <main className="row d-flex justify-content-center align-content-center flex-column flex-md-row mb-5">
          <section className="col-6 col-sm-12 col-lg-6 col-md-6 text-center">
            <nav className="text-start">
              <section className="text-start align-items-start fs-5">
                Favorite & Promo <i className="bi bi-chevron-right"></i>
                <span>
                  <a className={styles.title_product} href="/">
                    {this.state.product.menu}
                  </a>
                </span>
              </section>
            </nav>
            <img
              className={`${styles.content_left} my-5`}
              src={`http://localhost:8080/${this.state.product.image}`}
              alt="prod_cold_brew"
            />
            <section
              className={`${styles.delivery_time_bar} d-flex flex-column justify-content-start text-start p-4 mx-auto`}
            >
              <h3 className="fs-3 fw-bold">Delivery and Time</h3>
              <section className="my-4 d-flex flex-wrap">
                <button
                  className={`${styles.btn_delivery_time} ${styles.selected} my-sm-2`}
                >
                  Dine in
                </button>
                <button className={`${styles.btn_delivery_time} my-sm-2`}>
                  Door Delivery
                </button>
                <button className={`${styles.btn_delivery_time} my-sm-2`}>
                  Pick Up
                </button>
              </section>
              <section className="mt-2 mb-4">
                <span className={styles.now}>Now</span>
                <button
                  className={`${styles.btn_delivery_time} ${styles.selected}`}
                >
                  Yes
                </button>
                <button className={styles.btn_delivery_time}>No</button>
              </section>
              <section className="d-flex align-items-center">
                <span className="fs-5 me-3 fw-light">Set Time</span>
                <input
                  className={styles.set_time}
                  type="text"
                  name="set_time"
                  id="set_time"
                  placeholder="Enter time for reservation"
                />
              </section>
            </section>
          </section>
          <article
            className={`${styles.content_right} col-6 col-sm-12 col-md-6 col-lg-6 text-center d-flex flex-column justify-content-between mx-auto`}
          >
            <h2 className={styles.title}>{this.state.product.menu}</h2>
            <div className="text-start">{this.state.product.description}</div>
            <p className={`${styles.info} text-start mt-5`}>
              Delivery only on <span>Monday to</span> <br />
              <span>friday</span> at <span>1 - 7 pm</span>
            </p>
            <section className="d-flex justify-content-between align-items-center">
              <div
                className={`${styles.qty} d-flex justify-content-center align-items-center`}
              >
                <span>
                  <button type="button">-</button>
                </span>
                <input type="text" maxLength="2" />
                <span>
                  <button type="button">+</button>
                </span>
              </div>
              <p className={styles.price}>IDR {this.state.product.price}</p>
            </section>
            <span className={`${styles.cart} mb-3 mb-sm-5 mb-md-5 mb-lg-3`}>
              Add to Cart
            </span>{" "}
            <br />
            {role === "admin" ? (
              <span className={styles.staff}>Edit Product</span>
            ) : (
              <span className={styles.staff}>Ask a Staff</span>
            )}
          </article>
          <section
            className={`${styles.choose_checkout} row justify-content-between flex-md-column flex-lg-row`}
          >
            <section className={`${styles.size} col-4 text-center ms-0`}>
              <h4>Choose a size</h4>
              <button className=" rounded-circle">R</button>
              <button className=" rounded-circle">L</button>
              <button className=" rounded-circle">XL</button>
            </section>
            <section
              className={`${styles.checkout} col-6 d-flex justify-content-between align-content-center`}
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  className="me-3"
                  src={`http://localhost:8080/${this.state.product.image}`}
                  alt="prod_cold_brew"
                />
                <section className="d-flex flex-column justify-content-center">
                  <h5 className="fw-bold fs-4">{this.state.product.menu}</h5>
                  <span>x1 (Large)</span>
                  <span>x1 (Regular)</span>
                </section>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <span className="fs-4 fw-bold">Checkout</span>
                <button className={styles.button_checkout}>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </section>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouteParams(ProductDetails);

import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ProductStore from "../../store/ProductStore";

const Products = () => {
  const { listByRemark, getRemarkList } = ProductStore();

  return (
    <div className="section">
      <div className="container-fluid py-5 bg-light">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
          <span className="bodySmal mb-3 text-center">
            Explore a World of Choices Across Our Most Popular
          </span>
          <div className="col-12">
            <div>
              <ul className="nav nav-pills p-3 justify-content-center mb-3" id="pills-tab" role="tablist"  >
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getRemarkList("new");
                    }}
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-new"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    New
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getRemarkList("trending");
                    }}
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-trending"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Trending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getRemarkList("popular");
                    }}
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-popular"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Popular
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getRemarkList("top");
                    }}
                    className="nav-link"
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-top"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-selected="false"
                  >
                    Top
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button  onClick={() => {  getRemarkList("special") }} className="nav-link" id="pills-disabled-tab"
                    data-bs-toggle="pill" data-bs-target="#pills-special" type="button" role="tab"
                    aria-controls="pills-disabled"  aria-selected="false"
                  >Special</button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-new"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex="0"
                >
                  {
                    listByRemark===null?(<div>Loading</div>):(
                      <div className="container">
                    <div className="row">
                      {listByRemark.map((item, i) => {
                        let price = <p className="bodyMedium text-dark my-1"> Price: {item["price"]} BDT</p>
                        if (item["discount"]===true) {
                          price = <p className="bodyMedium text-dark my-1">Price: <strike> {item["price"]} BDT</strike> {item["discountPrice"]} BDT</p>
                        }
                        return (
                          <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <Link
                              to={`/details/${item["_id"]}`}
                              className="card shadow-sm h-100 rounded-3 bg-white"
                            >
                              <img
                                className="w-100 rounded-top-2"
                                src={item["image"]}
                              />
                              <div className="card-body">
                                <p className="bodySmal text-secondary my-1"> {item["title"]} </p>
                                {price}
                                <StarRatings rating={parseFloat(item["star"])} starRatedColor="red" starDimension="15px" starSpacing="2px"  />
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                    )
                  }
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-trending"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabIndex="0"
                >
                  {
                    listByRemark===null?(<ProductSkeleton />):(
                      <div className="container">
                    <div className="row">
                      {listByRemark.map((item, i) => {
                        let price = <p className="bodyMedium text-dark my-1"> Price: {item["price"]} BDT</p>
                        if (item["discount"]===true) {
                          price = <p className="bodyMedium text-dark my-1">Price: <strike> {item["price"]} BDT</strike> {item["discountPrice"]} BDT</p>
                        }
                        return (
                          <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <Link
                              to={`/details/${item["_id"]}`}
                              className="card shadow-sm h-100 rounded-3 bg-white"
                            >
                              <img
                                className="w-100 rounded-top-2"
                                src={item["image"]}
                              />
                              <div className="card-body">
                                <p className="bodySmal text-secondary my-1">{item["title"]}</p>
                                {price}
                                <StarRatings rating={parseFloat(item["star"])} starRatedColor="red" starDimension="15px" starSpacing="2px"  />
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                    )
                  }
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-popular"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                  tabIndex="0"
                >
                  {
                    listByRemark===null?(<ProductSkeleton />):(
                      <div className="container">
                    <div className="row">
                      {listByRemark.map((item, i) => {
                        let price = <p className="bodyMedium text-dark my-1"> Price: {item["price"]} BDT</p>
                        if (item["discount"]===true) {
                          price = <p className="bodyMedium text-dark my-1">Price: <strike> {item["price"]} BDT</strike> {item["discountPrice"]} BDT</p>
                        }
                        return (
                          <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <Link
                              to={`/details/${item["_id"]}`}
                              className="card shadow-sm h-100 rounded-3 bg-white"
                            >
                              <img
                                className="w-100 rounded-top-2"
                                src={item["image"]}
                              />
                              <div className="card-body">
                                <p className="bodySmal text-secondary my-1"> {item["title"]} </p>
                                {price}
                                <StarRatings rating={parseFloat(item["star"])} starRatedColor="red" starDimension="15px" starSpacing="2px"  />
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                    )
                  }
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-top"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {
                    listByRemark===null?(<ProductSkeleton />):(
                      <div className="container">
                    <div className="row">
                      {listByRemark.map((item, i) => {
                        let price = <p className="bodyMedium text-dark my-1"> Price: {item["price"]} BDT</p>
                        if (item["discount"]===true) {
                          price = <p className="bodyMedium text-dark my-1">Price: <strike> {item["price"]} BDT</strike> {item["discountPrice"]} BDT</p>
                        }
                        return (
                          <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <Link
                              to={`/details/${item["_id"]}`}
                              className="card shadow-sm h-100 rounded-3 bg-white"
                            >
                              <img
                                className="w-100 rounded-top-2"
                                src={item["image"]}
                              />
                              <div className="card-body">
                                <p className="bodySmal text-secondary my-1"> {item["title"]} </p>
                                {price}
                                <StarRatings rating={parseFloat(item["star"])} starRatedColor="red" starDimension="15px" starSpacing="2px"  />
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                    )
                  }
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-special"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {
                    listByRemark===null?(<ProductSkeleton />):(
                      <div className="container">
                    <div className="row">
                      {listByRemark.map((item, i) => {
                        let price = <p className="bodyMedium text-dark my-1"> Price: {item["price"]} BDT</p>
                        if (item["discount"]===true) {
                          price = <p className="bodyMedium text-dark my-1">Price: <strike> {item["price"]} BDT</strike> {item["discountPrice"]} BDT</p>
                        }
                        return (
                          <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <Link
                              to={`/details/${item["_id"]}`}
                              className="card shadow-sm h-100 rounded-3 bg-white"
                            >
                              <img
                                className="w-100 rounded-top-2"
                                src={item["image"]}
                              />
                              <div className="card-body">
                                <p className="bodySmal text-secondary my-1"> {item["title"]} </p>
                                {price}
                                <StarRatings rating={parseFloat(item["star"])} starRatedColor="red" starDimension="15px" starSpacing="2px"  />
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

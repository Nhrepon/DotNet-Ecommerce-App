import React, { useState } from "react";
import ProductStore from "../../store/ProductStore";
import ProductImage from "../../components/products/ProductImage";
import parse from "html-react-parser";
import ReviewComponent from "../../components/products/ReviewComponent";
import CartSubmitButton from "../cart/CartSubmitButton";
import CartStore from "../../store/CartStore";
import toast from "react-hot-toast";
import WishSubmitButton from "../wish/WishSubmitButton";
import WishStore from "../../store/WishStore";
import UserStore from "../../store/UserStore";

const Details = () => {
  const { productDetails } = ProductStore();
  const { cartSave, cartForm, getCartList, cartFormOnChange } = CartStore();
  const { saveWishList, getWishList } = WishStore();
  const {isLogin}=UserStore();

  const [quantity, setQuantity] = useState(1);
  const incrementQty = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const addToCart = async (productId) => {
    if (cartForm.size === "") {
      toast.error("Select Size First");
    }else if (cartForm.color === "") {
      toast.error("Select Color First");
      
    }else{
    const response = await cartSave(cartForm, productId, quantity);
    toast.success("Item added to cart ");
    await getCartList();
  }
      };

  const addToWish = async (productId) => {
    const response = await saveWishList(productId);
    toast.success("Item added to wish list ");
    await getWishList();
  };    

  if (productDetails === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7 p-3">
              <ProductImage />
            </div>
            <div className="col-md-5 p-3">
              <h4>{productDetails[0]["title"]}</h4>
              <p className="text-muted bodySmal my-1">
                Category: {productDetails[0]["category"]["categoryName"]}
              </p>
              <p className="text-muted bodySmal my-1">
                Brand: {productDetails[0]["brand"]["brandName"]}
              </p>
              <p className="bodySmal mb-2 mt-1">
                {productDetails[0]["description"]}
              </p>
              <p>
                Price:
                {productDetails[0]["discount"] == true ? (
                  <span>
                    <strike class="text-secondary">
                      {" "}
                      {productDetails[0]["price"]}
                    </strike>{" "}
                    {productDetails[0]["discountPrice"]}
                  </span>
                ) : (
                  <span> {productDetails[0]["price"]} </span>
                )}
              </p>

              <div className="row">
                <div className="col-4 p-2">
                  <label className="bodySmal">Size</label>
                  <select value={cartForm.size} onChange={(e)=>{cartFormOnChange('size',e.target.value)}} className="form-control my-2 form-select">
                    <option value="">Size</option>
                    {productDetails[0]["details"]["size"]
                      .split(",")
                      .map((item, i) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="bodySmal">Color</label>
                  <select value={cartForm.color} onChange={(e)=>{cartFormOnChange('color',e.target.value)}}  className="form-control my-2 form-select">
                    <option value="">Color</option>
                    {productDetails[0]["details"]["color"]
                      .split(",")
                      .map((item, i) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="bodySmal">Quantity</label>
                  <div className="input-group my-2">
                    <button
                      onClick={decrementQty}
                      className="btn btn-outline-secondary">
                      -
                    </button>
                    <input
                      value={quantity}
                      type="text"
                      className="form-control bg-light text-center"
                      readOnly
                    />
                    <button
                      onClick={incrementQty}
                      className="btn btn-outline-secondary">
                      +
                    </button>
                  </div>
                </div>
                <div className="col-4 p-2">
                  <CartSubmitButton
                    onClick={async () => {
                      isLogin() ? await addToCart(productDetails[0]["_id"]) : toast.error("Please Login First");
                    }}
                    className="btn w-100 btn-success"
                    text="Add to Cart"></CartSubmitButton>
                </div>
                <div className="col-4 p-2">
                  <WishSubmitButton onClick={async() => {await addToWish(productDetails[0]["_id"])}} className="btn w-100 btn-success" text="Add to Wish"></WishSubmitButton>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="Special-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Special-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Special-tab-pane"
                  aria-selected="true">
                  Specifications
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Review-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Review-tab-pane"
                  aria-selected="false">
                  Review
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="Special-tab-pane"
                role="tabpanel"
                aria-labelled-by="Special-tab"
                tabIndex="0">
                {parse(productDetails[0]["details"]["description"])}
              </div>
              <div
                className="tab-pane fade"
                id="Review-tab-pane"
                role="tabpanel"
                aria-labelledby="Review-tab"
                tabIndex="0">
                <ReviewComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;

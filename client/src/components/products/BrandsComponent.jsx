import React from "react";
import { Link } from "react-router-dom";
import ProductStore from "../../store/ProductStore";


const BrandsComponent = () => {
  const { brandList } = ProductStore();
  if (brandList === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
            <span className="bodySmal mb-5 text-center">
              Explore a World of Choices Across Our Most Popular <br />
              Shopping Categories{" "}
            </span>
            {
                brandList.map((item, index)=>{
                    return(
                        <div className="col-6 col-lg-8r text-center col-md-8r p-2">
                        <Link to={`/listByBrand/${item['_id']}`} className="card h-100 rounded-3 bg-light">
                            <div className="card-body">
                            <img className="w-75" src={item['brandImg']} />
                            <p className="bodySmal mt-3">{item['brandName']} </p>
                            </div>
                        </Link>
                        </div>
                    )
                })
            }


            
          </div>
        </div>
      </div>
    );
  }
};

export default BrandsComponent;

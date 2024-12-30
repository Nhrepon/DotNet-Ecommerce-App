import axios from "axios";
import React, { useEffect, useState } from "react";
import MasterLayout from "../layouts/MasterLayout";

const HomePage = () => {
  const [response, setResponse] = useState();
  useEffect(() => {
    (async () => {
      let response = await axios.get("/api/brand");
      setResponse(response.data["data"]);
    })();
  }, []);

  return (
    <MasterLayout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                  </tr>
                </thead>
                <tbody>
                  {response != null &&
                    response.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.id}</td>
                          <td>{item.brandName}</td>
                          <td>{item.brandDesc}</td>
                          <td>
                            <img
                              src={item.brandImg}
                              alt={item.brandName}
                              width={100}
                            />
                          </td>
                          <td>{item.createdAt}</td>
                          <td>{item.updatedAt}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default HomePage;

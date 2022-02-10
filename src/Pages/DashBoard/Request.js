import React, { useEffect, useState } from "react";
import { db } from "../../Config";
import { getDocs, collection } from "firebase/firestore";
import filterOutliers from "./Outliers";
import Plot from "react-plotly.js";

const Request = () => {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "require");

  const allPrice = [];
  const allName = [];

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      console.log(data);
      console.log("Inside Require");
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
    // getPrice();
  }, []);

  const getPrice = () => {
    postList.map((item) => {
      const { id, price, name } = item;
      let temp = parseInt(price);
      allPrice.push(temp);
      allName.push(name);
    });

    console.log(allPrice);
  };

  getPrice();

  let result = filterOutliers(allPrice);

  console.log(result);
  console.log(allName);

  return (
    <div>
      <h1>Requested</h1>
      <div>
        <Plot
          data={[
            {
              x: allName,
              y: allPrice,
              type: "scatter",
            },
          ]}
          layout={{
            width: 600,
            height: 500,
            title: "Scatterplot of Given Data",
          }}
        />
      </div>
    </div>
  );
};

export default Request;

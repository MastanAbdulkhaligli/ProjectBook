import React, { useEffect, useState } from "react";
import { db } from "../../Config";
import { getDocs, collection } from "firebase/firestore";
import "../../Style/Download.css";
import { CSVLink, CSVDownload } from "react-csv";

const Download = () => {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  const ready = [["Author", "Image Link", "Title", "Price", "Category", "ID"]];

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      console.log(data);
      console.log("Now");
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
    makeReady();
  }, []);

  const makeReady = () => {
    postList.map((item) => {
      const propertyValues = Object.values(item);
      ready.push(propertyValues);
    });
  };

  makeReady();

  return (
    <div>
      <h1>Download Book Database as CSV</h1>
      <CSVLink data={ready}>
        <button className="buttonDownload">Download Me</button>
      </CSVLink>
    </div>
  );
};

export default Download;

import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Config";
import "../Style/Home.css";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      console.log(data);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);
  return (
    <div className="container">
      {postList.map((item) => {
        const { id, title, author, img_link, price, category } = item;
        return (
          <div className="card" id="dd" key={id}>
            <img src={img_link} alt="title" />
            <h2>{title}</h2>
            <h2>{author}</h2>
            <h2>{price}</h2>
            <h2>{category}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

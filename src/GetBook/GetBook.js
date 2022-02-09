import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Config";

const GetBook = () => {
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
    <div>
      {postList.map((item) => {
        return (
          <div key={item.id}>
            {item.title} <div>{item.author}</div>
            <div>{item.price}</div>
            <div>
              <img src={item.img_link} alt={item.title} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetBook;

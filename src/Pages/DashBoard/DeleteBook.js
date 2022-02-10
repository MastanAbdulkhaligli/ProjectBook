import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Config";
import "../../Style/Delete.css";
import { useNavigate } from "react-router-dom";

const DeleteBook = () => {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  const [deleted, setDeleted] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      console.log(data);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deleted]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    navigate("/createpost/deletebook");
    setDeleted(!deleted);
  };

  return (
    <>
      <div>
        <h1>Delete Book</h1>
      </div>

      {postList.map((item) => {
        const { id, title, author, img_link, price, category } = item;
        return (
          <div className="container-2" key={id}>
            <div className="Items-2">
              <h3>{title}</h3>
              <h3>{author}</h3>
              <h3>{price} AZN</h3>
              <div className="btns-2">
                <button
                  onClick={() => {
                    deletePost(id);
                  }}
                  className="btnRed"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DeleteBook;

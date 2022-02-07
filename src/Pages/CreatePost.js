import React, { useEffect, useState } from "react";
import { addDoc } from "firebase/firestore";
import { db, auth } from "../Config";
import { useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";
import { storage } from "../Config";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useForm } from "react-hook-form";

import "../Style/AddBook.css";

// Create Post Function
const CreatePost = ({ isAuth }) => {
  // useForm Hook
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Showing Progress bar when uploading image
  const [progress, setProgress] = useState(0);
  // Image link for pushing to database then retrieve it
  const [image, setImage] = useState("");
  // Title of the book
  const [title, setTitle] = useState("");
  // Price of the book
  const [price, setPrice] = useState(null);
  // Author of the Book
  const [author, setAuthor] = useState("");
  // Category of the Book
  const [category, setCategory] = useState("");

  // Referencing Collection in Database
  const postCollectionRef = collection(db, "posts");

  let navigate = useNavigate();

  // When
  useEffect(() => {
    if (image !== "") {
      createPost();
    }
  }, [image, title]);

  const onSubmit = (data) => {
    setTitle(data.title);
    setPrice(data.price);
    setAuthor(data.author);
    setCategory(data.category);

    const storageRef = ref(storage, `${data.image[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, data.image[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImage(url);
        });
      }
    );
    reset();
  };

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      img_link: image,
      price,
      author,
      category,
      // author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <form className="addBook" onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Book</h1>
        <fieldset>
          <label> Upload Image</label>
          <div>
            <input
              className="chooseFile"
              {...register("image", { required: true })}
              type="file"
            />
            {errors.image && <span>This field is required</span>}
          </div>

          <div>
            {/* <label> Title of the Book</label> */}
            <input
              {...register("title", { required: true })}
              placeholder="Title"
            />
            {errors.title && <span>This field is required</span>}
          </div>

          <div>
            {/* <label> Price of the Book</label> */}
            <input
              {...register("price", { required: true })}
              placeholder="Price"
            />
            {errors.price && <span>This field is required</span>}
          </div>

          <div>
            {/* <label>Author of the Book</label> */}
            <input
              {...register("author", { required: true })}
              placeholder="Author"
            />
            {errors.author && <span>This field is required</span>}
          </div>

          <div>
            {/* <label>Category</label> */}
            <input
              {...register("category", { required: true })}
              placeholder="Category"
            />
            {errors.category && <span>This field is required</span>}
          </div>

          <button className="BtnSubmit"> Submit</button>
          <h3>Uploaded {progress} %</h3>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePost;

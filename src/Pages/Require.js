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
import "../Style/Require.css";
const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <div>
      <label>{label}</label>
    </div>
    <select
      className="category"
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
    >
      <option value="Computer Science">Computer Science</option>
      <option value="Classics">Classics</option>
      <option value="Horror">Horror</option>
      <option value="Literary Fiction">Literary Fiction</option>
    </select>
  </>
));

const Require = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // User Name and Surname
  const [name, setName] = useState("");
  // Title of the book
  const [title, setTitle] = useState("");
  // Price of the book
  const [price, setPrice] = useState(null);
  // Author of the Book
  const [author, setAuthor] = useState("");
  // Category of the Book
  const [category, setCategory] = useState("");

  // Referencing Collection in Database
  const postCollectionRef = collection(db, "require");

  let navigate = useNavigate();

  // When
  useEffect(() => {
    if (category !== "") {
      createPost();
    }
    console.log("Vaa");
  }, [author]);

  const onSubmit = (data) => {
    setName(data.name);
    setTitle(data.title);
    setPrice(data.price);
    setCategory(data.Category);
    setAuthor(data.author);
    // createPost();
    reset();
  };

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      name,
      title,
      author,
      price,
      category,
      // author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    // navigate("/");
  };

  return (
    <div>
      <form className="addBook" onSubmit={handleSubmit(onSubmit)}>
        <h1> Require Book</h1>
        <fieldset>
          <label>Send Your Request</label>

          <div>
            {/* <label> Title of the Book</label> */}
            <input
              {...register("name", { required: true })}
              placeholder="Name and Surname"
            />
            {errors.title && <span>This field is required</span>}
          </div>

          <div>
            {/* <label> Title of the Book</label> */}
            <input
              {...register("title", { required: true })}
              placeholder="Title Of The Book"
            />
            {errors.title && <span>This field is required</span>}
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
            {/* <label> Price of the Book</label> */}
            <input
              {...register("price", { required: true })}
              placeholder="Best Price (AZN) "
            />
            {errors.price && <span>This field is required</span>}
          </div>

          <div>
            {/* <label>Category</label> */}
            <Select label="Category" {...register("Category")} />
            {errors.category && <span>This field is required</span>}
          </div>

          <button className="BtnSubmit"> Submit</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Require;

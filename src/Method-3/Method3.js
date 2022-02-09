import React, { useEffect, useRef, useState } from "react";
import { storage } from "../Config";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/storage";
import { useForm } from "react-hook-form";
import { db } from "../Config";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import GetBook from "../GetBook/GetBook";

const Method3 = () => {
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
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label> Upload Image</label>
          <input {...register("image", { required: true })} type="file" />
          {errors.image && <span>This field is required</span>}
        </div>

        <div>
          <label> Title of the Book</label>
          <input {...register("title", { required: true })} />
          {errors.title && <span>This field is required</span>}
        </div>

        <div>
          <label> Price of the Book</label>
          <input {...register("price", { required: true })} />
          {errors.price && <span>This field is required</span>}
        </div>

        <div>
          <label>Author of the Book</label>
          <input {...register("author", { required: true })} />
          {errors.author && <span>This field is required</span>}
        </div>

        <div>
          <label>Category</label>
          <input {...register("category", { required: true })} />
          {errors.category && <span>This field is required</span>}
        </div>

        <button> Submit</button>
      </form>
      <h3>Uploaded {progress} %</h3>
    </div>
  );
};

export default Method3;

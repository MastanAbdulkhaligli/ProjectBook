import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../Config";
import { ref } from "firebase/storage";

const ImgUpload = () => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    // If you want to upload in files folder
    // const storageRef = ref(storage, `/files/${file.name}`);

    const storageRef = ref(storage, `${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

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
  };

  return (
    <div>
      <center>
        <form onSubmit={formHandler}>
          <input type="file" />
          <button type="submit">Upload</button>
          <img src={image} alt="" />
        </form>
      </center>

      <h3>Uploaded {progress} %</h3>
    </div>
  );
};

export default ImgUpload;

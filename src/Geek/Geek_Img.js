import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { ref } from "firebase/storage";
import storage2 from "../Config";
import { storage } from "../Config";

const Geek_Img = () => {
  const [image, setImage] = useState("");
  const upload = () => {
    if (image == null) return;
    storage.ref(`${image.name}`).on("state_changed", alert("success"), alert);
  };

  return (
    <div className="App">
      <center>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button onClick={upload}>Upload</button>
      </center>
    </div>
  );
};

export default Geek_Img;

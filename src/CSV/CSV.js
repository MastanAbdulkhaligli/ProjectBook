import React from "react";
import { CSVLink, CSVDownload } from "react-csv";

const CSV = () => {
  const ready = [["Author", "Image Link", "Title", "Price", "Category", "ID"]];

  const data = [
    {
      author: "Springer",
      img_link:
        "https://firebasestorage.googleapis.com/v0/b/simple-blog-915c1.appspot.com/o/ISLR.jpg?alt=media&token=488e83ce-8dfb-44db-9bcb-d642036d5f4e",
      title: "ISLR",
      price: "120",
      category: "Statistics",
      id: "dlkYO9aL9QAyRuQj8M35",
    },

    {
      category: "Science",
      price: "100",
      author: "Thomas Chormen",
      img_link:
        "https://firebasestorage.googleapis.com/v0/b/simple-blog-915c1.appspot.com/o/introduction-to-algorithms-fourth-edition.jpg?alt=media&token=cd6ad6fd-d0a2-4a5a-835f-e9617818ceaf",
      title: "Introduction to Algorithm",
      id: "mbO23tM49LSVX0KWA5Rz",
    },
  ];

  const makeReady = () => {
    data.map((item) => {
      const propertyValues = Object.values(item);
      ready.push(propertyValues);
    });
  };

  makeReady();

  return (
    <div>
      <h1>CSV</h1>
      <CSVLink data={ready}>Download me</CSVLink>
    </div>
  );
};

export default CSV;

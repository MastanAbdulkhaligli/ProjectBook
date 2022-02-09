import React from "react";
// import "./Design.css";

const Cards = () => {
  return (
    <div>
      <section className="container">
        <div className="card">
          <div className="card-image book-1">
            <img
              className="card-image"
              src="https://kbimages1-a.akamaihd.net/d76202b5-0140-46a1-8b2c-71754ca21d2e/1200/1200/False/introduction-to-algorithms-fourth-edition.jpg"
            />
          </div>
          {/* Title */}
          <h3>Introduction to Algorithm</h3>
          {/* Author */}
          <p>Thomas Ne bilim ne salam aleykum</p>
          {/* Price */}
        </div>

        <div className="card">
          <div className="card-image book-1">
            <img
              className="card-image"
              src="https://images-na.ssl-images-amazon.com/images/I/71wFsMP1f4L.jpg"
            />
          </div>
          <h3>Collective Intelligence</h3>
          <p>Toby Segaron</p>
        </div>

        <div className="card">
          <div className="card-image book-1">
            <img
              className="card-image"
              src="https://images-na.ssl-images-amazon.com/images/I/8128hU9G05L.jpg"
            />
          </div>
          <h3>Introduction to the Theory of Computation</h3>
          <p>Michael Sipser</p>
        </div>

        <div className="card">
          <div className="card-image book-1">
            <img
              className="card-image"
              src="https://trevorhastie.github.io/ISLR/ISL%20Cover%202.jpg"
            />
          </div>
          <h3>An Introduction To Statistical Learning</h3>
          <p>Gareth James</p>
        </div>
      </section>
    </div>
  );
};

export default Cards;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";

const Card = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedIndex = localStorage.getItem("index");
    if (savedIndex) {
      setIndex(Number(savedIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("index", index);
  }, [index]);

  useEffect(() => {
    getData();
  }, [index]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=8`,
      );
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <h1>Image Gallery</h1>
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      </>
    );
  }

  return (
    <div className="main">
      <div>
        <h1>Image Gallery</h1>
      </div>

      <div className="card-container">
        {data.map((val) => (
          <div className="card" key={val.id}>
            <a href={val.url} target="_blank" className="img">
              <img loading="lazy" src={val.download_url} />
            </a>
            <h2>{val.author}</h2>
          </div>
        ))}
      </div>
      <div className="btn-container">
        <button
          disabled={index === 1}
          onClick={() => setIndex((prev) => prev - 1)}
        >
          Previous
        </button>
        <div className="index">
          <h2>Page {index}</h2>
        </div>
        <button onClick={() => setIndex((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Card;

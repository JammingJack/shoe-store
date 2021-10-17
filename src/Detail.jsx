import React from "react";
import useFetch from "./services/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  const { id } = useParams();
  const { data: product, error, loading } = useFetch(`products/${id}`);
  const Navigate = useNavigate();
  //TODO Display Product Detail
  if (error) throw error;
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <p>
        <button className="btn btn-primary" onClick={() => Navigate("/cart")}>
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}

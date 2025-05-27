import React, { FC } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import styles from "./listingCard.module.scss";
import { lessMoreString } from "@/app/utils/commonData";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  rating?: {
    rate: number;
    count: number;
  };
  image: string;
  description: string;
}

const ListingCard:FC<ProductProps> = (product) => {
  const { id, title, price, rating, image, description } = product;

  const addToCart = (id:number)=>{
    console.log('add to cart', id);
  }

  return (
    <div className="col-md-4 mb-4" data-testid="product-card">
      <div className={`card ${styles.card}`}>
        <Image src={image} alt="product image" width={300} height={300} className="card-img-top" />
        <div className="card-body">
          <h6 className={`card-title ${styles.titleHeading}`}>{title}</h6>
          <p className={`card-text ${styles.descriptionText}`}>
            {lessMoreString(description, 130)}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span className={`h6 mb-0 ${styles.price}`}>${price}</span>
            <small className={`m-0 ${styles.available}`}>
              Available: <strong>{rating?.count}</strong>
            </small>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-transparent align-items-center border-0 py-3">
          <div>
            {Array.from({ length: 5 }, (_, i) => {
              const fullStar = i + 1;
              const halfStar = i + 0.1;
              return (
                <span key={i} title={rating?.rate?.toString()}>
                  {(rating?.rate ?? 0) >= fullStar ? (
                    <FaStar key={i} className="text-danger" />
                  ) : (
                    (rating?.rate ?? 0) >= halfStar && (
                      <FaStarHalfAlt className="text-danger" />
                    )
                  )}
                </span>
              );
            })}
          </div>
          <div className="d-flex" style={{ gap: "8px" }}>
            <button className="btn btn-outline-primary btn-sm" onClick={()=>addToCart(id)}>
              ADD TO CART
            </button>
            <Link href={`product/${id}`}>
              <button className="btn btn-primary btn-sm">DETAILS</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

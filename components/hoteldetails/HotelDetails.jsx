import React from 'react';
import styles from "./hoteldetails.module.css";

const HotelDetails = ({hotel}) => {
    console.log(hotel);
    return (
        <div className={styles.details}>
            <div className={styles.header}>
            <p className={styles.title}>{hotel?.hotel_name}</p>
            <p className={styles.ratingWord}>{hotel?.review_score_word}</p>
            <p className={styles.rating}>{(hotel?.review_score * 1.0).toFixed(1)}</p>
            </div>
            <div className={styles.address}>
                <p className={styles.streetaddress}>{hotel?.address}</p>
                <p className={styles.cityKms}>{hotel?.distances[0].text}</p>
                <p className={styles.city}>show on map</p>
            </div>
            <div className={styles.price}>
                <p className={hotel?.is_free_cancellable?`${styles.green}`:`${styles.red}`}>{hotel?.is_free_cancellable?"Free cancellation":"Not free cancellation"}</p>
                <p className={styles.green}>Total Cost : {hotel?.min_total_price}<strong>$</strong> + {hotel?.price_breakdown?.['sum_excluded_raw']}$</p>
            </div>
            <div>
                <button className={styles.button}>See avaliablity </button>
            </div>
            
        </div>
    )
}

export default HotelDetails
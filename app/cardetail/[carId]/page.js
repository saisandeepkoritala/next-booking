"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './car.module.css';

const Page = ({ params }) => {
    console.log(params);
    console.log(params.carId);
    const Cars = useSelector((state) => state.user);
    
    const car = Cars.allCars?.search_results?.find((car, i) => Number(i) === Number(params.carId));

    console.log(car);
    console.log(car?.rating_info, "all");

    return (
        <div className={styles.car}>
            <div>
                <img src={car?.vehicle_info?.image_url} alt="image" className={styles.img} />
            </div>
            <div className={styles.info}>
                <h2 className={styles.h2}>Car Supplier Info</h2>
                <img src={car?.supplier_info?.logo_url} alt="logo" className={styles.smallimg} />
                <p className={styles.p}><strong className={styles.strong}>Name:</strong> {car?.supplier_info?.name}</p>
                <p className={styles.p}><strong className={styles.strong}>Address:</strong> {car?.supplier_info?.address}</p>
                <p className={styles.p}><strong className={styles.strong}>Credit card guarantee:</strong> {car?.supplier_info?.may_require_credit_card_guarantee ? "Required" : "Not Required"}</p>
            </div>
            <div>
                <h2 className={styles.h2}>Rating Info</h2>
                <p className={styles.p}><strong className={styles.strong}>Dropoff time:</strong> {car?.rating_info?.dropoff_time}</p>
                <p className={styles.p}><strong className={styles.strong}>Value for money:</strong> {car?.rating_info?.value_for_money}</p>
                <p className={styles.p}><strong className={styles.strong}>Average:</strong> {car?.rating_info?.average}</p>
                <p className={styles.p}><strong className={styles.strong}>Cleanliness:</strong> {car?.rating_info?.cleanliness}</p>
                <p className={styles.p}><strong className={styles.strong}>Average text:</strong> {car?.rating_info?.average_text}</p>
                <p className={styles.p}><strong className={styles.strong}>Pickup time:</strong> {car?.rating_info?.pickup_time}</p>
                <p className={styles.p}><strong className={styles.strong}>Location:</strong> {car?.rating_info?.location}</p>
                <p className={styles.p}><strong className={styles.strong}>No of ratings:</strong> {car?.rating_info?.no_of_ratings}</p>
                <p className={styles.p}><strong className={styles.strong}>Efficiency:</strong> {car?.rating_info?.efficiency}</p>
                <p className={styles.p}><strong className={styles.strong}>Condition:</strong> {car?.rating_info?.condition}</p>
            </div>
            <div>
                <h2 className={styles.h2}>Price</h2>
                <p className={styles.h3}>Cost: <span className={styles.span}>{car?.pricing_info?.price}$</span></p>
                <p className={styles.p}><strong className={styles.span}><span>Deposit Required</span></strong></p>
            </div>
        </div>
    );
}

export default Page;

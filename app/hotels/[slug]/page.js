"use client";
import {useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setSelectedHotelId } from '@/store/store';
import HotelDetails from '@/components/hoteldetails/HotelDetails';
import Pics from '@/components/pics/Pics';
import styles from './page.module.css';

const HotelPage = ({ params }) => {
    const dispatch = useDispatch();

    const[HotelData, setHotelData] = useState();
    
    useEffect(()=>{
        dispatch(setSelectedHotelId(params.slug))
    },[params.slug])

    const allHotels = useSelector((state) => state.user.allHotels);
    
    const hotel = allHotels.find((hotel) => Number(hotel.hotel_id) === Number(params.slug));

    console.log(hotel);

    const imgsrc = hotel?.main_photo_url?.replace("square60","1440x600");
    console.log(hotel?.checkin?.from)
    return (
        <div>
            <img src={imgsrc} alt="image"/>
            <HotelDetails hotel={hotel}/>
            <p className={styles.time}>Checkin : {hotel?.checkin?.from}</p>
            <p className={styles.time}>Checkout : {hotel?.checkout?.until}</p>
            <a className={styles.button} href={hotel?.url}>Visit Website</a>
            <h2 className={styles.title}>Property images</h2>
            <Pics id={params.slug}/>
        </div>
    );
};

export default HotelPage;

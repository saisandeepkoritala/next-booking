"use client";
import {useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setSelectedHotelId } from '@/store/store';
import HotelDetails from '@/components/hoteldetails/HotelDetails';

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

    return (
        <div>
            <img src={imgsrc} alt="image"/>
            <HotelDetails hotel={hotel}/>
        </div>
    );
};

export default HotelPage;

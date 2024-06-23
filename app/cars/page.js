"use client";
import Input from '@/components/input/Input';
import Datepicker from '@/components/datepicker/Datepicker';
import React, { useState,useEffect } from 'react';
import styles from './cars.module.css';
import Time from '@/components/time/Time';
import { getCars} from '@/lib/actions';
import {setAllCars} from '@/store/store';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const Cars = () => {
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const[cars, setCars] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getDefaultCars = async () => {
            setIsLoading(true);
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dayAfterTomorrow = new Date(tomorrow);
            dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

            const pickupDate = tomorrow.toISOString().split('T')[0]; 
            const dropoffDate = dayAfterTomorrow.toISOString().split('T')[0]; 
            const pickupTime = "14:00:00"; 
            const dropoffTime = "14:00:00"; 
            const pickupLocation = "Dallas"; 
            const dropoffLocation = "Austin"; 

            const cars = await getCars(pickupLocation, pickupDate, pickupTime, dropoffLocation, dropoffDate, dropoffTime);
            setCars(cars);
            dispatch(setAllCars(cars));
            setIsLoading(false);
        };

        getDefaultCars();
    }, []);


    const handleSubmit = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        const {pickupLocation, pickupDate, pickupTime, dropoffLocation, dropoffDate, dropoffTime} = Object.fromEntries(formData.entries());
        

        const cars = await getCars(pickupLocation, pickupDate, pickupTime, dropoffLocation, dropoffDate, dropoffTime);

        console.log(cars);
        setCars(cars);
        dispatch(setAllCars(cars));
        setIsLoading(false);
    
    }

    return (
        <>
        <form className={styles.cars} onSubmit={handleSubmit}>
            <div>
                <h2>Pick up</h2>
                <Input placeholder="Dallas" name="pickupLocation" />
                <Datepicker selectedDate={date1} onDateChange={setDate1} placeholder="pickupDate" name="pickupDate" />
                <Time name="pickupTime" />
            </div>
            <div>
                <h2>Drop off</h2>
                <Input placeholder="Austin" name="dropoffLocation" />
                <Datepicker selectedDate={date2} onDateChange={setDate2} placeholder="dropoffDate" name="dropoffDate" />
                <Time name="dropoffTime" />
            </div>
            <button className={styles.button} type="submit">Search</button>
        </form>
        {isLoading && <p className='text-center text-4xl'>Loading cars...</p>}
        <div className={styles.carContainer}>
        {cars?.search_results?.map((car,i)=>{
                return <Link key={i} className={styles.car} href={`/cardetail/${i}`}>
                    <img src={car?.vehicle_info?.image_url} alt="image"/>
                    <p className={styles.tag}>{car?.vehicle_info?.v_name}</p>
                </Link>
            })
        }
        </div>
            
        </>
        
    )
}

export default Cars;

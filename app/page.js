"use client";
import styles from "./page.module.css";
import Input from "@/components/input/Input";
import Datepicker from "@/components/datepicker/Datepicker";
import { useEffect, useState } from "react";
import { handleSubmit } from "@/lib/actions";
import HotelDetails from "@/components/hoteldetails/HotelDetails";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAllHotels } from "@/store/store";

const Home = () => {

    const dispatch = useDispatch();
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const defaultData=async()=>{
            const formData = new FormData();
            formData.append("search", "Dallas");
            formData.append("Check_in",Date.now() + 86400000);
            formData.append("Check_out",Date.now() + 86400000 * 2);
            const hotelsData = await handleSubmit(formData);
            setHotels(hotelsData?.Hotels?.result);
            dispatch(setAllHotels(hotelsData?.Hotels?.result));
            console.log(hotelsData.Hotels.result);
        }

        defaultData();
    },[])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setLoading(true);
        const hotelsData = await handleSubmit(formData);
        setLoading(false);

        setHotels(hotelsData?.Hotels?.result);
        dispatch(setAllHotels(hotelsData?.Hotels?.result));
        console.log(hotelsData.Hotels.result);
    };

    return (
        <>
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>The perfect home base</h1>
                <h1 className={styles.title}>for your special trip</h1>
                <h2>Discover dreamy vacation homes all over the world</h2>
                <button className={styles.button}>Find yours</button>
            </div>
            <form className={styles.inputs} onSubmit={handleFormSubmit}>
                <Input placeholder="Dallas" name="search"/>
                <Datepicker selectedDate={date1} onDateChange={setDate1} placeholder="Check_in"/>
                <Datepicker selectedDate={date2} onDateChange={setDate2} placeholder="Check_out"/>
                <button className={styles.button} type="submit">Search</button>
            </form>
        </div>
        <div className={styles.results}>
                {hotels?.map((hotel)=>{
                    const imgsrc = hotel.main_photo_url.replace("square60","square300");
                    return <Link key={hotel.hotel_id} className={styles.card} 
                    href={{
                        pathname: `/hotels/${hotel.hotel_id}`,
                        query: { checkin: date1, checkout: date2 }
                    }}
                    >
                        <div className={styles.overview}>
                        <img src={imgsrc} alt={hotel.hotel_name} className={styles.img}/>
                        </div>
                        <div className={styles.details}>
                            <HotelDetails hotel={hotel} />
                        </div>
                    </Link>
                })}
        </div>
        </>
    );
};

export default Home;

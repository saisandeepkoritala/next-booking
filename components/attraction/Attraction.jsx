"use client";
import React,{useState,useEffect} from 'react'
import {getCoordinates, getAttractions} from '@/lib/actions';

const Attraction = () => {
    const[loading,setLoading] = useState(false);
    const[Places,setPlaces] = useState([]);

    useEffect(()=>{
        const defaultData = async() => {
            setLoading(true);
            const coordinates = await getCoordinates('las vegas');
            const data = await getAttractions(coordinates.latitude,coordinates.longitude);
            setPlaces(data.data);
            setLoading(false);
        }

        defaultData();
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        
        const place = formData.get('attraction');

        const coordinates = await getCoordinates(place);

        const data = await getAttractions(coordinates.latitude, coordinates.longitude);
        setPlaces(data.data);
        setLoading(false);

    };  
    return {
        loading,
        Places,
        handleSubmit
        }
}

export default Attraction
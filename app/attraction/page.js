"use client";
import React, { useState,useEffect} from 'react';
import ClientForm from '@/components/attraction/Form';
import ServerPlaces from '@/components/attraction/Places';
import { getCoordinates, getAttractions } from '@/lib/actions';

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const defaultData = async () => {
            setLoading(true);
            const coordinates = await getCoordinates('las vegas');
            const data = await getAttractions(coordinates.latitude, coordinates.longitude);
            setPlaces(data.data);
            setLoading(false);
        };
        defaultData();
    }, []);

    useEffect(() => {
        if (loading === false) {
            const scrollPosition = window.innerHeight * 0.5;
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
    }, [loading]);

    return (
        <>
            <ClientForm setLoading={setLoading} setPlaces={setPlaces} />
            <ServerPlaces loading={loading} places={places} />
        </>
    );
};

export default Page;

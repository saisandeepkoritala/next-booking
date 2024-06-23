"use client";
import React,{useState,useEffect} from 'react';
import {getPics} from '@/lib/actions';
import styles from './pics.module.css';

const Pics = ({id}) => {
    const[pics,setPics] = useState([]);

    useEffect(()=>{
        const getPhotos =async()=>{
            const data = await getPics(id);
            setPics(data);
        }
        getPhotos();
        },[])  

        console.log(pics)
    return (
        <div className={styles.container}>
            {pics.map((pic,i)=>{
                return <div key={i}>
                    <img src={pic?.url_1440} alt="image" width={400} height={300} />
                    <p className={styles.tag}>{pic?.tags[0]?.tag}</p>
                </div>
            })}
        </div>
    )
}

export default Pics;
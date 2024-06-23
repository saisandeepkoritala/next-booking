import React from 'react';
import styles from '@/app/attraction/page.module.css';

const ServerPlaces = ({ loading, places }) => {
    return (
        <>
            {loading && <p className={styles.loading}>Loading places...</p>}
            <div className={styles.places}>
                {places?.length > 0 && places.map((place, i) => (
                    place.photo && <div key={i} className={styles.place}>
                        <img src={place?.photo?.images?.original?.url} width={400} alt="image" className={styles.img} />
                        <p className={styles.name}>{place.name}</p>
                        <p className={styles.address}>{place.address_obj.street1} {place.address_obj.street2} {place.address_obj.city}, {place.address_obj.state}, {place.address_obj.country}</p>
                        <p>{place.distance_string ? `${place.distance_string} from your location` : ""} </p>
                        <a href={place.website || place.web_url} className={styles.btn}>Visit Online</a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ServerPlaces;

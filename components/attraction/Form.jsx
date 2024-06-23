import Input from '@/components/input/Input.jsx';
import styles from '@/app/attraction/page.module.css';
import {getCoordinates, getAttractions} from '@/lib/actions';

const ClientForm = ({ setLoading, setPlaces }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const attraction = formData.get('attraction');
        
        const coordinates = await getCoordinates(attraction);
        const data = await getAttractions(coordinates.latitude,coordinates.longitude);
        
        setPlaces(data.data);
        setLoading(false);
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Places to visit</h2>
            <Input placeholder="las vegas" name="attraction" />
            <button type="submit" className={styles.button}>Search</button>
        </form>
    );
};

export default ClientForm;

import Input from '@/components/input/Input.jsx';
import styles from '@/app/attraction/page.module.css';

const ClientForm = ({ setLoading, setPlaces }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const attraction = formData.get('attraction');
        
        // Fetch places data (assuming there's an API endpoint for this)
        const response = await fetch(`/api/places?attraction=${attraction}`);
        const data = await response.json();
        
        setPlaces(data.places);
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

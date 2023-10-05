import styles from './Map.module.css'
import { useSearchParams } from 'react-router-dom';

const Map = () => {
    let [searchParams] = useSearchParams();

    return (
        <div className={styles.mapContainer}>
            <p>{searchParams.get("lat")}</p>
        </div>
    );
}

export default Map;

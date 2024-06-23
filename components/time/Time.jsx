import React from 'react';
import styles from './time.module.css';

const Time = ({name}) => {
    return (
        <input type="time" name={name} className={styles.formInput} step={1}/>
    );
}

export default Time;

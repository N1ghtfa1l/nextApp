import React, { FC, useEffect, useState } from 'react';
import styles from './SelectCity.module.css';
import { City } from '@/app/API/utils';

interface Props {
    onChange?: (item: string) => void;
    description?: string,
    error: boolean
}

const SelectCity: FC<Props> = ({ onChange, description, error }) => {
    const [allCity, setAllCity] = useState<City[]>([]);

    useEffect(() => {
        fetchCity();
    }, []);

    const fetchCity = async () => {
        try {
            const response = await fetch('/API/city');
            const data = await response.json();
            setAllCity(data);
        } catch (e) {
            console.log(e);
        }
    };

    const filteredAndSortedCities = allCity
        .filter((city: City) => parseInt(city.population) > 50000)
        .sort((a, b) => {
            if (parseInt(a.population) !== parseInt(b.population)) {
                return parseInt(b.population) - parseInt(a.population);
            }
            return a.city.localeCompare(b.city);
        });

    useEffect(() => {
        if (filteredAndSortedCities.length > 0) {
            onChange && onChange('');
        }
    }, []);

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onChange && onChange(value);
    };

    return (
        <div className={styles.box}>
            <select
                className={error ? styles.selectError : styles.select}
                onChange={handleCityChange}
            >
                <option value=''>Выберите город</option>
                {filteredAndSortedCities.map((el: City) => (
                    <option key={el.city} value={el.city}>
                        {el.city}
                    </option>
                ))}
            </select>
            {error && description && <div className={styles.error}>{description}</div>}
        </div>


    );
};

export default SelectCity;

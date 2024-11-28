import React, { FC, useState } from "react";
import {Select, Input, Checkbox, Button, SelectItem} from "@nextui-org/react";
import styles from "./filterMenu.module.css";

const FilterMenu: FC = () => {
    const [city, setCity] = useState<string>();
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
    const [hasBilliards, setHasBilliards] = useState<boolean>(false);
    const [poolLength, setPoolLength] = useState<number>(0);
    const [poolWidth, setPoolWidth] = useState<number>(0);


    return (
        <div className={styles.filterMenu}>
            <h3>Фильтры и Сортировка</h3>
            <div className={styles.filterItem}>
                <Select
                    label="Город"
                    placeholder="Выберите город"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                    <SelectItem key="minsk">Минск</SelectItem>
                    <SelectItem key="borisov">Борисов</SelectItem>
                    <SelectItem key="brest">Брест</SelectItem>
                    <SelectItem key="grodno">Гродно</SelectItem>
                    <SelectItem key="gomel">Гомель</SelectItem>
                    <SelectItem key="mogilev">Могилев</SelectItem>
                </Select>
            </div>

            <div className={styles.filterItem}>
                <Input
                    min={0}
                    max={300}
                    type="number"
                    label="Минимальная цена"
                    placeholder="Введите минимальную цену"
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                />
                <Input
                    min={0}
                    max={300}
                    type="number"
                    label="Максимальная цена"
                    placeholder="Введите максимальную цену"
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                />
            </div>

            <div className={styles.filterItem}>
                <Checkbox
                    isSelected={hasBilliards}
                    onChange={() => setHasBilliards(!hasBilliards)}
                >
                    Наличие бильярда
                </Checkbox>
            </div>

            <div className={styles.filterItem}>
                <Input
                    type="number"
                    label="Длина бассейна (м)"
                    placeholder="Введите длину"
                    onChange={(e) => setPoolLength(+e.target.value)}
                />
                <Input
                    type="number"
                    label="Ширина бассейна (м)"
                    placeholder="Введите ширину"
                    onChange={(e) => setPoolWidth(+e.target.value)}
                />
            </div>
        </div>
    );
};

export default FilterMenu;

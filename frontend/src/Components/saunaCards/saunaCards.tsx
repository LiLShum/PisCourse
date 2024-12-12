import React, { FC, useContext, useEffect, useState } from "react";
import SaunaCard from './saunaCard/saunaCard';
import { Context } from "../../index";
import { SaunaDto } from "../../models/sauna/add-sauna.dto";
import styles from "../bathhouse-mane/bathhouse.module.css";
import { Checkbox, Input, Pagination, Select, SelectItem } from "@nextui-org/react";
import {Button} from "@nextui-org/button";

const SaunaCards: FC = () => {
    const [saunas, setSaunas] = useState<SaunaDto[]>([]);
    const [filteredSaunas, setFilteredSaunas] = useState<SaunaDto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [city, setCity] = useState<string>();
    const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
    const [poolLength, setPoolLength] = useState<number>();
    const [poolWidth, setPoolWidth] = useState<number>();
    const [hasBilliards, setHasBilliards] = useState<boolean>(false);
    const itemsPerPage = 4;
    const [orderType, setOrderType] = useState<string>('asc');
    const { store } = useContext(Context);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const resetFilters = () => {
        setCity('');
        setPriceRange([0, 300]);
        setPoolLength(undefined);
        setPoolWidth(undefined);
        setHasBilliards(false);
        setOrderType('asc');
    };


    useEffect(() => {
        store.fetchSaunas()
            .then((response) => {
                setSaunas(response.data);
                console.log(response.data);
            })
            .catch(() => alert("error"));
    }, []);

    useEffect(() => {
        const filtered = saunas.filter((sauna) => {
            const matchesCity = city ? sauna.address.city.trim().toLowerCase() === city.trim().toLowerCase() : true;
            const matchesPrice = sauna.price >= priceRange[0] && sauna.price <= priceRange[1];

            const matchesPool =
                (!poolLength && !poolWidth) ||
                (sauna.swimmingPools && sauna.swimmingPools.length > 0 &&
                    sauna.swimmingPools.some(pool =>
                        (poolLength ? pool.length >= poolLength : true) &&
                        (poolWidth ? pool.width >= poolWidth : true)
                    )
                );

            const matchesBilliards = hasBilliards ? sauna.billiard as number > 0 : true;

            return matchesCity && matchesPrice && matchesPool && matchesBilliards;
        });

        const sorted = [...filtered].sort((a, b) => {
            if (orderType === 'asc') return a.price - b.price;
            if (orderType === 'desc') return b.price - a.price;
            return 0;
        });

        setFilteredSaunas(sorted);
        setCurrentPage(1);
    }, [saunas, city, priceRange, poolLength, poolWidth, hasBilliards, orderType]);


    const currentSaunas = filteredSaunas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <div style={{ display: "flex", gap: '5%' }}>
                <div>
                    <div className={styles.filters}>
                        <div className={styles.filterMenu}>
                            <h1 style={{textAlign: "center"}}>Фильтры</h1>
                            <div className={styles.filterItem}>
                                <Select
                                    label="Город"
                                    placeholder="Выберите город"
                                    value={city}
                                    onChange={(value) => setCity(value.target.value)}
                                >
                                    <SelectItem key="">Все</SelectItem>
                                    <SelectItem key="Минск">Минск</SelectItem>
                                    <SelectItem key="Борисов">Борисов</SelectItem>
                                    <SelectItem key="Брест">Брест</SelectItem>
                                    <SelectItem key="Гродно">Гродно</SelectItem>
                                    <SelectItem key="Гомель">Гомель</SelectItem>
                                    <SelectItem key="Могилев">Могилев</SelectItem>
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
                            </div>
                            <div className={styles.filterItem}>
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
                            </div>
                            <div className={styles.filterItem}>
                                <Input
                                    type="number"
                                    label="Ширина бассейна (м)"
                                    placeholder="Введите ширину"
                                    onChange={(e) => setPoolWidth(+e.target.value)}
                                />
                            </div>
                            <div>
                                <Select
                                    label="Сортировать"
                                    placeholder="Выберите тип"
                                    value={city}
                                    onChange={(value) => setOrderType(value.target.value)}
                                >
                                    <SelectItem key="">Все</SelectItem>
                                    <SelectItem key="asc">Возрастание цены</SelectItem>
                                    <SelectItem key="desc">Убывание цены</SelectItem>
                                </Select>
                                <Button
                                    className={styles.resetButton}
                                    onClick={() => {
                                        resetFilters();
                                    }}
                                >
                                    Сбросить
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", flexWrap: 'wrap', gap: '10%' }}>
                    {currentSaunas.length > 0 ? (
                        currentSaunas.map((sauna) => (
                            <SaunaCard
                                key={sauna.saunaId}
                                saunaId={sauna.saunaId}
                                name={sauna.name}
                                price={sauna.price}
                                description={sauna.description}
                                address={sauna.address}
                                images={sauna.images}
                            />
                        ))
                    ) : (
                        <p>No saunas available</p>
                    )}
                </div>
            </div>
            <div className={styles.paginationBlock}>
                <Pagination
                    showControls
                    disableCursorAnimation
                    total={Math.ceil(filteredSaunas.length / itemsPerPage)}
                    initialPage={1}
                    onChange={handlePageChange}
                    page={currentPage}
                />
            </div>
        </>
    );
};

export default SaunaCards;

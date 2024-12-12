import { FC, useContext, useEffect, useState } from "react";
import styles from "./SaunaDescription.module.css";
import Header from "../header/Header";
import { Context } from "../../index";
import { AddressDto, SaunaDto } from "../../models/sauna/add-sauna.dto";
import { useParams } from "react-router-dom";
import Booking from "./booking/Booking";
import Comments from "./comments/comments";
import * as maptilersdk from '@maptiler/sdk';
import MyMap from "../bathhouse-mane/map/Map";

const SaunaDescription: FC = () => {
    const { saunaId } = useParams<{ saunaId: string }>();
    const [sauna, setSauna] = useState<SaunaDto>({} as SaunaDto);
    const [address, setAddress] = useState<AddressDto>({} as AddressDto);
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
        store.getSauna(saunaId as string)
            .then((response) => {
                setSauna(response.data);
                setAddress(response.data.address);
            });
    }, [saunaId, store]);

    return (
        <>
            <Header isAuth={store.isAuth} />
            <div className={styles.wrapper}>
                <div className={styles.backgroundImage}></div>
                <div className={styles.saunaBlock}>
                    <div className={styles.saunaInfoBlock}>
                        <div className={styles.saunaHeaderInfo}>
                            <h1>{sauna.name}</h1>
                        </div>
                        <div className={styles.priceBlock}>
                            <p>{sauna.price} BYN/Час</p>
                        </div>
                    </div>
                    <div className={styles.innerWrapper}>
                        <div id="carouselExample" className="carousel slide">
                            <div className="carousel-inner">
                                {sauna.images && Array.isArray(sauna.images) && sauna.images.length > 0 ? (
                                    sauna.images.map((image, index) => (
                                        <div
                                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                            key={index}
                                        >
                                            <img
                                                src={`/${image.url}`}
                                                className={styles.saunaImage}
                                                alt="..."
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExample"
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon bg-black"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExample"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon bg-black"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div>
                            <Booking />
                        </div>
                    </div>
                    <div className={styles.descriptionBlock}>
                        <div className={styles.secondaryInfo}>
                            <p className={styles.description}>{sauna.description}</p>
                            <hr className={styles.divider} />
                            <p>
                                <strong>Количество бильярдов:</strong> {sauna.billiard}
                            </p>
                            <hr className={styles.divider} />
                            <p>
                                <strong>Адрес:</strong> {address.region}, {address.city}, {address.street} д.{" "}
                                {address.houseNumber}
                            </p>
                        </div>
                        {sauna.swimmingPools && (
                            <div className={styles.swimmingPoolBlock}>
                                <h3 className={styles.sectionTitle}>Бассейны:</h3>
                                <div className={styles.swimmingPoolGrid}>
                                    {sauna.swimmingPools.map((value, index) => (
                                        <div className={styles.swimmingPoolCard} key={index}>
                                            <p>
                                                Длина: <strong>{value.length} м</strong>
                                            </p>
                                            <p>
                                                Ширина: <strong>{value.width} м</strong>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={{margin: "80px"}}>
                        <MyMap address={`${address.city}  ${address.street} ${address.houseNumber}`}/>
                    </div>
                    <Comments />
                </div>
            </div>
        </>
    );
};
export default SaunaDescription;



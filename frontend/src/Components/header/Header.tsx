import styles from './Header.module.css';
import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { SaunaDto } from "../../models/sauna/add-sauna.dto";
import {useNavigate} from "react-router-dom"; // Подключите модель сауны, если она в другом месте

const handleScroll = () => {

    const header = document.getElementById(styles.header);
    const links = document.getElementsByClassName(styles.links);
    if (header != null) {
        if (window.scrollY > 500) {
            header.style.backgroundColor = "white";
            for (let i = 0; i < links.length; i++) {
                const link = links.item(i) as HTMLElement;
                if (link) {
                    link.style.color = "black";
                }
            }
        } else {
            header.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
            for (let i = 0; i < links.length; i++) {
                const link = links.item(i) as HTMLElement;
                if (link) {
                    link.style.color = "white";
                }
            }
        }
    }
};

interface HeaderProps {
    isAuth: boolean;
}

const Header: FC<HeaderProps> = ({ isAuth }) => {

    const navigate = useNavigate();


    const { store } = useContext(Context);
    const [searchText, setSearchText] = useState<string>(""); // Состояние для текста поиска
    const [filteredSaunas, setFilteredSaunas] = useState<SaunaDto[]>([]); // Фильтрованные сауны

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (searchText.trim() === "") {
            setFilteredSaunas([]);
            return;
        }

        store.fetchSaunas()
            .then((response) => {
                console.log(response);
                const saunas: SaunaDto[] = response.data;
                const filtered = saunas.filter(sauna =>
                    sauna.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredSaunas(filtered);
            })
            .catch(() => alert("Ошибка при загрузке саун"));
    }, [searchText]);

    return (
        <header id={styles.header}>
            <div className="logoWrapper">
                <div className={styles.logo}></div>
            </div>
            <div className={styles.headerWrapper}>
                <a className={styles.links} onClick={() => navigate('/')}>ВЫБРАТЬ БАНЮ</a>
                <a className={styles.links} onClick={() => {
                    if(store.isAuth) {
                        navigate('/bookings')
                    }
                    else {
                        navigate('/auth')
                    }
                }}>Мои заказы</a>
                <a className={styles.links}>БАННОЕ МЕНЮ</a>
                <a className={styles.links}>ОТЗЫВЫ</a>
                <a className={styles.links}>КОНТАКТЫ</a>
                {!isAuth && (
                    <a className={styles.links} onClick={() => navigate('/auth')} >
                        Войти
                    </a>
                )}
                {isAuth && (
                    <>
                        <a className={styles.links} onClick={() => navigate('/profile')}>
                            Профиль
                        </a>
                        <a
                            className={styles.links}
                            href="/auth"
                            onClick={(e) => {
                                e.preventDefault();
                                store
                                    .logout()
                                    .then(() => navigate('/'))
                                    .catch(() => alert("Ошибка при выходе"));
                            }}
                        >
                            Выход
                        </a>
                    </>
                )}
            </div>
            <div className="searchWrapper">
                <input
                    type="search"
                    placeholder="Найти..."
                    className={styles.searchInput}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                {filteredSaunas.length > 0 && (
                    <div className={styles.searchResults}>
                        {filteredSaunas.map((sauna) => (
                            <div key={sauna.saunaId} className={styles.searchResultItem}>
                                <img src={sauna.images[0].url} style={{width: '5%', height: '5%'}}/>
                                <a href={`/viewSauna/${sauna.saunaId}`} className={styles.resultLink}>
                                    {sauna.name}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

export default observer(Header);

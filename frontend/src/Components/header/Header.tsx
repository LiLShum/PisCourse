import styles from './Header.module.css';
import { FC, useContext, useEffect } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const handleScroll = () => {
    const header = document.getElementById(styles.header);
    const links = document.getElementsByClassName(styles.links);
    if (header != null ) {
        if (window.scrollY > 500) {
            header.style.backgroundColor = "white";
            for (let i = 0; i < links.length; i++) {
                const link = links.item(i) as HTMLElement;
                if(link) {
                    link.style.color = "black";
                }
            }
        } else {
            header.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
            for (let i = 0; i < links.length; i++) {
                const link = links.item(i) as HTMLElement;
                if(link) {
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
    const { store } = useContext(Context);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header id={styles.header}>
            <div className="logoWrapper">
                <div className={styles.logo}></div>
            </div>
            <div className={styles.headerWrapper}>
                <a className={styles.links} href='/'>ВЫБРАТЬ БАНЮ</a>
                <a className={styles.links}>УСЛУГИ</a>
                <a className={styles.links}>БАННОЕ МЕНЮ</a>
                <a className={styles.links}>ОТЗЫВЫ</a>
                <a className={styles.links}>КОНТАКТЫ</a>
                {!isAuth && (
                    <a className={styles.links} href="/auth">
                        Войти
                    </a>
                )}
                {isAuth && (
                    <>
                        <a className={styles.links} href="/profile">
                            Профиль
                        </a>
                        <a
                            className={styles.links}
                            href="/auth"
                            onClick={(e) => {
                                e.preventDefault();
                                store
                                    .logout()
                                    .then(() => window.location.replace("/"))
                                    .catch(() => alert("Ошибка при выходе"));
                            }}
                        >
                            Выход
                        </a>
                    </>
                )}
            </div>
            <div className="searchWrapper">
                <input type="search" placeholder="Найти..." className={styles.searchInput} />
            </div>
        </header>
    );
};

export default observer(Header);

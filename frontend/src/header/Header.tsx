import styles from './'
import {useEffect} from "react";
const handleScroll = () => {
    const header = document.getElementById('Header');
    if (header != null) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "rgba(255, 255, 255, 1)";
        } else {
            header.style.backgroundColor = "rgba(0, 0, 0, 10%)";
        }
    }
};


export default function Header() {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <header id={styles.header}>
            <div className={'logoWrapper'}>
                <div className={'logo'}></div>
            </div>
            <div className={'headerWrapper'}>
                <a>ВЫБРАТЬ БАНЮ</a>
                <a>УСЛУГИ</a>
                <a>БАННОЕ МЕНЮ</a>
                <a>ОТЗЫВЫ</a>
                <a>КОНТАКТЫ</a>
                <a href='/auth'>АВТОРИЗИРОВАТЬСЯ</a>
            </div>
            <div className={'searchWrapper'}>
                <input type={'search'} placeholder={'Найти...'}  className={'searchInput'}/>
            </div>
        </header>
    )
}
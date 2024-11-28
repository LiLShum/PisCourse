import styles from './bathhouse.module.css';
import SaunaCards from "../saunaCards/saunaCards";
import FilterMenu from "../filters/Filters";
import {useState} from "react";

const mainbathesParams = [
    { mainText: "Бани и  сауны в Минске", secodaryText: 'Финские, русские, хамам парилки!', image: 'back2.jpg' },
    { mainText: "Услуши бань в Минске", secodaryText: 'Финские, русские, хамам парилки!', image: "back1.jpg" },
    { mainText: "Владимир Владиславович лучший", secodaryText: 'Финские, русские, хамама парилки!', image: "https://sunway.freevision.me/wp-content/uploads/2018/09/shutterstock_1127650703-min.jpg" }
];

export default function BathhouseMain() {
    const [filters, setFilters] = useState<any>({});
    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainBlock}>
                <div className={styles.slider} id={styles.slider1}
                     style={{zIndex: 3, backgroundImage: 'url(./back2.jpg)'}}>
                    <h1 id={styles.mainText}>{mainbathesParams[0].mainText}</h1>
                    <p id={styles.secondaryText}>{mainbathesParams[0].secodaryText}</p>
                </div>
                <div className={styles.slider} id={styles.slider2}
                     style={{zIndex: 2, backgroundImage: 'url(./back1.jpg)'}}>
                    <h1
                        id={styles.mainText}>{mainbathesParams[1].mainText}</h1>
                    <p id={styles.secondaryText}>{mainbathesParams[1].secodaryText}</p></div>
                <div className={styles.slider} id={styles.slider3}
                     style={{zIndex: 1, backgroundImage: 'url(./back3.jpg)'}}>
                    <h1 id={styles.mainText}>{mainbathesParams[2].mainText}</h1>
                    <p id={styles.secondaryText}>{mainbathesParams[2].secodaryText}</p>
                </div>
            </div>
            <div className={styles.cards}>
                <div className={styles.filters}>
                    <FilterMenu/>
                </div>
                <SaunaCards/>
            </div>
        </div>
    );
}

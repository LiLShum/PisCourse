import './bathhouse.css';

const mainbathesParams = [
    { mainText: "Славянский зажим яйцами", secodaryText: 'Мы зажмем вам яйца!', image: 'back2.jpg' },
    { mainText: "Славянский прострел сундука", secodaryText: 'Мы зажмем вам яйца!', image: "back1.jpg" },
    { mainText: "Славянский прихлоп хуем", secodaryText: 'Мы зажмем вам яйца!', image: "https://sunway.freevision.me/wp-content/uploads/2018/09/shutterstock_1127650703-min.jpg" }
];

export default function BathhouseMain() {
    return (
        <div className={'wrapper'}>
            <div className={'slider'} id={'slider1'} style={{zIndex: 3, backgroundImage: 'url(./back2.jpg)'}}>
                <h1 id="mainText">{mainbathesParams[0].mainText}</h1>
                <p id="secondaryText">{mainbathesParams[0].secodaryText}</p>
            </div>
            <div className={'slider'} id={'slider2'} style={{zIndex: 2, backgroundImage: 'url(./back1.jpg)'}}><h1
                id="mainText">{mainbathesParams[1].mainText}</h1>
                <p id="secondaryText">{mainbathesParams[1].secodaryText}</p></div>
            <div className={'slider'} id={'slider3'} style={{zIndex: 1, backgroundImage: 'url(./back3.jpg)'}}>
                <h1 id="mainText">{mainbathesParams[2].mainText}</h1>
                <p id="secondaryText">{mainbathesParams[2].secodaryText}</p>
            </div>
        </div>
    );
}

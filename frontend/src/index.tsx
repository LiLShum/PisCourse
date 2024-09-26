import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from "./header/Header";
import BathhouseMain from "./bathhouse-mane/bathhouse";
import ICardItemPropsInterface from "./item-card/cardItemPropsInterface";
const bathhouses: ICardItemPropsInterface[] = [
    { name: "Bathhouse 1", adress: "Address 1", price: "1000", imagePath: "https://par24.ru/upload/iblock/58e/0vf1akjb9vv6xgao6u6y4n37dfhnze8e.jpg" },
    { name: "Bathhouse 2", adress: "Address 2", price: "1500", imagePath: "https://par24.ru/upload/iblock/643/241pkm6nzbq1r28t1249kjn3l59yk978.jpg" },
    { name: "Bathhouse 3", adress: "Address 3", price: "2000", imagePath: "https://par24.ru/upload/iblock/014/pzmsvavouga3qttanvwvwikpkbnz65w3.jpg" },
    { name: "Bathhouse ", adress: "Address 3", price: "2000", imagePath: "https://par24.ru/upload/iblock/014/pzmsvavouga3qttanvwvwikpkbnz65w3.jpg" },
    { name: "Bathhouse ", adress: "Address 3", price: "2000", imagePath: "https://par24.ru/upload/iblock/014/pzmsvavouga3qttanvwvwikpkbnz65w3.jpg" },
];


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header/>
    <BathhouseMain/>
  </React.StrictMode>
);
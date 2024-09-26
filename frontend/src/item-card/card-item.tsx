import ICardItemPropsInterface from "./cardItemPropsInterface";
import './card-item.css';
export default function cardItem(props: ICardItemPropsInterface) {
   return (
       <div className={'cardItem'}>
           <img className={'cardImage'} src={props.imagePath} alt={'card image'}/>
           <p className={'card-name'}>{props.name}</p>
           <p className={'card-adress'}>{props.adress}</p>
           <p className={'card-price'}>{props.price}</p>
       </div>
   )
}

import {FC, useContext} from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import SaunaCardProps, {saunaInfoProps} from "./props/SaunaCard.props";
import {SaunaDto} from "../../../models/sauna/add-sauna.dto";
import SaunaDescription from "../../sauna-description/SaunaDescription";
import saunaCards from "../saunaCards";
import {Context} from "../../../index";
import styles from './saunaCard.module.css'
import {useNavigate} from "react-router-dom";
 const SaunaCard : FC<SaunaDto> = (
     {saunaId, name, price, address, images} : SaunaDto
 ) => {
     const { store } = useContext(Context);
     const navigator = useNavigate();

    return (
        <div className={styles.card}>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 flex-col items-start" style={{background: 'rgba(0,0,0, 0.3)'}}>
                    <h4 className="text-white/90 font-medium text-xl" style={{color: "white"}}>{name}</h4>
                </CardHeader>
                <img src={images[0].url}/>
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">от {price} BYN</p>
                            <p className="text-tiny text-white/60">г. {address.city}, ул. {address.street}, д. {address.houseNumber}.</p>
                        </div>
                    </div>
                    <Button radius="full" size="sm"
                            onClick={() => {
                                store.setSaunaId(saunaId);
                                navigator(`/viewSauna/${store.saunaId}`)
                            }}
                    >Подробнее
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default SaunaCard;
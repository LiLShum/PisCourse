import {FC, useContext, useEffect, useState} from "react";
import SaunaCard from './saunaCard/saunaCard'
import {Context} from "../../index";
import {SaunaDto} from "../../models/sauna/add-sauna.dto";


const SaunaCards : FC =  () => {
    const [saunas, setSaunas] = useState<SaunaDto[]>([]);

    const { store } = useContext(Context);

    useEffect(() => {
        store.fetchSaunas()
            .then((response) => {
                setSaunas(response.data)
            })
            .catch(() => alert("error"));
    }, []);


    return (
        <div style={{display: "flex"}}>
            {saunas.length > 0 ? (
                saunas.map((sauna) => (
                    <SaunaCard
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
    )
}

export default SaunaCards;
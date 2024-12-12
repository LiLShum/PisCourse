import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import {Context} from "./index";
import Header from "./Components/header/Header";
import Profile from "./Components/profile/profile";
import {Spinner} from "@nextui-org/react";
import {SaunaDto} from "./models/sauna/add-sauna.dto";
import {UserBookingsDto} from "./models/dto/booking.dto";

const ProfileBlock: React.FC = observer(() => {
    const { store } = useContext(Context);
    const [saunas, setSaunas] = useState<SaunaDto[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [bookingsState, setBookings] = useState<UserBookingsDto[]>([]);

    useEffect(() => {
        store.checkAuth()
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
        store.fetchUserSaunas(store.user.login)
            .then((sauna) => {
                console.log(sauna.data);
                if(Array.isArray(sauna.data)) {
                    setSaunas(sauna.data);
                }
            })
            .catch(() => {
                alert('User with such id has no saunas');
            })
        store.getUserByLogin(store.user.login)
            .then((user) => {
                store.getUserBookings(user.data.userId)
                    .then((bookings) => {
                        setBookings(bookings.data);
                    })
            })
    }, [store]);

    if (!store.isAuth) {
        return <h1>Пользователь не авторизован</h1>;
    }

    return (
        <>
            <Header isAuth={store.isAuth} />
            <Profile />
        </>
    );
});

export default ProfileBlock;

import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import {Context} from "./index";
import Header from "./Components/header/Header";
import Profile from "./Components/profile/profile";
import {Spinner} from "@nextui-org/react";

const ProfileBlock: React.FC = observer(() => {
    const { store } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true); // для отображения загрузки

    useEffect(() => {
        store.checkAuth()
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
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

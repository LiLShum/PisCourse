import Header from "./Components/header/Header";
import BathhouseMain from "./Components/bathhouse-mane/bathhouse";
import React, {FC, useContext, useEffect} from "react";
import {Context} from "./index";
import {observable} from "mobx";
import {observer} from "mobx-react-lite";


const App : FC = () => {

    const {store} = useContext(Context);
    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    return(
        <>
            <Header isAuth={store.isAuth}/>
            <BathhouseMain/>
        </>
    )
}

export default observer(App);
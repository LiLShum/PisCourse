import Header from "./Components/header/Header";
import Auth from "./Components/auth/auth-register";
import {observer} from "mobx-react-lite";
import {FC, useContext, useEffect} from "react";
import {Context} from "./index";

const AuthBlock : FC = () => {
    const {store} = useContext(Context);
    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    console.log(store.isAuth);
    return (
        <>
            <Header isAuth={store.isAuth}/>
            <Auth/>
        </>
    )
}

export default observer(AuthBlock)
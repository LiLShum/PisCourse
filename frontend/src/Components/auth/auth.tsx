import styles from "./auth.module.css"
import {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
const Auth : FC = () =>  {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    return (
            <div className={styles.wrapper}>
                <div className={styles.authForm}>
                    <label>Введите логин:</label>
                    <input className={styles.inputs} type="text" id='loginInput'
                           onChange={e => setLogin(e.target.value)}
                           value={login}/>
                    <label>Введите пароль:</label>
                    <input className={styles.inputs} type="password" id='passwordInput'
                           onChange={e => setPassword(e.target.value)}
                           value={password}/>
                    <div className={styles.buttonsWrapper}>
                        <button className={styles.buttons}
                                onClick={() => store.login(login, password)}>Войти</button>
                        <button className={styles.buttons}><a href='/register'>Регистрация</a></button>
                    </div>
                    <div className={styles.errorWrapper}>
                        <span id='errorMessage'></span>
                    </div>
                </div>
            </div>
    )
}

export default observer(Auth);
import styles from "./auth.module.css"
import {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
const Auth : FC = () =>  {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);
    const navigate = useNavigate();
    return (
            <div className={styles.wrapper}>
                <div className={styles.authForm}>
                    <label>Введите логин:</label>
                    <input className={styles.inputs} type="text" id='loginInput'
                           onChange={e => setLogin(e.target.value)}
                           value={login}
                           required
                    />
                    <label>Введите пароль:</label>
                    <input className={styles.inputs} type="password" id='passwordInput'
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                           required
                    />
                    <div className={styles.buttonsWrapper}>
                        <button className={styles.buttons}
                                onClick={() => {
                                    store.login(login, password)
                                        . then(
                                            () => {
                                                navigate('/');
                                            }
                                        )
                                }}>Войти</button>
                        <button className={styles.buttons}><a onClick={() => navigate('/register')}>Регистрация</a></button>
                    </div>
                    <div className={styles.errorWrapper}>
                        <span id='errorMessage'></span>
                    </div>
                </div>
            </div>
    )
}

export default observer(Auth);
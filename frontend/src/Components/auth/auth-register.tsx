import {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import styles from './auth-register.module.css'
import {IUser} from "../../models/User";
const Auth : FC = () =>  {
    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    const register = () => {
        const user : IUser = {
            name: name,
            secondName: secondName,
            lastName: lastName,
            phone: phone,
            login: login,
            password: password,
            role: 'user'
        }
        store.register(user);
        //window.location.replace('/');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.authForm}>
                <label>Введите имя:</label>
                <input className={styles.inputs} type="text" id='nameInput'
                       onChange={e => setName(e.target.value)}
                       value={name}/>
                <label>Введите фамилию:</label>
                <input className={styles.inputs} type="text" id='secondNameInput'
                       onChange={e => setSecondName(e.target.value)}
                       value={secondName}/>
                <label>Введите отчество:</label>
                <input className={styles.inputs} type="text" id='lastNameInput'
                       onChange={e => setLastName(e.target.value)}
                       value={lastName}/>
                <label>Введите номер телефона:</label>
                <input className={styles.inputs} type="text" id='phoneInput'
                       onChange={e => setPhone(e.target.value)}
                       value={phone}/>
                <label>Введите логин:</label>
                <input className={styles.inputs} type="text" id='loginInput'
                       onChange={e => setLogin(e.target.value)}
                       value={login}/>
                <label>Введите пароль:</label>
                <input className={styles.inputs} type="password" id='passwordInput'
                       onChange={e => setPassword(e.target.value)}
                       value={password}/>
                <div className={styles.buttonsWrapper}>
                    <button className={styles.buttons}><a href='/auth'>Войти</a></button>
                    <button className={styles.buttons} onClick={register}>Регистрация</button>
                </div>
                <div className={styles.errorWrapper}>
                    <span id='errorMessage'></span>
                </div>
            </div>
        </div>
    )
}

export default observer(Auth);
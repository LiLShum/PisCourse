import {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import styles from './auth-register.module.css';
import {IUser} from "../../models/User";
import {useNavigate} from "react-router-dom";

const Auth: FC = () => {
    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = 'Имя не может быть пустым';
        if (!secondName.trim()) newErrors.secondName = 'Фамилия не может быть пустой';
        if (!lastName.trim()) newErrors.lastName = 'Отчество не может быть пустым';
        if (!/^[0-9+\-()\s]{10,15}$/.test(phone)) newErrors.phone = 'Некорректный номер телефона';
        if (!login.trim()) newErrors.login = 'Логин не может быть пустым';
        if (password.length < 6) newErrors.password = 'Пароль должен содержать не менее 6 символов';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const register = () => {
        if (!validate()) return;

        const user: IUser = {
            name: name,
            secondName: secondName,
            lastName: lastName,
            phone: phone,
            login: login,
            password: password,
            role: 'user'
        };

        store.register(user)
            .then(() => navigate('/'));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.authForm}>
                <label>Введите имя:</label>
                <input
                    className={styles.inputs}
                    type="text"
                    id='nameInput'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    required
                />
                {errors.name && <div className={styles.error}>{errors.name}</div>}

                <label>Введите фамилию:</label>
                <input
                    className={styles.inputs}
                    type="text"
                    id='secondNameInput'
                    onChange={e => setSecondName(e.target.value)}
                    value={secondName}
                    required
                />
                {errors.secondName && <div className={styles.error}>{errors.secondName}</div>}

                <label>Введите отчество:</label>
                <input
                    className={styles.inputs}
                    type="text"
                    id='lastNameInput'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    required
                />
                {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}

                <label>Введите номер телефона:</label>
                <input
                    className={styles.inputs}
                    type="text"
                    id='phoneInput'
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    required
                />
                {errors.phone && <div className={styles.error}>{errors.phone}</div>}

                <label>Введите логин:</label>
                <input
                    className={styles.inputs}
                    type="text"
                    id='loginInput'
                    onChange={e => setLogin(e.target.value)}
                    value={login}
                    required
                />
                {errors.login && <div className={styles.error}>{errors.login}</div>}

                <label>Введите пароль:</label>
                <input
                    className={styles.inputs}
                    type="password"
                    id='passwordInput'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                />
                {errors.password && <div className={styles.error}>{errors.password}</div>}

                <div className={styles.buttonsWrapper}>
                    <button className={styles.buttons}>
                        <a onClick={() => navigate('/auth')}>Войти</a>
                    </button>
                    <button className={styles.buttons} onClick={register}>Регистрация</button>
                </div>
            </div>
        </div>
    );
};

export default observer(Auth);

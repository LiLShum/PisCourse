import React, {FC, useContext, useEffect, useState} from "react";
import {Select, SelectItem, useDisclosure, Input} from "@nextui-org/react";
import styles from "./profile.module.css"
import {Context} from "../../index";
import {Button, ButtonGroup} from "@nextui-org/button";
import {isArray, log} from "node:util";
import EditUserDto from "../../models/dto/edit-user.dto";
import {user} from "@nextui-org/react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {IUser} from "../../models/User";
import {AxiosResponse} from "axios";
import GrantUserModel from "../../models/GrantUserModel";
import GrantUserDto from "../../models/dto/grant-user.dto";
import CreateSaunaPanel from "./createSaunapanel/createSaunaPanel";
import {SaunaDto} from "../../models/sauna/add-sauna.dto";
import SaunaCard from "../saunaCards/saunaCard/saunaCard";
import * as util from "util";
import UserSaunaCard from "./userSaunasCard/userSaunaCard";
import Sauna from "../../../../backend/course/src/entities/sauna.entity";
import BookingDto from "../../models/dto/booking.dto";
import ViewBookings from "./bookings/ViewBookings";
import {UserBookingsDto} from "../../models/dto/booking.dto";
const Profile : FC = () => {
    const [loginState, setLoginState] = useState<string>('');
    const [searchedUser, setSearchedUser] = useState<GrantUserModel>({} as GrantUserModel);
    const [createSaunaPanel, setCreateSaunaPanel] = useState<boolean>(false);
    const [createSaunaButton, setCreateSaunaButton] = useState<string>('Доавить');
    const handleSearchUserInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.keyCode === 13){
            store.getUserByLogin(loginState)
                .then((user: AxiosResponse<GrantUserModel>) => {
                    if(typeof user.data === "object") {
                        const appendUserBlock = document.getElementById('searchWrapper');
                        if(appendUserBlock) {
                            const appendItem = document.createElement('h1');
                            appendItem.innerText = `${user.data.name}: ${user.data.name} ${user.data.lastName}`;
                            appendUserBlock.replaceWith(appendItem);
                            setSearchedUser(user.data);
                        }
                    }
                    else {
                        const appendUserBlock = document.getElementById('searchWrapper');
                        if(appendUserBlock) {
                            const appendItem = document.createElement('h1');
                            appendItem.innerText = `Такого пользователя не существует.`;
                            appendUserBlock.append(appendItem);
                        }
                    }
                })
                .catch((error: Error) => {
                    const appendUserBlock = document.getElementById('searchWrapper');
                    if(appendUserBlock) {
                        const appendItem = document.createElement('h1');
                        appendItem.innerText = error?.message;
                        appendUserBlock.append(appendItem);
                    }
                })
        }
    };

    const editClick = () => {
        const userInputs = document.getElementsByTagName('input');
        const saveButton = document.getElementById('saveButton');
        const editButton = document.getElementById('editButton');
        const passwordInput = document.getElementById('password-input');
        const loginInput = document.getElementById('login-input');

        if (userInputs && saveButton && editButton && loginInput && passwordInput) {
            const isEditing = editButton.innerText.trim().toLowerCase() === 'изменить';

            for (let i = 0; i < userInputs.length; i++) {
                const element = userInputs[i] as HTMLInputElement;
                element.disabled = !isEditing;
                if (!isEditing) element.value = '';
            }

            editButton.innerText = isEditing ? 'Отмена' : 'Изменить';
            saveButton.style.display = isEditing ? 'inline-block' : 'none';
            passwordInput.style.display = isEditing ? 'block' : 'none';
            loginInput.style.display = isEditing ? 'block' : 'none';
        }
    };


    const editProfile = () => {
        const nameInput: HTMLInputElement = document.getElementById('name-input') as HTMLInputElement;
        const secondNameInput: HTMLInputElement = document.getElementById('secondName-input') as HTMLInputElement;
        const lastNameInput: HTMLInputElement = document.getElementById('lastName-input') as HTMLInputElement;
        const phoneInput: HTMLInputElement = document.getElementById('phone-input') as HTMLInputElement;
        const passwordInput: HTMLInputElement = document.getElementById('password-input') as HTMLInputElement;
        const loginInput: HTMLInputElement = document.getElementById('login-input') as HTMLInputElement;
        if(nameInput && secondNameInput && lastNameInput && phoneInput && passwordInput && loginInput) {
            const updateData : EditUserDto = {
                login: loginInput.value,
                name: nameInput.value,
                secondName: secondNameInput.value,
                lastName: lastNameInput.value,
                phone: phoneInput.value,
                password: passwordInput.value
            };
            store.editProfile(updateData).then(() => {
                window.location.reload();
            });

        }
    }


    const {store } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);
    const [saunas, setSaunas] = useState<SaunaDto[]>([])

    useEffect(() => {
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
    }, [store]);

    useEffect(() => {
        store.getUsers()
            .then((data) => {
                setUsers(data.data);
            })
            .catch((error: Error) => {
                console.error(error.message);
            });
    }, [store]);
    return(
      <div className={styles.wrapper}>
          <h1>Профиль</h1>
          <div className={styles.userInfoBlock}>
              <div className={styles.userInfoInputs}>
                  <input id='name-input' disabled={true} className={styles.userInfoInput}
                         placeholder={`Имя: ${store.user.name}`}/>
                  <input id='secondName-input' disabled={true} className={styles.userInfoInput}
                         placeholder={`Фамилия: ${store.user.secondName}`}/>
                  <input id='lastName-input' disabled={true} className={styles.userInfoInput}
                         placeholder={`Отчество: ${store.user.lastName}`}/>
                  <input id='phone-input' disabled={true} className={styles.userInfoInput}
                         placeholder={`Телефон: ${store.user.phone}`}/>
                  <input id='password-input' disabled={true} className={styles.userInfoInput} style={{display: 'none'}}
                         placeholder={`Пароль:`}/>
                  <input id='login-input' disabled={true} className={styles.userInfoInput} style={{display: 'none'}}
                         placeholder={`Логин: ${store.user.login}`}/>
                  <div style={{display: 'flex', gap: '20px', justifyContent: "center"}}>
                      <button id='editButton' className={styles.editButton} color="primary" onClick={editClick}>
                          Изменить
                      </button>
                      <button id='saveButton' style={{display: "none"}} className={styles.editButton} color="primary"
                              onClick={() => editProfile()}>
                          Сохранить
                      </button>
                  </div>
              </div>
              {store.user.role === 'creator' &&
                  <div style={{display: "flex", justifyContent: "center", flexDirection: "column", margin: "40px"}}>
                      <h1>Ваши сауны:</h1>
                      <div className={styles.userSaunas}>
                          {saunas.map((sauna) => {
                              return <UserSaunaCard saunaId={sauna.saunaId}
                                                    name={sauna.name}
                                                    price={sauna.price}
                                                    description={sauna.description}
                                                    address={sauna.address}
                                                    images={sauna.images}
                                                    swimmingPools={sauna.swimmingPools}
                                                    billiard={sauna.billiard}
                              />
                          })}
                      </div>
                  </div>
              }
          </div>
          {store.user.role === 'admin' &&
              <div className={styles.adminPanel}>
                  <div className={'searchWrapper'} id='searchWrapper'>
                      <input type={'search'} placeholder={'Найти...'}
                             className={styles.searchInput}
                             onKeyDown={(event) => handleSearchUserInput(event)}
                             onChange={(e) => setLoginState(e.target.value)}
                      />
                  </div>
                  <div className={styles.buttonGroup}>
                      <ButtonGroup>
                          <Button onClick={() => store.grantRole(searchedUser)}>Резрешить создание объявлений</Button>
                          <Button onClick={() => store.revokeRole(searchedUser)}>Запретить создание объявлений</Button>
                      </ButtonGroup>
                  </div>
              </div>
          }
          {store.user.role === "creator" &&
              <div style={{display: "flex", justifyContent: "center", alignItems:"center", flexDirection: "column", gap: "40px", width: "50vw"}}>
                  {createSaunaPanel &&
                      <div id='saunaPanelForm' style={{width: "50vw"}}>
                            <CreateSaunaPanel/>
                      </div>
                  }
                  {!createSaunaPanel &&
                      <div>
                          <Button onClick={() => setCreateSaunaPanel(!createSaunaPanel)}>Добавить сауну</Button>
                      </div>
                  }
              </div>
          }
      </div>
    );
}

export default Profile;
import React, { FC, useContext, useState } from "react";
import { Input, Radio, RadioGroup } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import styles from "./createSaunaPanel.module.css";
import { AddSaunaDto, SwimmingPool } from "../../../models/sauna/add-sauna.dto";
import { Context } from "../../../index";
import User from "../../../../../backend/course/src/entities/user.entity";
import ImageEntity from "../../../../../backend/course/src/entities/image.entity";
import $api from "../../../http";
import {useNavigate} from "react-router-dom";

const CreateSaunaPanel: FC = () => {
    const { store } = useContext(Context);
    const naviagtor = useNavigate();
    const [swimmingPoolState, setSwimmingPoolState] = useState<string>("no");
    const [billiardState, setBilliardState] = useState<string>("no");

    // Input states
    const [priceInput, setPriceInput] = useState("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<ImageEntity[]>([]);
    const [loadImage, setLoadImage] = useState<File[]>([]);
    const [region, setRegion] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [houseNumber, setHouseNumber] = useState<string>("");
    const [swimmingPools, setSwimmingPools] = useState<SwimmingPool[]>([]);
    const [billiard, setBilliard] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    const addSwimmingPool = () => {
        setSwimmingPools([...swimmingPools, { length: 0, width: 0 }]);
    };

    const updateSwimmingPool = (index: number, key: keyof SwimmingPool, value: number) => {
        const updatedPools = [...swimmingPools];
        updatedPools[index][key] = value;
        setSwimmingPools(updatedPools);
    };

    const removeSwimmingPool = (index: number) => {
        setSwimmingPools(swimmingPools.filter((_, i) => i !== index));
    };

    const validateInputs = (): boolean => {
        if (!name.trim()) {
            alert("Название обязательно.");
            return false;
        }
        if (!description.trim()) {
            alert("Описание обязательно.");
            return false;
        }

        if(loadImage.length === 0) {
            alert('Изображение обязательно!')
            return false;
        }

        if (!region.trim()) {
            alert("Область обязательна.");
            return false;
        }
        if (!city.trim()) {
            alert("Город обязателен.");
            return false;
        }
        if (!street.trim()) {
            alert("Улица обязательна.");
            return false;
        }
        if (!houseNumber.trim()) {
            alert("Номер дома обязателен.");
            return false;
        }
        if (price <= 0) {
            alert("Цена должна быть больше 0.");
            return false;
        }
        
        return true;
    };

    const addSauna = async () => {
        if (!validateInputs()) return;

        try {
            const formData = new FormData();

            loadImage.forEach((file) => formData.append("images", file));

            const sauna: AddSaunaDto = {
                name,
                description,
                price,
                billiard: billiardState === "yes" ? billiard : 0,
                region,
                city,
                street,
                houseNumber,
                User: store.user as User,
                swimmingPool: swimmingPools.length > 0 ? swimmingPools : undefined,
            };
            formData.append("addSaunaDto", JSON.stringify(sauna));

            formData.append("user", JSON.stringify(store.user));

            const response = await $api.post(
                "http://localhost:4000/sauna/addSaunaWithImages",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Сауна успешно добавлена!");
        } catch (error) {
            alert("Ошибка: " + error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full gap-4">
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Введите название"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex w-full gap-4">
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Введите описание"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex w-full gap-4">
                <Input
                    type="file"
                    variant="underlined"
                    placeholder="Добавьте изображение"
                    id="file"
                    multiple
                    onChange={(event) => {
                        const files = event.target.files;
                        if (files) {
                            const uploadedFiles = Array.from(files);

                            const uploadedImages = uploadedFiles.map((file) => {
                                return {
                                    id: 0,
                                    url: `${store.user.login}-${file.name}`,
                                };
                            });

                            setLoadImage(uploadedFiles);
                        }
                    }}
                />
            </div>
            <div className="flex w-full gap-4">
                <Input
                    id='priceInput'
                    type="text"
                    variant="underlined"
                    placeholder="Цена за час"
                    value={priceInput}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                            setPriceInput(value);
                            setPrice(+value || 0);
                        }
                    }
                    }
                />
            </div>
            <div className="flex w-full gap-4">
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Введите область"
                    onChange={(e) => setRegion(e.target.value)}
                />
            </div>
            <div className="flex w-full gap-4">
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Введите город"
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className="flex w-full gap-4">
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Введите улицу"
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
            <div className="flex w-full gap-4">
                <Input
                    type="text"
                    variant="underlined"
                    placeholder="Введите номер дома"
                    onChange={(e) => setHouseNumber(e.target.value)}
                />
            </div>
            <RadioGroup
                label="Есть бассейн?"
                orientation="horizontal"
                className={styles.RadioGroup}
                value={swimmingPoolState}
                onValueChange={setSwimmingPoolState}
            >
                <Radio value="no">Нет</Radio>
                <Radio value="yes">Да</Radio>
            </RadioGroup>
            {swimmingPoolState === "yes" &&
                swimmingPools.map((pool, index) => (
                    <div key={index} className="flex w-full gap-4">
                        <Input
                            type="number"
                            variant="underlined"
                            placeholder="Длина бассейна"
                            value={pool.length.toString() || ''}
                            onChange={(e) => updateSwimmingPool(index, "length", +e.target.value)}
                        />
                        <Input
                            type="number"
                            variant="underlined"
                            placeholder="Ширина бассейна"
                            value={pool.width.toString() || ''}
                            onChange={(e) => updateSwimmingPool(index, "width", +e.target.value)}
                        />
                        <Button onClick={() => removeSwimmingPool(index)}>Удалить</Button>
                    </div>
                ))}
            {swimmingPoolState === "yes" && (
                <Button onClick={addSwimmingPool}>Добавить бассейн</Button>
            )}
            <RadioGroup
                label="Есть бильярд?"
                orientation="horizontal"
                className={styles.RadioGroup}
                value={billiardState}
                onValueChange={setBilliardState}
            >
                <Radio value="no">Нет</Radio>
                <Radio value="yes">Да</Radio>
            </RadioGroup>
            {billiardState === "yes" && (
                <div className="flex w-full gap-4">
                    <Input
                        variant="underlined"
                        type="number"
                        placeholder="Количество бильярдов"
                        onChange={(e) => setBilliard(+e.target.value)}
                    />
                </div>
            )}
            <ButtonGroup>
                <Button onClick={() =>  naviagtor('/profile')}>Отменить</Button>
                <Button type="submit" onClick={addSauna}>
                    Добавить
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default CreateSaunaPanel;

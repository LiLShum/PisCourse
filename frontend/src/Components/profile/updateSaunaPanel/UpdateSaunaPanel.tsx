import {FC, useContext, useEffect, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input
} from "@nextui-org/react";
import {SaunaDto} from "../../../models/sauna/add-sauna.dto";
import {Context} from "../../../index";
import UpdateSaunaDto from "../../../models/sauna/update-sauna.dto";
import SwimmingPoolDto from "../../../models/SwimmingPool.dto";

interface UpdateSaunaPanelProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (isOpen: boolean) => void;
    sauna: SaunaDto;
}

const UpdateSaunaPanel : FC<UpdateSaunaPanelProps> = ({isOpen, onOpen, onOpenChange, sauna}) => {
    const { store } = useContext(Context);
    const updateSauna = function (updateSaunaDto : UpdateSaunaDto) {
        return store.updateSauna(updateSaunaDto, sauna.saunaId.toString());
    }


    const [swimmingPoolState, setSwimmingPoolState] = useState<string>('no');
    const [billiardState, setBilliardState] = useState<string>('no');
    //input states
    const [name, setName] = useState<string>(sauna.name);
    const [description, setDescription] = useState<string>(sauna.description);
    const [image, setImage] = useState<string>("");
    const [loadImage, setLoadImage] = useState<File>();
    const [region, setRegion] = useState<string>(sauna.address.region);
    const [city, setCity] = useState<string>(sauna.address.city);
    const [street, setStreet] = useState<string>(sauna.address.street);
    const [houseNumber, setHouseNumber] = useState<string>(sauna.address.houseNumber);
    const [swimmingPools, setSwimmingPools] = useState<SwimmingPoolDto[]>(sauna.swimmingPools as SwimmingPoolDto[]);
    const [width, setWidth] = useState<number[]>(swimmingPools.map((swimmingPool) => {
        return swimmingPool.width;
    }));
    const [length, setLength] = useState<number[]>(swimmingPools.map((swimmingPool) => {
        return swimmingPool.length;
    }));
    const [billiard, setBilliard] = useState<number | undefined>(sauna.billiard);
    const [price, setPrice] = useState<number>(sauna.price);

    useEffect(() => {
        console.log("Current sauna.images:", sauna.images);
        if (sauna.images && sauna.images.length > 0) {
            setImage(`/${sauna.images[0].url}`);
        }
    }, [sauna]);

    return (
        <>
            <Modal isOpen={isOpen}
                   onOpenChange={onOpenChange}
                   isDismissable={false}
                   isKeyboardDismissDisabled={true}
                   scrollBehavior={'inside'}
            >
                <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Обновите данные</ModalHeader>
                                <ModalBody>
                                    <div className="w-full flex flex-col gap-4">
                                        <div key={"underlined"}
                                             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                        >
                                            <Input type="text" variant={"underlined"}
                                                   value={name}
                                                   placeholder="Введите название"
                                                   label="Введите название"
                                                   onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div key={"underlined"}
                                             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                        >
                                            <Input type="text" variant={"underlined"}
                                                   value={description}
                                                   placeholder="Введите описание"
                                                   label="Введите описание"
                                                   onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div key={"underlined"}
                                             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                        >
                                            <Input type="text" variant={"underlined"}
                                                   value={price.toString()}
                                                   placeholder="Цена за час"
                                                   label="Цена за час"
                                                   onChange={(e) => setPrice(+e.target.value)}
                                            />
                                        </div>
                                        <div key={"underlined"}
                                             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                        >
                                            <Input type="text" variant={"underlined"}
                                                   value={region}
                                                   placeholder="Введите область"
                                                   label="Введите область"
                                                   onChange={(e) => setRegion(e.target.value)}
                                            />
                                        </div>
                                        <div key={"underlined"}
                                             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                        >
                                            <Input type="text" variant={"underlined"}
                                                   value={city}
                                                   placeholder="Введите город"
                                                   label="Введите город"
                                                   onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>
                                        <div key={"underlined"}
                                             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                        >
                                            <Input type="text" variant={"underlined"}
                                                   label={"Введите улицу"}
                                                   value={street}
                                                   placeholder="Введите улицу"
                                                   onChange={(e) => setStreet(e.target.value)}
                                            />
                                        </div>
                                        <div key={"underlined"}
                                             className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                        >
                                            <Input type="text" variant={"underlined"}
                                                   label={'Введите номер дома'}
                                                   placeholder="Введите номер дома"
                                                   onChange={(e) => setHouseNumber(e.target.value)}
                                                   value={houseNumber}
                                            />
                                        </div>
                                        {sauna.billiard &&
                                            <div key={"underlined"}
                                                 className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="text" variant={"underlined"}
                                                       label="Кол-во бильярдов"
                                                       placeholder="Кол-во бильярдов"
                                                       onChange={(e) => setBilliard(+e.target.value)}
                                                       value={billiard?.toString()}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        {sauna.swimmingPools?.map((swimmingPool, index) => {
                                            return (
                                                <>
                                                    <h1>Бассейны</h1>
                                                    <div key={"underlined"}
                                                         className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" variant={"underlined"}
                                                               label={'Введите длинну бассейна'}
                                                               placeholder="Введите длинну бассейна"
                                                               onChange={(e) => {
                                                                   const newLength = [...length];
                                                                   newLength[index] = +e.target.value;
                                                                   setLength(newLength);
                                                                   const updatedSwimmingPools = [...swimmingPools];
                                                                   updatedSwimmingPools[index] = {
                                                                       ...updatedSwimmingPools[index],
                                                                       length: +e.target.value,
                                                                   };
                                                                   setSwimmingPools(updatedSwimmingPools);
                                                               }}
                                                               value={length[index].toString()}
                                                        />
                                                    </div>
                                                    <div key={"underlined"}
                                                         className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" variant={"underlined"}
                                                               label={'Введите ширину бассейна'}
                                                               placeholder="Введите ширину бассейна"
                                                               onChange={(e) => {
                                                                   const newWidth = [...length];
                                                                   newWidth[index] = +e.target.value;
                                                                   setWidth(newWidth);
                                                                   const updatedSwimmingPools = [...swimmingPools];
                                                                   updatedSwimmingPools[index] = {
                                                                       ...updatedSwimmingPools[index],
                                                                       width: +e.target.value,
                                                                   };
                                                                   setSwimmingPools(updatedSwimmingPools);
                                                               }}
                                                               value={width[index].toString()}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Отмена
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        const updateData : UpdateSaunaDto = {
                                            name: name,
                                            description: description,
                                            image: image,
                                            price: price,
                                            region: region,
                                            city: city,
                                            street: street,
                                            billiard: billiard,
                                            houseNumber: houseNumber,
                                            swimmingPools: swimmingPools,
                                        }
                                        updateSauna(updateData)
                                            .then(()=> {
                                                alert("updated")
                                                onClose();
                                            })
                                            .catch((reason) => alert(reason));
                                    }}>
                                        Обновить
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateSaunaPanel;
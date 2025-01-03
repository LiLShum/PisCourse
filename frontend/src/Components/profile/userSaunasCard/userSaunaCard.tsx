import React, {FC, useContext, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    DropdownItem,
    DropdownTrigger,
    Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {ButtonGroup, Dropdown, DropdownMenu} from "@nextui-org/react";
import {ChevronDownIcon} from './ChevronDownIcon';
import {SaunaDto, userSaunaCardProps} from "../../../models/sauna/add-sauna.dto";
import {Context} from "../../../index";
import UpdateSaunaPanel from "../updateSaunaPanel/UpdateSaunaPanel";
import saunaCard from "../../saunaCards/saunaCard/saunaCard";
import {useNavigate} from "react-router-dom";

const UserSaunaCard: FC<userSaunaCardProps & { onDelete: (id: number) => void }> = ({ onDelete, ...userSaunaCardProps }) => {
    const [selectedOption, setSelectedOption] = useState<keyof typeof labelsMap | ''>('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const saunaImages = [...userSaunaCardProps.images];
    const { store } = useContext(Context);

    const labelsMap = {
        delete: "Удалить",
        update: "Обновить",
    };


    return (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8" style={{width: "800px"}}>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10  flex-col items-start" style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                    <h4 className="text-white/90 font-medium text-xl" style={{color: "white", zIndex: 0}}>
                        {userSaunaCardProps.name}
                    </h4>
                </CardHeader>
                <img
                    src={`/${saunaImages[0].url}`}
                    alt='sauna image'
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">от {userSaunaCardProps.price} BYN</p>
                            <p className="text-tiny text-white/60">
                                г. {userSaunaCardProps.address.city}, ул. {userSaunaCardProps.address.street}, д. {userSaunaCardProps.address.houseNumber}.
                            </p>
                        </div>
                    </div>
                    <ButtonGroup variant="flat">
                        <Button>{selectedOption ? labelsMap[selectedOption] : "Выберите действие"}</Button>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button isIconOnly>
                                    <ChevronDownIcon />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Merge options"
                                selectedKeys={selectedOption ? new Set([selectedOption]) : undefined}
                                selectionMode="single"
                                onSelectionChange={(keys) => {
                                    const selectedKey = Array.from(keys)[0] as keyof typeof labelsMap;
                                    setSelectedOption(selectedKey);
                                }}
                                className="max-w-[300px]"
                            >
                                <DropdownItem
                                    key="update"
                                    onPress={() => {
                                            onOpen();
                                        }
                                    }
                                >
                                    {labelsMap["update"]}
                                </DropdownItem>
                                <DropdownItem key="delete" onClick={() => {
                                    store.deleteSauna(userSaunaCardProps.saunaId.toString())
                                        .then(() => {
                                            alert("deleted");
                                            onDelete(userSaunaCardProps.saunaId);
                                        })
                                        .catch(() => alert("error"))
                                }}>
                                    {labelsMap["delete"]}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ButtonGroup>
                </CardFooter>
            </Card>
           <UpdateSaunaPanel isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} sauna={userSaunaCardProps}/>
        </div>
    );
}

export default UserSaunaCard;

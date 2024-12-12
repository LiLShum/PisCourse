import React, {FC, useContext} from "react";
import {UserBookingsDto} from "../../../models/dto/booking.dto";
import {Context} from "../../../index";

interface ViewBookingsProps {
    bookings: UserBookingsDto[];
}

const ViewBookings: FC<ViewBookingsProps> = ({ bookings } : ViewBookingsProps) => {
    const { store } = useContext(Context);
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{marginTop: "15%", width: "400px", textAlign: "center"}}>
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div key={index} style={{border: "1px solid black", marginBottom: '20px'}}>
                            <h3>Бронирование</h3>
                            <p><strong>Дата:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                            <p><strong>Начало:</strong> {new Date(booking.startTime).toLocaleTimeString()}</p>
                            <p><strong>Конец:</strong> {new Date(booking.endTime).toLocaleTimeString()}</p>
                            <p><strong>Сауна:</strong> {booking.sauna.name}</p>
                            <hr/>
                            <button onClick={() => {
                                store.deleteBooking(booking.bookingId.toString())
                                    .then(() => window.location.reload())
                            }}>Отменить бронирование
                            </button>
                        </div>
                    ))
                ) : (
                    <h1>У вас пока ничего не забронированно</h1>
                )}
            </div>
        </div>
    );
};

export default ViewBookings;

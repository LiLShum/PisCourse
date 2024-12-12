import React, { FC, useContext, useEffect, useState } from "react";
import Header from "./Components/header/Header";
import { Context } from "./index";
import ViewBookings from "./Components/profile/bookings/ViewBookings";
import { UserBookingsDto } from "./models/dto/booking.dto";
import { Spinner } from "@nextui-org/react";

const Bookings: FC = () => {
    const { store } = useContext(Context);
    const [bookingsState, setBookings] = useState<UserBookingsDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilterBookings = async () => {
            try {
                await store.checkAuth();
                const user = await store.getUserByLogin(store.user.login);
                const bookings = await store.getUserBookings(user.data.userId);
                const upcomingBookings: UserBookingsDto[] = [];
                for (const booking of bookings.data) {
                    const bookingDate = new Date(booking.date);
                    if (bookingDate < new Date()) {
                        await store.deleteBooking(booking.bookingId.toString());
                    } else {
                        upcomingBookings.push(booking);
                    }
                }

                setBookings(upcomingBookings);
                setIsLoading(false);
            } catch (error) {
                console.error("Ошибка при загрузке бронирований:", error);
                setIsLoading(false);
            }
        };

        fetchAndFilterBookings();
    }, [store]);

    if (!store.isAuth) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Spinner />
            </div>
        );
    } else {
        return (
            <>
                <Header isAuth={store.isAuth} />
                <ViewBookings bookings={bookingsState} />
            </>
        );
    }
};

export default Bookings;

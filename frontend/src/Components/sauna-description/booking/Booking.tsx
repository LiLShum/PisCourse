import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './Booking.module.css';
import { Context } from "../../../index";
import {Navigate, useNavigate, useParams} from "react-router-dom";

type Booking = {
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
};

type BlockedTimes = {
    [date: string]: { start: Date; end: Date }[];
};

const BookingComponent: React.FC = () => {
    const { store } = useContext(Context);
    const { saunaId } = useParams<{ saunaId: string }>();
    const [userId, setUserId] = useState<number>(0);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [currentBooking, setCurrentBooking] = useState<Booking>({
        date: null,
        startTime: null,
        endTime: null,
    });
    const navigate = useNavigate();
    const [blockedTimes, setBlockedTimes] = useState<BlockedTimes>({});

    useEffect( () => {
        store.getBookings().then((response) => {
            const data = response.data.map((booking: any) => ({
                date: new Date(booking.date),
                startTime: new Date(booking.startTime),
                endTime: new Date(booking.endTime),
            }));
            store.getUserByLogin(store.user.login)
                .then((data) => setUserId(+data.data.userId));
            setBookings(data);
            initializeBlockedTimes(data);
        });
    }, [store]);

    const initializeBlockedTimes = (bookings: Booking[]) => {
        const newBlockedTimes: BlockedTimes = {};
        bookings.forEach((booking) => {
            if (booking.date && booking.startTime && booking.endTime) {
                const dateKey = booking.date.toDateString();
                if (!newBlockedTimes[dateKey]) {
                    newBlockedTimes[dateKey] = [];
                }
                newBlockedTimes[dateKey].push({
                    start: booking.startTime,
                    end: booking.endTime,
                });
            }
        });
        setBlockedTimes(newBlockedTimes);
    };

    const handleDateChange = (date: Date | null) => {
        setCurrentBooking((prev) => ({ ...prev, date, startTime: null, endTime: null }));
    };

    const handleTimeChange = (key: "startTime" | "endTime", time: Date | null) => {
        setCurrentBooking((prev) => ({ ...prev, [key]: time }));
    };

    const isTimeBlocked = (date: string, startTime: Date, endTime: Date) => {
        if (!blockedTimes[date]) return false;
        return blockedTimes[date].some(
            (interval) =>
                (startTime >= interval.start && startTime < interval.end) ||
                (endTime > interval.start && endTime <= interval.end) ||
                (startTime <= interval.start && endTime >= interval.end)
        );
    };

    const blockTime = () => {
        if(store.isAuth) {
            if (currentBooking.date && currentBooking.startTime && currentBooking.endTime) {
                const dateKey = currentBooking.date.toDateString();
                const startTime = new Date(currentBooking.startTime);
                const endTime = new Date(currentBooking.endTime);
                if (isTimeBlocked(dateKey, startTime, endTime)) {
                    alert("Выбранный интервал уже заблокирован!");
                    return;
                }

                if(startTime > endTime) {
                    alert("Неккортные времменой интервал!")
                    return;
                }

                const newBooking: Booking = {
                    date: currentBooking.date,
                    startTime,
                    endTime,
                };
                store.bookingSauna({
                    date: newBooking.date as Date,
                    startTime: newBooking.startTime as Date,
                    endTime: newBooking.endTime as Date,
                    saunaId: parseInt(saunaId as string),
                    userId: userId,
                });

                setBookings((prev) => [...prev, newBooking]);
                setBlockedTimes((prev) => ({
                    ...prev,
                    [dateKey]: [...(prev[dateKey] || []), { start: startTime, end: endTime }],
                }));

                setCurrentBooking({ date: null, startTime: null, endTime: null });
            }
        }
        else {
            navigate('/auth');
        }
    };

    const getExcludedTimes = () => {
        if (!currentBooking.date) return [];
        const dateKey = currentBooking.date.toDateString();
        const intervals = blockedTimes[dateKey] || [];
        const excludedTimes: Date[] = [];

        intervals.forEach((interval) => {
            let currentTime = new Date(interval.start);
            while (currentTime < interval.end) {
                excludedTimes.push(new Date(currentTime));
                currentTime.setMinutes(currentTime.getMinutes() + 30);
            }
        });

        return excludedTimes;
    };

    return (
        <div className={styles.bookingContainer}>
            <h2>Бронирование</h2>
            <div className={styles.datepickerContainer}>
                <label>Выберите дату:</label>
                <DatePicker
                    selected={currentBooking.date}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Выберите дату"
                />
            </div>
            <div className={styles.datepickerContainer}>
                <label>Выберите начальное время:</label>
                <DatePicker
                    selected={currentBooking.startTime}
                    onChange={(time) => handleTimeChange("startTime", time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Время"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    placeholderText="Выберите начальное время"
                    excludeTimes={getExcludedTimes()}
                />
            </div>
            <div className={styles.datepickerContainer}>
                <label>Выберите конечное время:</label>
                <DatePicker
                    selected={currentBooking.endTime}
                    onChange={(time) => handleTimeChange("endTime", time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Время"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    placeholderText="Выберите конечное время"
                    excludeTimes={getExcludedTimes()}
                />
            </div>
            <button
                className={styles.bookingButton}
                onClick={blockTime}
                disabled={!currentBooking.date || !currentBooking.startTime || !currentBooking.endTime}
            >
                Забронировать
            </button>
        </div>
    );
};

export default BookingComponent;

import React, {useCallback} from 'react'
import {useEffect, useState} from 'react';
import DateInput from "./DateInput/DateInput.jsx";
import CalendarInput from "./CalendarInput/CalendarInput.jsx";
import {getDateAsDate} from "../../utils/formatDate.js";

import './DatePicker.css'

const DatePicker = () => {
    const [date, setDate] = useState("");
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [isValid, setIsValid] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        if (date.length > 0 && isValid) {
            setCalendarDate(getDateAsDate(date));
            showCalendarChanger(false)
        }
    }, [isValid])

    const getDateFromInput = (dateString, valid) => {
        setIsValid(valid);
        setDate(dateString);
    }

    const getDateFromCalendar = useCallback((date, dateString) => {
        setDate(dateString)
        setCalendarDate(date)
    }, []);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    }

    const showCalendarChanger = (state) => {
        setShowCalendar(state);
    }


    return (
        <div className="datePicker">
            <DateInput
                value={date}
                returnDate={getDateFromInput}
                toggleCalendar={toggleCalendar}
                showCalendarChanger={showCalendarChanger}
            />
            {!isValid && <p>Not valid</p>}
            {showCalendar && <CalendarInput
                date={calendarDate}
                returnDate={getDateFromCalendar}
            />}
        </div>
    );
};

export default DatePicker;

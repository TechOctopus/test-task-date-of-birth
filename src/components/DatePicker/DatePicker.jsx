import React, {useCallback} from 'react'
import {useEffect, useState} from 'react';
import DateInput from "./DateInput/DateInput.jsx";
import CalendarInput from "./CalendarInput/CalendarInput.jsx";

import './DatePicker.css'
import {getDateAsObj} from "../../utils/formatDate.js";

const DatePicker = ({placeholder}) => {
    const [date, setDate] = useState("");
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [isValid, setIsValid] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [locale, setLocale] = React.useState('sk');

    useEffect(() => {
        if (date.length > 0 && isValid) {
            setCalendarDate(getDateAsObj(date, locale));
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

    const getLocale = (lc) => {
        setLocale(lc);
    }


    return (
        <div className="datePicker">
            <DateInput
                value={date}
                placeholder={placeholder}
                returnDate={getDateFromInput}
                toggleCalendar={toggleCalendar}
                showCalendarChanger={showCalendarChanger}
                locale={locale}
            />
            {!isValid && <p>Not valid</p>}
            {showCalendar &&
                <CalendarInput
                    locale={locale}
                    returnLocale={getLocale}
                    date={calendarDate}
                    returnDate={getDateFromCalendar}
                />
            }
        </div>
    );
};

export default DatePicker;

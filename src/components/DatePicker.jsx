import React, { useState } from 'react';
import {Calendar} from "react-date-range";
import format from "date-fns/format";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DatePicker.css'
import {nameMapper} from "../utils/nameMapper.js";
import * as locales from 'react-date-range/dist/locale';
import parse from "date-fns/parse";
import isValid from "date-fns/isValid";

const DatePicker = () => {
    const [date, setDate] = useState("");
    const [calendarData, setCalendarData] = useState(new Date());
    const [Valid, setIsValid] = useState(true);
    const [locale, setLocale] = React.useState('sk');

    const localeOptions = Object.keys(locales)
        .map(key => ({
            value: key,
            label: `${key} - ${nameMapper[key] || ''}`
        }))
        .filter(item => nameMapper[item.value]);

    const isValidDateToChange = (inputDate, Slashes) => {
        const checkSlashes = (inputDate.match(/\//g) || []).length === Slashes;
        const checkNumbers = /^[0-9/]+$/.test(inputDate)
        return checkSlashes && checkNumbers;
    }

    const formatDate = (inputDate, selectionStart) => {

        // Test to see if the user wants to change a date that is already written

        if(inputDate.length !== selectionStart){
            if(inputDate.length <= 5 && isValidDateToChange(inputDate, 1)){
                return inputDate;
            }
            if (inputDate.length <= 10 && isValidDateToChange(inputDate, 2)){
                return inputDate;
            }
        }

        // Date formatting

        let formattedDate = inputDate
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})\d+?$/, "$1");

        if(!formattedDate) return "";

        let [day, month, year] = formattedDate.split('/');

        if (day && day.length === 1 && Number(day) >= 4) {
            day = '0' + day;
        }

        if (month && month.length === 1 && Number(month) >= 2) {
            month = '0' + month;
        }

        let parts = [day, month, year].filter(Boolean);
        return parts.length > 1 ? parts.join('/') : parts[0];

    };

    const isValidDate = (dateString) => {
        const pattern = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
        const dateObj = getDate(dateString);
        return pattern.test(dateString) && isValid(dateObj);
    };

    const handleDateChange = (e) => {
        const formattedDateString = formatDate(e.target.value, e.target.selectionStart);
        const Valid = isValidDate(formattedDateString);

        setIsValid(Valid);
        setDate(formattedDateString);

        if(Valid){
            toggleDiv()
            const date = getDate(formattedDateString);
            setCalendarData(date);
        }

    };

    const getDate = (dateString) => {
        return parse(dateString, 'dd/MM/yyyy', new Date());
    }

    const inputStyle = Valid ? {border: '3px solid blue'} : { border: '3px solid red' };

    const [showDiv, setShowDiv] = useState(false);

    const toggleDiv = () => {
        setShowDiv(!showDiv);
    };


    return (
        <div className="datePicker">
            <div className="dateInput" style={inputStyle}>
                <input
                    className="dateQuery"
                    type="datetime"
                    value={date}
                    onChange={handleDateChange}
                    placeholder="dd/mm/yyyy"
                    onFocus={toggleDiv}
                />
                <button
                    className="button"
                    onClick={toggleDiv}
                >
                    <img className="logo" src="src/assets/calendar.svg"/>
                </button>
            </div>

            { showDiv &&
            <div className="Calendar">
                <select
                    style={{marginTop: "10px" }}
                    onChange={e => setLocale(e.target.value)}
                    value={locale}
                >
                    {localeOptions.map((option, i) => (
                        <option value={option.value} key={i}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <Calendar
                    onChange={item => {
                        setDate(format(item, 'dd/MM/yyyy'))
                        setCalendarData(item)
                        setIsValid(true);
                        toggleDiv()
                    }}
                    locale={locales[locale]}
                    date={calendarData}
                />
            </div>
            }

        </div>
    );
};

export default DatePicker;

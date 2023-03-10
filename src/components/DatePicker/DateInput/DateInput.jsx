import React from 'react'
import {formatDate, isValid} from "../../../utils/formatDate.js";

import "./DateInput.css"

const DateInput = ({value, placeholder, returnDate, toggleCalendar, showCalendarChanger, locale}) => {

    const handleDateChange = (e) => {
        const formattedDateString = formatDate(e.target.value);
        const valid = isValid(formattedDateString, locale);
        returnDate(formattedDateString, valid);
    };

    return (
        <div className="dateInput">
            <input
                onFocus={() => {showCalendarChanger(true)}}
                value={value}
                className="dateQuery"
                type="datetime"
                onChange={e => handleDateChange(e)}
                placeholder={placeholder}
                maxLength="12"
            />
            <button
                className="button"
                onClick={toggleCalendar}
            >
                <img
                    className="logo"
                    src="src/assets/calendar.svg"
                    alt="button"
                />
            </button>
        </div>
    );
};

export default DateInput;
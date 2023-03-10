import React from 'react'
import {formatDate, isValidDate} from "../../../utils/formatDate.js";

import "./DateInput.css"

const DateInput = ({value, returnDate, toggleCalendar, showCalendarChanger}) => {

    const handleDateChange = (e) => {
        const formattedDateString = formatDate(e.target.value, e.target.selectionStart);
        const valid = isValidDate(formattedDateString);
        returnDate(formattedDateString, valid);
    };

    return (
        <div className="dateInput"

        >
            <input
                onFocus={() => {showCalendarChanger(true)}}
                value={value}
                className="dateQuery"
                type="datetime"
                onChange={e => handleDateChange(e)}
                placeholder="dd/mm/yyyy"
                maxLength="10"
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
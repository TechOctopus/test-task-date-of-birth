import React from 'react'
import {formatDate, isValidDate} from "../../../utils/formatDate.js";
import {DebounceInput} from "react-debounce-input";

import "./DateInput.css"
const DateInput = ({value, returnDate, toggleCalendar, showCalendarChanger}) => {

    const handleDateChange = (e) => {
        const formattedDateString = formatDate(e.target.value, e.target.selectionStart);
        const valid = isValidDate(formattedDateString);
        returnDate(formattedDateString, valid);
    };

    return (
        <div className="dateInput">
            <DebounceInput
                debounceTimeout={10}
                value={value}
                className="dateQuery"
                type="datetime"
                onChange={e => handleDateChange(e)}
                onFocus={() => {showCalendarChanger(true)}}
                onBlur={() => {showCalendarChanger(false)}}
                placeholder="dd/mm/yyyy"
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
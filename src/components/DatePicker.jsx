import React, { useState } from 'react';
import {Calendar} from "react-date-range";
import format from "date-fns/format";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DatePicker.css'

const DatePicker = () => {
    const [date, setDate] = useState("");
    const [calendarData, setCalendarData] = useState(new Date());
    const [isValid, setIsValid] = useState(true);

    const formatDate = (inputDate) => {
        let formattedDate = inputDate
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})\d+?$/, "$1");

        let dateParts = formattedDate.split('/');

        if (dateParts[0]){
            if (dateParts[0].length === 1 && !['0', '1'].includes(dateParts[0])) {
                dateParts[0] = '0' + dateParts[0];
            }
        }


        if (dateParts.length === 1) {
            return dateParts[0];
        } else if (dateParts.length === 2) {
            return dateParts[0] + '/' + dateParts[1];
        } else {
            return dateParts[0] + '/' + dateParts[1] + '/' + dateParts[2];
        }
    };

    const isValidDate = (dateString) => {
        const pattern = /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        return pattern.test(dateString);
    };

    const handleDateChange = (e) => {
        const inputDateString = e.target.value;
        const formattedDateString = formatDate(inputDateString);
        const isValid = isValidDate(formattedDateString);
        setIsValid(isValid);
        setDate(formattedDateString);
        if(isValid){
            toggleDiv()
            setCalendarData(new Date(formattedDateString))
        }

    };

    const inputStyle = isValid ? {border: '3px solid blue'} : { border: '3px solid red' };

    const [showDiv, setShowDiv] = useState(false);

    const toggleDiv = () => {
        setShowDiv(!showDiv);
    };


    return (
        <div className="datePicker">
            <div className="dateInput" style={inputStyle}>
                <input
                    className="dateQuery"
                    value={date}
                    onChange={handleDateChange}
                    placeholder="mm/dd/yyyy"
                    onFocus={toggleDiv}
                />
                <button
                    className="button"
                    onClick={toggleDiv}
                >
                    <img className="logo" src="src/assets/calendar.svg"/>
                </button>
            </div>
            {showDiv &&
            <Calendar className="Calendar"
                onChange={item => {
                    setDate(format(item, 'MM/dd/yyyy'))
                    setCalendarData(item)
                    setIsValid(true);
                    toggleDiv()
                }}
                date={calendarData}
            />
            }
        </div>
    );
};

export default DatePicker;

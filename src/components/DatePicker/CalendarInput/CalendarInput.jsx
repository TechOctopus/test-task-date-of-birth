import React, {memo} from 'react'
import {Calendar} from "react-date-range";
import * as locales from "react-date-range/dist/locale/index.js";
import {nameMapper} from "../../../utils/nameMapper.js";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './CalendarInput.css'

const CalendarInput = memo(({date, returnDate, returnLocale, locale}) => {

    const localeOptions = Object.keys(locales)
        .map(key => ({
            value: key,
            label: `${key} - ${nameMapper[key] || ''}`
        }))
        .filter(item => nameMapper[item.value]);

    const handleDate = (item) => {
        const dateString = new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).format(item);
        returnDate(item, dateString);
    }

    const handleLocale = (locale) => {
        returnLocale(locale);
    }

    return (
        <div className="Calendar" >
            <select
                style={{marginTop: "10px" }}
                onChange={e => handleLocale(e.target.value)}
                value={locale}
            >
                {localeOptions.map((option, i) => (
                    <option value={option.value} key={i}>
                        {option.label}
                    </option>
                ))}
            </select>
            <Calendar
                onChange={item => handleDate(item)}
                locale={locales[locale]}
                date={date}
            />
        </div>
    );
}, (prev, curr) => prev.date === curr.date && prev.locale === curr.locale);

export default CalendarInput;
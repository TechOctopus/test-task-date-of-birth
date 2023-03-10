import parse from "date-fns/parse";
import isValid from "date-fns/isValid";

export const formatDate = (inputDate, selectionStart) => {

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

const checkUnitLength = (dateStr, Slashes) => {
    const arr = dateStr.split('/');
    if (Slashes === 1) return arr[0].length <= 2 && arr[1].length <= 2;
    return arr[0].length <= 2 && arr[1].length <= 2 && arr[2].length <= 4;
}

const isValidDateToChange = (inputDate, Slashes) => {
    const checkSlashes = (inputDate.match(/\//g) || []).length === Slashes;
    const checkNumbers = /^[0-9/]+$/.test(inputDate);
    const checkLength = checkUnitLength(inputDate, Slashes);
    return checkSlashes && checkNumbers && checkLength;
}

export const getDateAsDate = (dateString) => {
    return parse(dateString, 'dd/MM/yyyy', new Date());
}

export const isValidDate = (dateString) => {
    const pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    const dateObj = getDateAsDate(dateString);
    return pattern.test(dateString) && isValid(dateObj);
};
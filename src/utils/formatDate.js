import { parse } from 'date-fns';

export const formatDate = (dateString) => {
    const pattern = /^[\d\s\/\.\-\_]+$/;
    if (!(pattern.test(dateString))) return dateString.replace(/[^\d\s\/\.\-\_]/g,'');
    return dateString;
};

export const isValid = (dateString, locale) => {
    const mask = getDateMask(dateString, locale)
    return  isValidDate(dateString, mask);
}

const isValidDate = (dateString, mask) => {
    const regex = new RegExp(mask
        .replace('dd', '\\d{2}')
        .replace('MM', '\\d{2}')
        .replace('yyyy', '\\d{4}')
        .replace('yy', '\\d{2}'));
    return regex.test(dateString);
}

const getDateMask = (dateString, locale) => {
    const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).formatToParts(new Date());
    return  dateFormat.map(part => {
        switch (part.type) {
            case 'day':
                return 'dd';
            case 'month':
                return 'MM';
            case 'year':
                return 'yyyy';
            default:
                return part.value;
        }
    }).join('');
}

export const getDateAsObj = (dateString, locale) => {
    const mask = getDateMask(dateString, locale);
    return parse(dateString, mask, new Date());
}

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
        .replace('mm', '\\d{2}')
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
                return 'mm';
            case 'year':
                return 'yyyy';
            default:
                return part.value;
        }
    }).join('');
}

export const getDateAsObj = (dateString, locale) => {
    const mask = getDateMask(dateString, locale);
    const day = parseInt(dateString.substring(mask.indexOf("dd"), mask.indexOf("dd") + 2));
    const month = parseInt(dateString.substring(mask.indexOf("mm"), mask.indexOf("mm") + 2));
    const year = parseInt(dateString.substring(mask.indexOf("yyyy"), mask.indexOf("yyyy") + 4));
    return new Date(month+"/"+day+"/"+year);
}

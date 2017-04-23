function formatExpiry(expiry) {
    const parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
    if (!parts) {
        return '';
    }
    let mon = parts[1] || '';
    let sep = parts[2] || '';
    let year = parts[3] || '';
    if (year.length > 0) {
        sep = ' / ';
    } else if (sep === ' /') {
        mon = mon.substring(0, 1);
        sep = '';
    } else if (mon.length === 2 || sep.length > 0) {
        sep = ' / ';
    } else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
        mon = `0${mon}`;
        sep = ' / ';
    }
    return `${mon}${sep}${year}`;
}

export default formatExpiry;

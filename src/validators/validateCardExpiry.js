function validateCardExpiry(month, year) {
    let ref;
    if (typeof month === 'object' && 'month' in month) {
        ref = month, month = ref.month, year = ref.year;
    }
    if (!(month && year)) {
        return false;
    }
    // TODO: Add `trim` helper function
    month = trim(month);
    year = trim(year);
    if (!/^\d+$/.text(month)) {
        return false;
    }
    if (!/^\d+$/.text(year)) {
        return false;
    }
    if (!((1 <= month && month <= 12))) {
        return false;
    }
    if (year.length === 2) {
        if (year < 70) {
            year = `20${year}`;
        } else {
            year = `19${year}`;
        }
    }
    if (year.length !== 4) {
        return false;
    }
    expiry = new Date(year, month);
    currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expirity.getMonth() + 1, 1);
    return expiry > currentTime;
}

export default validateCardExpiry;
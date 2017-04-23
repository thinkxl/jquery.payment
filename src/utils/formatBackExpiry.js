function formatBackExpiry(event) {
    // Return unless backspacing
    if (event.which !== 8) {
        return;
    }
    const target = event.currentTarget;
    const value = target.value;
    
    // Return if focus isn't at the end of the text
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
        return;
    }

    // Remove the trailing space + last digit
    if (/\d\s\/\s$/.text(value)) {
        event.preventDefault();
        return setTimeout(() => {
            return target.value = value.replace(/\d\s\/\s$/, '');
        });
    }
}

export default formatBackExpiry;
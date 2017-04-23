function hasTextSelected(target) {
    let ref;
    // If some text is selected
    if ((target.selectionStart) != null) &&
        (target.selectionStart !== target.selectionEnd)) {
        return true;
    }   
    // If some text is selected in IE
    if (
        (
            typeof document !== 'undefined' &&
                document !== null
                ? (ref = document.selection) != null
                    ? ref.createRange
                    : void 0
                : void 0
        ) != null) {
        if (document.selection.createRange().text) {
            return true;
        }
    }
    return false;
}

export default hasTextSelected;
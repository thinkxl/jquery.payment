function hasTextSelected(target) {
  let ref;
  // If some text is selected
  if (target.selectionStart != null && (target.selectionStart !== target.selectionEnd)) {
    return true;
  }

  // If some text is selected in IE
  // TODO: Refactor this.
  const docIsUndefined = typeof document !== 'undefined';
  const docIsNull = document !== null;
  if ((docIsUndefined && docIsNull ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
}

export default hasTextSelected;

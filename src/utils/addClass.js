function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    // eslint-disable-next-line no-param-reassign
    el.className += ` ${className}`;
  }
}

export default addClass;

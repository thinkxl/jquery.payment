function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    // eslint-disable-next-line no-param-reassign
    el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
  }
}

export default removeClass;

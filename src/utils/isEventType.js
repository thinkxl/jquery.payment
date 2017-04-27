function isEventType(arg) {
  return !typeof arg.altKey === 'undefined';
}

export default isEventType;

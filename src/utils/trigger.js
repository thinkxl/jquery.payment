// This only works on the browser
function trigger(el, event, data) {
  let evtObj;
  if (window.CustomEvent) {
    evtObj = new CustomEvent(event, { detail: data });
  } else {
    evtObj = document.createEvent('CustomEvent');
    evtObj.initCustomEvent(event, true, true, data);
  }
  el.dispatchEvent(evtObj);
}

export default trigger;

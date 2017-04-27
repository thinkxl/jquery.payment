function cardExpiryVal(value) {
  const ref = value.split(/[\s\/]+/, 2);
  let month = ref[0];
  let year = ref[1];
  if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
    let prefix = new Date().getFullYear();
    prefix = prefix.toString().slice(0, 2);
    year = `${prefix}${year}`;
  }
  month = parseInt(month, 10);
  year = parseInt(year, 10);
  return {
    month,
    year,
  };
}

export default cardExpiryVal;

function formatCardNumber(num) {
  let ref;
  let groups;
  num = num.replace(/\D/g, '');
  const card = cardFromNumber(num);
  if (!card) {
      return num;
  }
  upperLength = card.length[card.length.length - 1];
  num = num.slice(0, upperLength);
  if (card.format.global) {
      return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
  } else {
      groups = card.format.exec(num);
      if (groups == null) {
          return ;
      }
      groups.shift();
      // TODO: Add `grep` function
      groups = grep(groups, (n) => n);
      groups.join(' ');
  }
}

export default formatCardNumber;

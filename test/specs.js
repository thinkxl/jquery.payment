var assert;

assert = require('assert');

describe('jquery.payment', function() {
  describe('Validating a card number', function() {
    it('should fail if empty', function() {
      var topic;
      topic = $.payment.validateCardNumber('');
      return assert.equal(topic, false);
    });
    it('should fail if is a bunch of spaces', function() {
      var topic;
      topic = $.payment.validateCardNumber('                 ');
      return assert.equal(topic, false);
    });
    it('should success if is valid', function() {
      var topic;
      topic = $.payment.validateCardNumber('4242424242424242');
      return assert.equal(topic, true);
    });
    it('that has dashes in it but is valid', function() {
      var topic;
      topic = $.payment.validateCardNumber('4242-4242-4242-4242');
      return assert.equal(topic, true);
    });
    it('should succeed if it has spaces in it but is valid', function() {
      var topic;
      topic = $.payment.validateCardNumber('4242 4242 4242 4242');
      return assert.equal(topic, true);
    });
    it('that does not pass the luhn checker', function() {
      var topic;
      topic = $.payment.validateCardNumber('4242424242424241');
      return assert.equal(topic, false);
    });
    it('should fail if is more than 16 digits', function() {
      var topic;
      topic = $.payment.validateCardNumber('42424242424242424');
      return assert.equal(topic, false);
    });
    it('should fail if is less than 10 digits', function() {
      var topic;
      topic = $.payment.validateCardNumber('424242424');
      return assert.equal(topic, false);
    });
    it('should fail with non-digits', function() {
      var topic;
      topic = $.payment.validateCardNumber('4242424e42424241');
      return assert.equal(topic, false);
    });
    return it('should validate for all card types', function() {
      assert($.payment.validateCardNumber('6759649826438453'), 'maestro');
      assert($.payment.validateCardNumber('6007220000000004'), 'forbrugsforeningen');
      assert($.payment.validateCardNumber('5019717010103742'), 'dankort');
      assert($.payment.validateCardNumber('4111111111111111'), 'visa');
      assert($.payment.validateCardNumber('4012888888881881'), 'visa');
      assert($.payment.validateCardNumber('4222222222222'), 'visa');
      assert($.payment.validateCardNumber('4462030000000000'), 'visa');
      assert($.payment.validateCardNumber('4484070000000000'), 'visa');
      assert($.payment.validateCardNumber('5555555555554444'), 'mastercard');
      assert($.payment.validateCardNumber('5454545454545454'), 'mastercard');
      assert($.payment.validateCardNumber('2221000002222221'), 'mastercard');
      assert($.payment.validateCardNumber('378282246310005'), 'amex');
      assert($.payment.validateCardNumber('371449635398431'), 'amex');
      assert($.payment.validateCardNumber('378734493671000'), 'amex');
      assert($.payment.validateCardNumber('30569309025904'), 'dinersclub');
      assert($.payment.validateCardNumber('38520000023237'), 'dinersclub');
      assert($.payment.validateCardNumber('36700102000000'), 'dinersclub');
      assert($.payment.validateCardNumber('36148900647913'), 'dinersclub');
      assert($.payment.validateCardNumber('6011111111111117'), 'discover');
      assert($.payment.validateCardNumber('6011000990139424'), 'discover');
      assert($.payment.validateCardNumber('6271136264806203568'), 'unionpay');
      assert($.payment.validateCardNumber('6236265930072952775'), 'unionpay');
      assert($.payment.validateCardNumber('6204679475679144515'), 'unionpay');
      assert($.payment.validateCardNumber('6216657720782466507'), 'unionpay');
      assert($.payment.validateCardNumber('3530111333300000'), 'jcb');
      return assert($.payment.validateCardNumber('3566002020360505'), 'jcb');
    });
  });
  describe('Validating a CVC', function() {
    it('should fail if is empty', function() {
      var topic;
      topic = $.payment.validateCardCVC('');
      return assert.equal(topic, false);
    });
    it('should pass if is valid', function() {
      var topic;
      topic = $.payment.validateCardCVC('123');
      return assert.equal(topic, true);
    });
    it('should fail with non-digits', function() {
      var topic;
      topic = $.payment.validateCardNumber('12e');
      return assert.equal(topic, false);
    });
    it('should fail with less than 3 digits', function() {
      var topic;
      topic = $.payment.validateCardNumber('12');
      return assert.equal(topic, false);
    });
    return it('should fail with more than 4 digits', function() {
      var topic;
      topic = $.payment.validateCardNumber('12345');
      return assert.equal(topic, false);
    });
  });
  describe('Validating an expiration date', function() {
    it('should fail expires is before the current year', function() {
      var currentTime, topic;
      currentTime = new Date();
      topic = $.payment.validateCardExpiry(currentTime.getMonth() + 1, currentTime.getFullYear() - 1);
      return assert.equal(topic, false);
    });
    it('that expires in the current year but before current month', function() {
      var currentTime, topic;
      currentTime = new Date();
      topic = $.payment.validateCardExpiry(currentTime.getMonth(), currentTime.getFullYear());
      return assert.equal(topic, false);
    });
    it('that has an invalid month', function() {
      var currentTime, topic;
      currentTime = new Date();
      topic = $.payment.validateCardExpiry(13, currentTime.getFullYear());
      return assert.equal(topic, false);
    });
    it('that is this year and month', function() {
      var currentTime, topic;
      currentTime = new Date();
      topic = $.payment.validateCardExpiry(currentTime.getMonth() + 1, currentTime.getFullYear());
      return assert.equal(topic, true);
    });
    it('that is just after this month', function() {
      var currentTime, topic;
      currentTime = new Date();
      topic = $.payment.validateCardExpiry(currentTime.getMonth() + 1, currentTime.getFullYear());
      return assert.equal(topic, true);
    });
    it('that is after this year', function() {
      var currentTime, topic;
      currentTime = new Date();
      topic = $.payment.validateCardExpiry(currentTime.getMonth() + 1, currentTime.getFullYear() + 1);
      return assert.equal(topic, true);
    });
    it('that is a two-digit year', function() {
      var currentTime, topic;
      currentTime = new Date();
      topic = $.payment.validateCardExpiry(currentTime.getMonth() + 1, ('' + currentTime.getFullYear()).slice(0, 2));
      return assert.equal(topic, true);
    });
    it('that is a two-digit year in the past (i.e. 1990s)', function() {
      var currentTime, topic;
      currentTime = new Date();
      topic = $.payment.validateCardExpiry(currentTime.getMonth() + 1, 99);
      return assert.equal(topic, false);
    });
    it('that has string numbers', function() {
      var currentTime, topic;
      currentTime = new Date();
      currentTime.setFullYear(currentTime.getFullYear() + 1, currentTime.getMonth() + 2);
      topic = $.payment.validateCardExpiry(currentTime.getMonth() + 1 + '', currentTime.getFullYear() + '');
      return assert.equal(topic, true);
    });
    it('that has non-numbers', function() {
      var topic;
      topic = $.payment.validateCardExpiry('h12', '3300');
      return assert.equal(topic, false);
    });
    it('should fail if year or month is NaN', function() {
      var topic;
      topic = $.payment.validateCardExpiry('12', 0/0);
      return assert.equal(topic, false);
    });
    return it('should support year shorthand', function() {
      return assert.equal($.payment.validateCardExpiry('05', '20'), true);
    });
  });
  describe('Validating a CVC number', function() {
    it('should validate a three digit number with no card type', function() {
      var topic;
      topic = $.payment.validateCardCVC('123');
      return assert.equal(topic, true);
    });
    it('should validate a three digit number with card type amex', function() {
      var topic;
      topic = $.payment.validateCardCVC('123', 'amex');
      return assert.equal(topic, true);
    });
    it('should validate a three digit number with card type other than amex', function() {
      var topic;
      topic = $.payment.validateCardCVC('123', 'visa');
      return assert.equal(topic, true);
    });
    it('should not validate a four digit number with a card type other than amex', function() {
      var topic;
      topic = $.payment.validateCardCVC('1234', 'visa');
      return assert.equal(topic, false);
    });
    it('should validate a four digit number with card type amex', function() {
      var topic;
      topic = $.payment.validateCardCVC('1234', 'amex');
      return assert.equal(topic, true);
    });
    return it('should not validate a number larger than 4 digits', function() {
      var topic;
      topic = $.payment.validateCardCVC('12344');
      return assert.equal(topic, false);
    });
  });
  describe('Parsing an expiry value', function() {
    it('should parse string expiry', function() {
      var topic;
      topic = $.payment.cardExpiryVal('03 / 2025');
      return assert.deepEqual(topic, {
        month: 3,
        year: 2025
      });
    });
    it('should support shorthand year', function() {
      var topic;
      topic = $.payment.cardExpiryVal('05/04');
      return assert.deepEqual(topic, {
        month: 5,
        year: 2004
      });
    });
    return it('should return NaN when it cannot parse', function() {
      var topic;
      topic = $.payment.cardExpiryVal('05/dd');
      return assert(isNaN(topic.year));
    });
  });
  describe('Getting a card type', function() {
    it('should return Visa that begins with 40', function() {
      var topic;
      topic = $.payment.cardType('4012121212121212');
      return assert.equal(topic, 'visa');
    });
    it('that begins with 2 should return MasterCard', function() {
      var topic;
      topic = $.payment.cardType('2221000002222221');
      return assert.equal(topic, 'mastercard');
    });
    it('that begins with 5 should return MasterCard', function() {
      var topic;
      topic = $.payment.cardType('5555555555554444');
      return assert.equal(topic, 'mastercard');
    });
    it('that begins with 34 should return American Express', function() {
      var topic;
      topic = $.payment.cardType('3412121212121212');
      return assert.equal(topic, 'amex');
    });
    it('that is not numbers should return null', function() {
      var topic;
      topic = $.payment.cardType('aoeu');
      return assert.equal(topic, null);
    });
    it('that has unrecognized beginning numbers should return null', function() {
      var topic;
      topic = $.payment.cardType('aoeu');
      return assert.equal(topic, null);
    });
    return it('should return correct type for all test numbers', function() {
      assert.equal($.payment.cardType('6759649826438453'), 'maestro');
      assert.equal($.payment.cardType('6220180012340012345'), 'maestro');
      assert.equal($.payment.cardType('6007220000000004'), 'forbrugsforeningen');
      assert.equal($.payment.cardType('5019717010103742'), 'dankort');
      assert.equal($.payment.cardType('4111111111111111'), 'visa');
      assert.equal($.payment.cardType('4012888888881881'), 'visa');
      assert.equal($.payment.cardType('4222222222222'), 'visa');
      assert.equal($.payment.cardType('4462030000000000'), 'visa');
      assert.equal($.payment.cardType('4484070000000000'), 'visa');
      assert.equal($.payment.cardType('5555555555554444'), 'mastercard');
      assert.equal($.payment.cardType('5454545454545454'), 'mastercard');
      assert.equal($.payment.cardType('2221000002222221'), 'mastercard');
      assert.equal($.payment.cardType('378282246310005'), 'amex');
      assert.equal($.payment.cardType('371449635398431'), 'amex');
      assert.equal($.payment.cardType('378734493671000'), 'amex');
      assert.equal($.payment.cardType('30569309025904'), 'dinersclub');
      assert.equal($.payment.cardType('38520000023237'), 'dinersclub');
      assert.equal($.payment.cardType('36700102000000'), 'dinersclub');
      assert.equal($.payment.cardType('36148900647913'), 'dinersclub');
      assert.equal($.payment.cardType('6011111111111117'), 'discover');
      assert.equal($.payment.cardType('6011000990139424'), 'discover');
      assert.equal($.payment.cardType('6271136264806203568'), 'unionpay');
      assert.equal($.payment.cardType('6236265930072952775'), 'unionpay');
      assert.equal($.payment.cardType('6204679475679144515'), 'unionpay');
      assert.equal($.payment.cardType('6216657720782466507'), 'unionpay');
      assert.equal($.payment.cardType('3530111333300000'), 'jcb');
      return assert.equal($.payment.cardType('3566002020360505'), 'jcb');
    });
  });
  describe('Extending the card collection', function() {
    it('should expose an array of standard card types', function() {
      var card, cards, i, len, visa;
      cards = $.payment.cards;
      assert(Array.isArray(cards));
      for (i = 0, len = cards.length; i < len; i++) {
        card = cards[i];
        if (card.type === 'visa') {
          visa = card;
        }
      }
      return assert.notEqual(visa, null);
    });
    return it('should support new card types', function() {
      var wing, wingCard;
      wing = {
        type: 'wing',
        patterns: [501818],
        length: [16],
        luhn: false
      };
      $.payment.cards.unshift(wing);
      wingCard = '5018 1818 1818 1818';
      assert.equal($.payment.cardType(wingCard), 'wing');
      return assert.equal($.payment.validateCardNumber(wingCard), true);
    });
  });
  describe('formatCardNumber', function() {
    it('should format cc number correctly', function(done) {
      var $number, e;
      $number = $('<input type=text>').payment('formatCardNumber');
      $number.val('4242').prop('selectionStart', 4);
      e = $.Event('keypress');
      e.which = 52;
      $number.trigger(e);
      return setTimeout(function() {
        assert.equal($number.val(), '4242 4');
        return done();
      });
    });
    it('should format amex cc number correctly', function(done) {
      var $number, e;
      $number = $('<input type=text>').payment('formatCardNumber');
      $number.val('3782').prop('selectionStart', 4);
      e = $.Event('keypress');
      e.which = 56;
      $number.trigger(e);
      return setTimeout(function() {
        assert.equal($number.val(), '3782 8');
        return done();
      });
    });
    return it('should format full-width cc number correctly', function(done) {
      var $number, e;
      $number = $('<input type=text>').payment('formatCardNumber');
      $number.val('\uff14\uff12\uff14\uff12');
      e = $.Event('input');
      $number.trigger(e);
      return setTimeout(function() {
        assert.equal($number.val(), '4242');
        return done();
      });
    });
  });
  return describe('formatCardExpiry', function() {
    it('should format month shorthand correctly', function(done) {
      var $expiry, e;
      $expiry = $('<input type=text>').payment('formatCardExpiry');
      $expiry.val('');
      e = $.Event('keypress');
      e.which = 52;
      $expiry.trigger(e);
      return setTimeout(function() {
        assert.equal($expiry.val(), '04 / ');
        return done();
      });
    });
    it('should format forward slash shorthand correctly', function(done) {
      var $expiry, e;
      $expiry = $('<input type=text>').payment('formatCardExpiry');
      $expiry.val('1');
      e = $.Event('keypress');
      e.which = 47;
      $expiry.trigger(e);
      return setTimeout(function() {
        assert.equal($expiry.val(), '01 / ');
        return done();
      });
    });
    it('should only allow numbers', function(done) {
      var $expiry, e;
      $expiry = $('<input type=text>').payment('formatCardExpiry');
      $expiry.val('1');
      e = $.Event('keypress');
      e.which = 100;
      $expiry.trigger(e);
      return setTimeout(function() {
        assert.equal($expiry.val(), '1');
        return done();
      });
    });
    it('should format full-width expiry correctly', function(done) {
      var $expiry, e;
      $expiry = $('<input type=text>').payment('formatCardExpiry');
      $expiry.val('\uff10\uff18\uff11\uff15');
      e = $.Event('input');
      $expiry.trigger(e);
      return setTimeout(function() {
        assert.equal($expiry.val(), '08 / 15');
        return done();
      });
    });
    it('should format month expiry correctly when val is past 12', function(done) {
      var $expiry, e;
      $expiry = $('<input type=text>').payment('formatCardExpiry');
      $expiry.val('1');
      e = $.Event('keypress');
      e.which = 52;
      $expiry.trigger(e);
      return setTimeout(function() {
        assert.equal($expiry.val(), '01 / 4');
        return done();
      });
    });
    return it('should format month expiry corrrectly for 0 followed by single digit > 2', function(done) {
      var $expiry, e;
      $expiry = $('<input type=text>').payment('formatCardExpiry');
      $expiry.val('0');
      e = $.Event('keypress');
      e.which = 53;
      $expiry.trigger(e);
      return setTimeout(function() {
        assert.equal($expiry.val(), '05 / ');
        return done();
      });
    });
  });
});

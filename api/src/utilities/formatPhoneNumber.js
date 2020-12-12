function formatPhoneNumber(phoneNumber) {
  let formattedPhone = phoneNumber.replace(/\s/g, '');

  if (formattedPhone.length > 10) {
    formattedPhone = [
      formattedPhone.substring(0, 2),
      formattedPhone.substring(2, 6),
      formattedPhone.substring(6, 9),
      formattedPhone.substring(9, 12),
    ].join(' ');
  } else {
    formattedPhone = [
      formattedPhone.substring(0, 4),
      formattedPhone.substring(4, 7),
      formattedPhone.substring(7, 10),
    ].join(' ');
  }

  return formattedPhone;
}

module.exports = formatPhoneNumber;
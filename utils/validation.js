function isValidEmail (email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
  return emailRegex.test(email);
}; 

function isValidName (name) {
  return typeof name === 'string' && name.length >= 3;
};

function isValidNumericId (id, users, userId) {
  const userIdSome = users.some(user => user.id === id);
  return typeof id === 'number' && (!userIdSome || (userIdSome &&  id === userId)); 
};

function validateUser (user, users) {
  const { name, email, id } = user;

  if (!isValidName(name)) {
    return {
      isValid: false,
      error: 'El nombre debe tener el menos 3 carateres'
    };
  };

  if (!isValidEmail(email)) {
    return {
      isValid: false,
      error: 'El correo electrónico no es valido'
    }
  };

  if (!isValidNumericId(id, users)) {
    return {
      isValid: false,
      error: 'El Id debe ser numérico y único'
    }
  };

  return { isValid: true }; 
};

module.exports = {
  isValidEmail,
  isValidName,
  isValidNumericId,
  validateUser
}; 
// Supported Error Translations Dictionary
// Can be expanded as needed.
const localeDictionary = {
  hi: { // Python / Django style fallback logic translated to Hindi
    UNAUTHORIZED: 'aap is sansaadhan tak pahunchne ke lie adhikृत nahi hain.',
    CONFLICT: 'pehle se maujud hai.',
    INTERNAL_SERVER_ERROR: 'server par ek apratyashit truti aai hai.',
    FORBIDDEN: 'aapko is sansaadhan tak pahunchne ki anumati nahi hai.',
    NOT_FOUND: 'anurodhit sansaadhan nahi mila.',
    METHOD_NOT_ALLOWED: 'isme upyog kiya gaya HTTP method swikaarya nahi hai.',
    INVALID_INPUT: 'pradaan kiya gaya input amaanya hai.',
    MISSING_FIELDS: 'anurodh mein aavashyak fields gayab hain.',
    EMAIL_ALREADY_EXISTS: 'is email ke sath ek account pehle se maujud hai.',
    USER_NOT_FOUND: 'pradaan kiye gaye vivaran ke sath koee upayogakarta nahi mila.',
    BAD_REQUEST: 'anurodh kharab hai ya isme amaanya data hai.',
    TOO_MANY_REQUESTS: 'aapne thode samay mein bahut adhik anurodh kiye hain. kripya baad mein prayas karein.',
    // ... add more as required ...
  },
  es: { // Spanish
    UNAUTHORIZED: 'No está autorizado para acceder a este recurso.',
    CONFLICT: 'Ya existe.',
    INTERNAL_SERVER_ERROR: 'Ocurrió un error inesperado en el servidor.',
    FORBIDDEN: 'No tiene permiso para acceder a este recurso.',
    NOT_FOUND: 'No se pudo encontrar el recurso solicitado.',
    METHOD_NOT_ALLOWED: 'El método HTTP utilizado no está permitido para este endpoint.',
    INVALID_INPUT: 'La entrada proporcionada no es válida.',
    MISSING_FIELDS: 'Faltan campos obligatorios en la solicitud.',
    EMAIL_ALREADY_EXISTS: 'Ya existe una cuenta con este correo electrónico.',
    USER_NOT_FOUND: 'No se encontró ningún usuario con los detalles proporcionados.',
    BAD_REQUEST: 'La solicitud está mal formada o contiene datos no válidos.',
    TOO_MANY_REQUESTS: 'Ha realizado demasiadas solicitudes en un corto período de tiempo. Por favor, inténtelo de nuevo más tarde.',
  },
  fr: { // French
    UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette ressource.',
    CONFLICT: 'Existe déjà.',
    INTERNAL_SERVER_ERROR: 'Une erreur inattendue s\'est produite sur le serveur.',
    FORBIDDEN: 'Vous n\'avez pas la permission d\'accéder à cette ressource.',
    NOT_FOUND: 'La ressource demandée est introuvable.',
    METHOD_NOT_ALLOWED: 'La méthode HTTP utilisée n\'est pas autorisée pour ce endpoint.',
    INVALID_INPUT: 'L\'entrée fournie n\'est pas valide.',
    MISSING_FIELDS: 'Des champs obligatoires sont manquants dans la requête.',
    EMAIL_ALREADY_EXISTS: 'Un compte avec cet e-mail existe déjà.',
    USER_NOT_FOUND: 'Aucun utilisateur trouvé avec les détails fournis.',
    BAD_REQUEST: 'La requête est mal formée ou contient des données non valides.',
    TOO_MANY_REQUESTS: 'Vous avez effectué trop de requêtes en peu de temps. Veuillez réessayer plus tard.',
  }
};

/**
 * Translates an error message automatically to the configured language if available.
 * 
 * @param {string} errorKey - The error code/key (e.g. 'NOT_FOUND')
 * @param {string} originalMessage - Fallback/English message
 * @param {string} language - Target language code ('en', 'hi', 'es')
 * @returns {string} - Translated message or the original one if translation isn't available
 */
const translateError = (errorKey, originalMessage, language = 'en') => {
  if (language === 'en' || !localeDictionary[language]) {
    return originalMessage;
  }
  
  const translated = localeDictionary[language][errorKey];
  return translated || originalMessage;
};

module.exports = { translateError, localeDictionary };

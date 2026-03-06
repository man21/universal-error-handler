const { translateError } = require('../src/i18n');

describe('I18n Translation Support', () => {

  it('should return original message when language is English (en)', () => {
    const errorMsg = translateError('NOT_FOUND', 'User not found in the DB', 'en');
    expect(errorMsg).toBe('User not found in the DB');
  });

  it('should return translated Hindi message when key exists', () => {
    const fallbackMessage = 'Does not matter because key exists';
    const translatedMsg = translateError('NOT_FOUND', fallbackMessage, 'hi');
    expect(translatedMsg).toBe('anurodhit sansaadhan nahi mila.');
  });

  it('should return fallback message if hindi translation key missing', () => {
    const fallbackMessage = 'Unique constraint failed';
    const translatedMsg = translateError('PRISMA_ERR_P2002', fallbackMessage, 'hi');
    expect(translatedMsg).toBe(fallbackMessage); // Defaults to english/fallback since it's not mapped
  });

  it('should return translated Spanish message', () => {
    const translatedMsg = translateError('INTERNAL_SERVER_ERROR', 'Internal error', 'es');
    expect(translatedMsg).toBe('Ocurrió un error inesperado en el servidor.');
  });
  
});

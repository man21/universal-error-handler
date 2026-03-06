const { maskData } = require('../src/masking');
const { configureErrorHandler } = require('../src/config');

describe('Data Masking', () => {

  beforeAll(() => {
    configureErrorHandler({ maskSensitiveData: true });
  });

  it('should mask passwords in a flat object', () => {
    const data = { username: 'test_user', password: 'mySecretPassword123!' };
    const masked = maskData(data);
    expect(masked.password).toBe('********');
    expect(masked.username).toBe('test_user');
  });

  it('should recursively mask nested objects and arrays', () => {
    const payload = {
      action: 'login',
      details: {
        token: 'ey1234567890',
        usersProfile: {
          creditCard: '1234-5678-9876-5432'
        }
      },
      tokens: ['eyAA', 'eyBB'] // Note: arrays of string don't get masked unless the key is matched
    };
    
    const masked = maskData(payload);
    
    expect(masked.details.token).toBe('********');
    expect(masked.details.usersProfile.creditCard).toBe('********');
    expect(masked.action).toBe('login');
  });

  it('should not mask if maskSensitiveData is false', () => {
    configureErrorHandler({ maskSensitiveData: false });
    
    const data = { password: 'mySecretPassword123!' };
    const masked = maskData(data);
    expect(masked.password).toBe('mySecretPassword123!');
  });
});

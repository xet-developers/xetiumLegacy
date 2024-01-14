import { Validator } from '../misc/Validator';

describe('Validator', () => {
    // Test cases for validateUserName
    test('validateUserName returns false for too short usernames', () => {
        expect(Validator.validateUserName('Abc')).toBe(false);
    });

    test('validateUserName returns false for too long usernames', () => {
        expect(Validator.validateUserName('A'.repeat(21))).toBe(false);
    });

    // Test cases for validateEmail
    test('validateEmail returns false for email without domain', () => {
        expect(Validator.validateEmail('test@')).toBe(false);
    });

    test('validateEmail returns false for email with invalid characters', () => {
        expect(Validator.validateEmail('test@test@domain.com')).toBe(false);
    });

    // Test cases for validatePassword
    test('validatePassword returns false for password without digits', () => {
        expect(Validator.validatePassword('Password')).toBe(false);
    });

    test('validatePassword returns false for password without letters', () => {
        expect(Validator.validatePassword('1234567')).toBe(false);
    });

    // Test cases for validateRepeatPassword
    test('validateRepeatPassword returns false when passwords do not match', () => {
        expect(Validator.validateRepeatPassword('password', 'different')).toBe(false);
    });

    // Тестирование метода validateNameProject
    test('validateNameProject returns true for valid project names', () => {
        expect(Validator.validateNameProject('ValidProject1')).toBe(true);
    });

    test('validateNameProject returns false for invalid project names', () => {
        expect(Validator.validateNameProject('1InvalidProject')).toBe(false);
    });

    // Тестирование метода validateUrlProject
    test('validateUrlProject returns true for valid URLs', () => {
        expect(Validator.validateUrlProject('https://www.example.com')).toBe(true);
    });

    test('validateUrlProject returns false for invalid URLs', () => {
        expect(Validator.validateUrlProject('invalid-url')).toBe(false);
    });

    // Тестирование метода validateDescProject
    test('validateDescProject returns true for valid project descriptions', () => {
        expect(Validator.validateDescProject(100)).toBe(true);
    });

    test('validateDescProject returns false for invalid project descriptions', () => {
        expect(Validator.validateDescProject(200)).toBe(false);
    });

    // Тестирование метода validateStartDate
    test('validateStartDate returns false for future dates', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1); // Установим дату на один день вперед
        expect(Validator.validateStartDate(futureDate.toISOString().split('T')[0])).toBe(false);
    });

    test('validateStartDate returns true for past dates', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1); // Установим дату на один день назад
        expect(Validator.validateStartDate(pastDate.toISOString().split('T')[0])).toBe(true);
    });

    // Тестирование метода validateEndDate
    test('validateEndDate returns true for dates between start date and now', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-02');
        expect(Validator.validateEndDate(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])).toBe(true);
    });

    test('validateEndDate returns false for end date before start date', () => {
        const startDate = new Date('2024-01-02');
        const endDate = new Date('2024-01-01');
        expect(Validator.validateEndDate(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])).toBe(false);
    });

    // Тестирование метода validateInputValue
    test('validateInputValue returns true for valid input values', () => {
        expect(Validator.validateInputValue('value1, value2')).toBe(true);
    });

    test('validateInputValue returns false for invalid input values', () => {
        expect(Validator.validateInputValue('')).toBe(false);
        expect(Validator.validateInputValue('value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12, value13, value14, value15, value16')).toBe(false);
    });

    // Тестирование метода validateInputValueClustering
    test('validateInputValueClustering returns true for valid input values', () => {
        expect(Validator.validateInputValueClustering('value1, value2, value3, value4')).toBe(true);
    });

    test('validateInputValueClustering returns false for invalid input values', () => {
        expect(Validator.validateInputValueClustering('')).toBe(false);
        expect(Validator.validateInputValueClustering('value1, value2')).toBe(false);
    });
});
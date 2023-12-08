const { isValid } = require('postcode');

const validateRegistration = (formData) => {
    const errors = {};

    const validateRequired = (field, fieldName) => {
        if (!field.trim()) {
            errors[fieldName] = {
                text: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`,
                href: `#${fieldName}`,
            };
        }
    };

    const validatePostcode = (postcode) => {
        if (!isValid(postcode)) {
            errors['postcode'] = {
                text: 'Enter a full UK postcode',
                href: '#postcode',
            };
        }
    };

    const validatePassword = (password, confirmPassword) => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        if (password && !password.match(passwordPattern)) {
            errors['password'] = {
                text: 'Enter a password in the correct format',
                href: '#password',
            };
        }
        if (password && password !== confirmPassword) {
            errors['confirmpassword'] = {
                text: 'Passwords do not match',
                href: '#confirmpassword',
            };
        }
    };

    const username = formData.username;
    const city = formData.city;
    const county = formData.county;
    const postcode = formData.postcode;
    const password = formData.password;
    const confirmPassword = formData.confirmpassword;

    validateRequired(username, 'username');
    validateRequired(city, 'city');
    validateRequired(county, 'county');
    validateRequired(postcode, 'postcode');
    validateRequired(password, 'password');

	validatePostcode(postcode);

	validatePassword(password, confirmPassword);

    return errors;
};

module.exports = validateRegistration;
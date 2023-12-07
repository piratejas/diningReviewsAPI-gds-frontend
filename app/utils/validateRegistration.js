const { isValid } = require('postcode');

const validateRegistration = (formData) => {
    const errors = [];

    const validateRequired = (field, fieldName) => {
        if (!field.trim()) {
            errors.push({
                text: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`,
                href: `#${fieldName}`,
            });
        }
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{12,}$/;
        if (!password.match(passwordPattern)) {
            errors.push({
                text: 'Your password must be at least 12 characters and contain at least one number, lowercase letter, uppercase letter and special character',
                href: '#password',
            });
        }
    };

	const validatepostcode = (postcode) => {
		if (!isValid(postcode)) {
			errors.push({
				text: 'Enter a full UK postcode in the correct format',
				href: '#postcode'
			})
		}
	}

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

	validatepostcode(postcode);

	validatePassword(password);
    
	if (password !== confirmPassword) {
        errors.push({
            text: 'Passwords do not match',
            href: '#confirmpassword',
        });
    }

    return errors;
};

module.exports = validateRegistration;
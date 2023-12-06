const { admin } = require('../utils/axiosConfig');

const getPendingReviews = async () => {
	return await admin.get('/reviews');
}

module.exports = {
	getPendingReviews,
}
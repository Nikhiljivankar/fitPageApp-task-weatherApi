const metaData={
	totalItems: 1,
	perPage: 1, 
	currentPage: 1,
	firstPage: 1,
	lstPage: 1
}
const SuccessResponse = (items = null, records = 0, message = 'Completed', status = 200, meta = metaData) => ({
	success: true,
	status: status,
	message,
	records, 
	items, 
	meta
});

module.exports = SuccessResponse;

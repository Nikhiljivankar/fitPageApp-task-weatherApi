const metaData = (totalItems= 1, perPage= 20, currentPage= 1, lastPage= 1, firstPage= 1) => ({
        totalItems,
        perPage: parseInt(perPage), 
        currentPage,
        firstPage,
        lastPage : (lastPage == 1 &&  parseInt(perPage) < 20)? (totalItems/parseInt(perPage)) : lastPage
});

module.exports = metaData;

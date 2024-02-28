const paginate =(page, limit) => {
    const Page = page * 1 || 1;
    const Limit = limit * 1 || 20;
    const skip = (Page - 1) * Limit;
    return skip;
}
module.exports = paginate;
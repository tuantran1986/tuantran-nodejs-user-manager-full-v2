const productModel = require("../models/productModel");


// 1. LIST PRODUCT:
module.exports.getAllProduct = async (req, res, next) => {

    // "truy vấn dữ liệu" - trong DATABASE = FIND - nhớ: "ASYNC - AWAIT"
    const productList = await productModel.find({});
    console.log('========= productList : ', productList);

    res.render('products/index', {
        productList : productList
    })
};

// 2. PHAN TRANG:
module.exports.paginationProduct = async (req, res, next) => {

    // 
    const page = req.query?.page || 1;
    const rowPerPage = 8;

    // 
    const skip = rowPerPage * ( page - 1);
    const limit = rowPerPage;

    // "truy vấn dữ liệu" - trong DATABASE = FIND - nhớ: "ASYNC - AWAIT"
    const productList = await productModel.find({}).skip(skip).limit(limit);
    console.log('========= page : ', page);
    console.log('========= productList : ', productList);

    // "đếm số lượng phần tử" - tạo "pagination"
    const countDocuments = await productModel.countDocuments({});

    const countPages = Math.ceil(countDocuments/rowPerPage) || 1;       // Math.ceil: làm tròn "LÊN" = số nguyên
    // const countPages = Math.floor(countDocuments/rowPerPage) || 1;   // Math.floor: làm tròn "XUỐNG" = số nguyên
    console.log('countPages = ', countPages);

    const queryParams = {
        countPages: countPages,
        currentPage: page || 1
    }

    // 
    res.render('products/pagination', {
        productList : productList || [],
        queryParams: queryParams
    });
};

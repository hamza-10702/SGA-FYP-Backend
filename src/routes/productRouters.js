const express = require("express");
const router = new express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");

router.post("/product", async (request, response) => {
  try {
    if(request.body.ProductName !== undefined){
    const product = new Product(request.body);
    const createProduct = await product.save();
    response.status(201).json(createProduct);
}
else{
    response.status(201).json("Object is Empty");
}
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/product", async (request, response) => {
  try {
    const product = await Product.find();
    response.status(200).json(product);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/getSearchProduct", async (request, response) => {
  try {
    const product = await Product.find();
    var filterData = [];
    let productArray = request.body;
    const myArray = productArray.productsSearch.split(",");
    for (let i=0; i < myArray.length; i++) {
      myArray[i] = myArray[i].trim();
      filterData.push(product.find(x=>x.ProductName == myArray[i]));
    }
    for (let i=0; i < filterData.length; i++) {
      if(filterData[i].priceItemOne < filterData[i].priceItemTwo && filterData[i].priceItemOne < filterData[i].priceItemThree){
        filterData[i].lowestPriceItemOne = filterData[i].priceItemOne;
      }
      else if(filterData[i].priceItemTwo < filterData[i].priceItemOne && filterData[i].priceItemTwo < filterData[i].priceItemThree){
        filterData[i].lowestPriceItemTwo = filterData[i].priceItemTwo;
      }
      else if(filterData[i].priceItemThree < filterData[i].priceItemOne && filterData[i].priceItemThree < filterData[i].priceItemTwo){
        filterData[i].lowestPriceItemThree = filterData[i].priceItemThree;
      }
    }
  response.status(200).json(filterData);
    
  } catch (error) {
    response.status(200).json("Your Request not Acceptable");
  }
});

//// Code  ////
router.get("/product/:id", async (request, response) => {
  const _id = request.params.id;
  const product = await Product.findById(_id);
  if (product !== null) {
    response.json(product);
  } else {
    response.status(400).json("Not Find");
  }
});

router.put("/product/:id", async (request, response) => {
  try {
    const _id = request.params.id;
    const product = await Product.findByIdAndUpdate(_id, request.body, {
      new: true,
    });
    response.json(product);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.delete("/product/:id", async (request, response) => {
    const _id = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return response.status(400).json("Product not existed");
    }
    else{
        await Product.findByIdAndDelete(_id);
        response.status(200).json("Product has been deleted");
       
    }
}

);

router.get("/productfinal", async (request, response) => {
    const { featured, company, name, sort, fields, numericFilters } = request.query;
    const queryObject = {};
    if (featured) {
      queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: 'i' };
    }
    if (numericFilters) {
      const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ['price', 'rating'];
      filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }
  
    let result = Product.find(queryObject);
    // sort
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }
  
    if (fields) {
      const fieldsList = fields.split(',').join(' ');
      result = result.select(fieldsList);
    }
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    result = result.skip(skip).limit(limit);
    // 23
    // 4 7 7 7 2
  
    const products = await result;
    response.status(200).json({ products, nbHits: products.length });
  }

);


module.exports = router;

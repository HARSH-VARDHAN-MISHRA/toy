import React, { useState } from 'react';
import './Createproduct.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateProducts = () => {
  const [formdata, setFormdata] = useState({
    ProductName: "",
    ProductDescription: "",

    prices: "",
    tag: "",
    sizes: [{ SizeNumber: "", StockNumber: "", StockPrice: "" }],
    color: "",
    image: "",
    inStock: true,
    category: "",
    keyword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      // Convert the comma-separated string to an array
      const imageArray = value.split(',').map(img => img.trim());

      setFormdata((prevFormData) => ({
        ...prevFormData,
        [name]: imageArray,
      }));
    } else {
      setFormdata((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      // Update adjusted prices based on the discount percentage
      if (name === 'discountPrice') {
        updateAdjustedPrices(value);
      }
    }
  };

  const updateAdjustedPrices = (discountPercentage) => {
    const updatedSizes = formdata.sizes.map((size) => {
      const price = parseFloat(size.StockPrice);
      const discount = parseFloat(discountPercentage);

      if (!isNaN(price) && !isNaN(discount)) {
        const discountedPrice = price - (price * discount) / 100;
        size.adjustedPrice = discountedPrice.toFixed(2);
      } else {
        size.adjustedPrice = ''; // Handle invalid input
      }

      return size;
    });

    setFormdata((prevData) => ({
      ...prevData,
      sizes: updatedSizes,
    }));
  };

  const handleAddSize = () => {
    setFormdata((prevFormData) => ({
      ...prevFormData,
      sizes: [...prevFormData.sizes, { SizeNumber: "", StockNumber: "", StockPrice: "" }],
    }));
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSizes = [...formdata.sizes];
    updatedSizes[index] = { ...updatedSizes[index], [name]: value };

    // Check if the changed input is "StockNumber" and if the value is empty
    if (name === 'StockNumber' && value.trim() === '') {
      // Clear the adjustedPrice when the "Price" input is empty
      updatedSizes[index].adjustedPrice = '';
    }

    setFormdata((prevFormData) => ({
      ...prevFormData,
      sizes: updatedSizes,
    }));
  };


  const handleRemoveSize = (index) => {
    const updatedSizes = [...formdata.sizes];
    updatedSizes.splice(index, 1);
    setFormdata((prevFormData) => ({
      ...prevFormData,
      sizes: updatedSizes,
    }));
  };

  const token = sessionStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    try {
      const response = await axios.post(
        'https://toysbackend.onrender.com/api/v1/create-product',
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success('Product Added Successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add product');
    }
  }

  return (
    <div className="container mt-5">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>

        <div className="w-100 d-flex gap-2">
          <div className="mb-3 w-50">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formdata.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="DIAMOND">DIAMOND</option>
              <option value="ETERNAL">ETERNAL</option>
              <option value="GALAXY">GALAXY</option>
              <option value="GALYA">GALYA</option>
              <option value="LOUNGE">LOUNGE</option>
              <option value="LYONESSE">LYONESSE</option>
              <option value="PERA">PERA</option>
              <option value="PRESTO">PRESTO</option>
              <option value="QUANTUM">QUANTUM</option>
            </select>
          </div>
        </div>
        <div className="w-100 d-flex gap-2">

          <div className="mb-3 w-50">
            <label htmlFor="ProductName" className="form-label">Product Name</label>
            <input type="text" className="form-control " id="ProductName" name="ProductName" value={formdata.ProductName} onChange={handleChange} required />


          </div>
          <div className="mb-3 w-50">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <select
              className="form-select"
              id="tag"
              name="tag"
              value={formdata.tag}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a tag
              </option>
              <option value="Hot Product">Hot Product</option>
              <option value="Sell">Sell</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Trending">Trending</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>



        <div>
          <button type="button" className="btn btn-secondary mb-3" onClick={handleAddSize}>
            Add Size
          </button>

          {formdata.sizes.map((size, index) => (
            <div key={index}>
              <div className="mb-1 w-100 gap-2 d-flex">
                <div className="w-50">
                  <label htmlFor={`SizeNumber-${index}`} className="form-label">
                    SizeNumber
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`SizeNumber-${index}`}
                    name="SizeNumber"
                    value={size.SizeNumber}
                    onChange={(e) => handleSizeChange(index, e)}
                    required
                  />
                </div>
                <div className="w-50">
                  <label htmlFor={`StockPrice-${index}`} className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`StockPrice-${index}`}
                    name="StockPrice"
                    value={size.StockPrice}
                    onChange={(e) => handleSizeChange(index, e)}
                    required
                  />
                </div>
                <div className="w-50">
                  <label htmlFor={`StockNumber-${index}`} className="form-label">
                    Discount Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`StockNumber-${index}`}
                    name="StockNumber"
                    value={size.adjustedPrice !== undefined ? size.adjustedPrice : ''}
                    onChange={(e) => handleSizeChange(index, e)}
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveSize(index)}
              >
                Remove Size
              </button>
            </div>
          ))}

          <div className="w-100 d-flex gap-2">
            <div className="mb-3 w-50">
              <div className="mb-3">
                <label htmlFor="discountPrice" className="form-label">
                  Discount %
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="discountPrice"
                  name="discountPrice"

                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 d-flex gap-2">
          <div className="mb-3 w-50">
            <label htmlFor="image" className="form-label">Images (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={Array.isArray(formdata.image) ? formdata.image.join(', ') : formdata.image}
              onChange={handleChange}
              required
            />
          </div>     <div className="mb-3 w-50">
            <label htmlFor="keyword" className="form-label">Keyword</label>
            <input type="text" className="form-control" id="keyword" name="keyword" value={formdata.keyword} onChange={handleChange} required />
          </div>
        </div>

        <div>
          <label htmlFor="ProductDescription" className="form-label">Product Description</label>
          <textarea className="form-control" id="ProductDescription" name="ProductDescription" value={formdata.ProductDescription} onChange={handleChange} required />


        </div>
        <button type="submit" className="btn mt-2 px-5 btn-success">Submit</button>
      </form>
    </div>
  );
};

export default CreateProducts;

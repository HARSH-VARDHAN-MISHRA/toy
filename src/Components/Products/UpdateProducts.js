import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateProducts = () => {
  const { id ,name} = useParams();
  const [Product, setProduct] = useState([]);
  const [formdata, setFormdata] = useState({
    productName: "",
    Description: "",
    DiscountPrice: "", // New field for discount percentage
    price: "",
    Tag: "",
    image: "",
    category: "",
    Keyword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sizes") {
      // Handle the sizes array separately
      const updatedSizes = formdata.sizes.map((size, index) => {
        if (index === parseInt(value, 10)) {
          // Assuming value is the index of the size to be updated
          return { ...size, [name]: !size[name] }; // Toggle the value
        }
        return size;
      });

      setFormdata((prevFormData) => ({
        ...prevFormData,
        sizes: updatedSizes,
      }));
    } else {
      // For other fields, update as usual
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

  const token = sessionStorage.getItem('token');

  // const handleAddSize = () => {
  //   setFormdata((prevFormData) => ({
  //     ...prevFormData,
  //     sizes: [...prevFormData.sizes, { SizeNumber: "", StockNumber: 10 }],
  //   }));
  // };

  // const handleSizeChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedSizes = [...formdata.sizes];
  //   updatedSizes[index] = { ...updatedSizes[index], [name]: value };

  //   // Check if the changed input is "StockNumber" and if the value is empty
  //   if (name === 'StockNumber' && value.trim() === '') {
  //     // Clear the adjustedPrice when the "Price" input is empty
  //     updatedSizes[index].adjustedPrice = '';
  //   }

  //   setFormdata((prevFormData) => ({
  //     ...prevFormData,
  //     sizes: updatedSizes,
  //   }));
  // };

  // const handleRemoveSize = (index) => {
  //   const updatedSizes = [...formdata.sizes];
  //   updatedSizes.splice(index, 1);
  //   setFormdata((prevFormData) => ({
  //     ...prevFormData,
  //     sizes: updatedSizes,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    try {
      const response = await axios.post(
        `https://toysbackend.onrender.com/api/v1/Update-Product/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update product');
    }
  };

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `https://toysbackend.onrender.com/api/v1/single-product/${name}`
      );
      // console.log(response.data.data);
      setProduct(response.data.data);
      const productData = response.data.data;
      setFormdata({
        productName: productData.productName || "",
        Description: productData.Description || "",
        DiscountPrice: productData.DiscountPrice || "", // New field for discount percentage
        price: productData.price || "",
        Tag: productData.Tag || "",
        productImg: productData.productImg || "",
        // inStock: productData.inStock || "",
        Categorey: productData.Categorey || "",
        keyword: productData.Keyword || "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [id]);

  useEffect(() => {
    handleFetch();
  }, [id]);

  return (
    <div className="edit-product">
      <div className="Old-Product">
        {/* ... your existing Old-Product code ... */}
      </div>

      <div className="Edit-Product">
        <div className="product-add-heading">
          <h3>Edit-Products</h3>
        </div>
        <div className="forms-product">
          <form onSubmit={handleSubmit} className="form-main">
            {Object.keys(formdata).map((key) => (
              <div className="form-group" key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                  {key}
                </label>
                {key === "Description" ? (
                  <textarea
                    onChange={handleChange}
                    value={formdata[key]}
                    name={key}
                    rows="4"
                    className="form-control"
                  />
                ) : key === "inStock" ? (
                  <select onChange={handleChange} value={formdata[key]} name={key} className="form-select">
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                ) : key === "sizes" ? (
                  <>
                    <div className="form-control">
                      {formdata.sizes.map((size, index) => (
                        <div key={index} className="mb-3">
                          <label htmlFor={`SizeNumber-${index}`} className="form-label">Size Number</label>
                          <input type="text" className="form-control" id={`SizeNumber-${index}`} name="SizeNumber" value={size.SizeNumber} onChange={(e) => handleSizeChange(index, e)} required />

                          <label htmlFor={`StockPrice-${index}`} className="form-label">Stock Price</label>
                          <input type="text" className="form-control" id={`StockPrice-${index}`} name="StockPrice" value={size.StockPrice} onChange={(e) => handleSizeChange(index, e)} required />

                          <label className="form-label">Actual Price</label>
                          <div className="form-control">
                            {size.StockPrice ? `${parseFloat(size.StockPrice).toFixed(2)}` : 'N/A'}
                          </div>

                          <label className="form-label">Adjusted Price</label>
                          <div className="form-control">
                            {size.adjustedPrice ? `${parseFloat(size.adjustedPrice).toFixed(2)}` : 'N/A'}
                          </div>

                          <button type="button" className="btn btn-danger" onClick={() => handleRemoveSize(index)}>Remove Size</button>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="btn btn-secondary mb-3" onClick={handleAddSize}>Add Size</button>
                  </>
                ) : (
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formdata[key]}
                    name={key}
                    className="form-control"
                  />
                )}
              </div>
            ))}
            <div className="button-add">
              <button type="submit" className="btn btn-primary">Update Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProducts;
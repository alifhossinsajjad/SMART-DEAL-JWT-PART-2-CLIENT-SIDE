import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CreateAProduct = () => {
  const { user } = useAuth();
  // const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [productData, setProductData] = useState([]);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleCreateAProduct = (e) => {
    e.preventDefault();

    // setIsSubmitting(true);

    if (!user || !user.email) {
      toast.error("Please log in to create a product");

      // setIsSubmitting(false);
      return;
    }

    const newProductData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      image: e.target.image.value,
      seller_name: e.target.seller_name.value,
      seller_email: e.target.seller_email.value,
      seller_contact: e.target.seller_contact.value,
      target_url: e.target.target_url.value,
      location: e.target.location.value,
      features: e.target.features.value,
      price_min: parseFloat(e.target.price_min.value),
      price_max: parseFloat(e.target.price_max.value),
      email: user.email,
      created_at: new Date(),
    };

    // axios.post("http://localhost:3000/products", productData)
    //   .then((data) => {
    //     console.log(data.data);
    //     if (data.data.insertedId) {
    //       toast.success("Product added successfully!");
    //       e.target.reset();
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error adding product:", error);
    //     toast.error("Failed to add product. Please try again.");
    //   });

    // axiosInstance
    //   .post("/products", productData)
    //   .then((data) => {
    //     console.log(data.data);
    //     if (data.data.insertedId) {
    //       toast.success("🎉 Product created successfully!");
    //       e.target.reset();
    //       setImagePreview(""); // ✅ Now this will work
    //     }
    //     setIsSubmitting(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error adding product:", error);
    //     toast.error("❌ Failed to create product. Please try again.");
    //     setIsSubmitting(false);
    //   });

    axiosSecure
      .post("/products", newProductData)
      .then((data) => {
        console.log(data.data);
        if (data.data.insertedId) {
          toast.success(" Product created successfully!");
          e.target.reset();
          setImagePreview("");
          const newProducts = [...productData, newProductData];
          setProductData(newProducts);
        }
        // setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        toast.error("Failed to create product. Please try again.");
        // setIsSubmitting(false);
      });
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setImagePreview(url);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Required
          </h2>
          <p className="text-gray-600 mb-6">Please log in to create products</p>
          <button
            onClick={() => (window.location.href = "/auth/login")}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create A Product
          </h1>
          <p className="text-gray-600">Fill in your product details below</p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleCreateAProduct} className="space-y-8">
            {/* Row 1: Name & Category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Select a Category</option>
                  <option value="technology">Technology</option>
                  <option value="software">Software</option>
                  <option value="hardware">Hardware</option>
                  <option value="service">Service</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe your product features and benefits..."
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Product Image URL
              </label>
              <input
                type="url"
                name="image"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com/product-image.jpg"
                required
                onChange={handleImageChange} // ✅ Add onChange for image preview
              />

              {/* ✅ Optional: Add image preview */}
              {imagePreview && (
                <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Image Preview:
                  </p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Seller Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seller Name
                </label>
                <input
                  type="text"
                  name="seller_name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter seller name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seller Email
                </label>
                <input
                  type="email"
                  name="seller_email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="seller@example.com"
                  required
                />
              </div>
            </div>

            {/* Contact & URL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seller Contact
                </label>
                <input
                  type="text"
                  name="seller_contact"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sales Target URL
                </label>
                <input
                  type="url"
                  name="target_url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="https://your-product-demo.com"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter product location"
              />
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Price ($)
                </label>
                <input
                  type="number"
                  name="price_min"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximum Price ($)
                </label>
                <input
                  type="number"
                  name="price_max"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Features/Notes */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Features & Notes
              </label>
              <textarea
                name="features"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="List key features, specifications, or additional notes about your product..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {/* <button
                type="submit"
                // disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Creating Product...
                  </div>
                ) : (
                  "Create Product"
                )}
              </button> */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">
            Simple Client System - Mark your Project
          </h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Ensure all required fields are filled accurately</p>
            <p>• Provide clear and high-quality product images</p>
            <p>
              • Include detailed descriptions for better customer understanding
            </p>
            <p>• Set competitive pricing for market success</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAProduct;

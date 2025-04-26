import React, { useState, useEffect } from "react";
import apiRequest from "../api"; // Assuming apiRequest is a utility function for making API calls

const DisplayImage = () => {
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [decorItems, setDecorItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle file selection (image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));  // Preview the uploaded image
      handleImageUpload(file);  // Upload the image
    }
  };

  // Upload the image to the backend
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await apiRequest('/upload-image/', 'POST', formData);
      // Assuming backend responds with the image URL or path
      setUploadedImage(response.imageUrl); // Update with the uploaded image URL from backend
      fetchDecorItems();  // Fetch decor items after uploading the image
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // Fetch decor items from the backend
  const fetchDecorItems = async () => {
    try {
      const response = await apiRequest('/get-decor-items/', 'GET');
      setDecorItems(response.items); // Update decor items state with the fetched data
      console.log("Fetched Decor Items:", response.items);  // Log fetched items for debugging
    } catch (error) {
      console.error("Failed to fetch decor items:", error);
    }
  };

  // Handle product selection
  const handleSelectProduct = (item) => {
    console.log("Selected Item:", item); // Log the selected item
    setSelectedItem(item); // Store the selected item
  };

  return (
    <div className="display-image">
      <h1>Upload Your Room Image</h1>
      <input type="file" onChange={handleImageChange} />
      
      {/* Show uploaded image preview */}
      {image && (
        <div>
          <h2>Preview</h2>
          <img src={image} alt="Room Preview" />
        </div>
      )}

      {/* Show the image URL returned from backend */}
      {uploadedImage && (
        <div>
          <h2>Uploaded Room Image</h2>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              border: "1px solid black",
            }}
          >
            <img
              src={uploadedImage}
              alt="Uploaded Room"
              style={{ width: "100%" }}
            />

            {/* If a product is selected, place it at the center */}
            {selectedItem && selectedItem.imageUrl && (
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                style={{
                  position: "absolute",
                  top: "50%", // Center vertically
                  left: "50%", // Center horizontally
                  transform: "translate(-50%, -50%)", // Adjust positioning for true centering
                  width: "100px", // Adjust product size as needed
                  height: "auto",
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Show decor items (sofas, lamps, etc.) fetched from the backend */}
      {decorItems.length > 0 && (
        <div>
          <h2>Available Decor Items</h2>
          <ul>
            {decorItems.map((item) => (
              <li key={item.id} onClick={() => handleSelectProduct(item)}>
                <img src={item.imageUrl} alt={item.name} style={{ width: "100px" }} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DisplayImage;

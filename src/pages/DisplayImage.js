import React, { useState } from 'react';

const DisplayImage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="display-image">
      <h1>Upload Your Room Image</h1>
      <input type="file" onChange={handleImageChange} />
      {image && (
        <div>
          <h2>Preview</h2>
          <img src={image} alt="Room Preview" />
        </div>
      )}
    </div>
  );
};

export default DisplayImage;

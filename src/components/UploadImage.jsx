import React, { useState } from 'react';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError('');
    } else {
      setSelectedFile(null);
      setError('Please select a valid image file (e.g., JPEG, PNG, GIF).');
    }
  };

  // Handle drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError('');
    } else {
      setSelectedFile(null);
      setError('Please drop a valid image file.');
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsUploading(true);
    setError('');

    try {
      const response = await fetch('https://your-api-endpoint.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed. Please try again.');
      }

      const data = await response.json();
      setUploadResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      {/* Left Side (60%) */}
      <div className="w-full md:w-3/5 p-6 border-r border-gray-200 flex flex-col overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Upload an Image</h1>

        {/* Drag-and-Drop Container */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition duration-300"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <div onClick={handleBrowseClick} className="cursor-pointer">
            {/* Cloud Upload Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 mx-auto text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <p className="mt-2 text-gray-600">Drag and drop an image or</p>
            <button
            //   onClick={handleBrowseClick}
              className="mt-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition duration-300 cursor-pointer"
            >
              Browse
            </button>
          </div>
        </div>

        {/* Selected File Details */}
        {selectedFile && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-1 text-gray-500 hover:text-red-500 transition duration-300 cursor-pointer"
            >
              {/* X Icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Image Preview */}
        {selectedFile && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Preview</h2>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-64 object-contain"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile}
            className={`w-fit px-6 py-2 flex items-center justify-center ${
              isUploading || !selectedFile
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-lg transition duration-300`}
          >
            {isUploading ? (
              <>
                {/* Loading Spinner Icon (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              'Submit to AI'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </div>

      {/* Right Side (40%) */}
      <div className="w-full md:w-2/5 p-6 flex flex-col overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">AI Response</h1>
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex-1 overflow-y-auto">
          {uploadResponse ? (
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(uploadResponse, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">Upload an image to see the AI response.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;


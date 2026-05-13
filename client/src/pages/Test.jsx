import React from "react";

export default function Test() {
  const handleOAuth = () => {
    window.location.href =
      "http://localhost:5000/oauth/authorize?client_id=b36d6cd4ebb3d498b5955dd9c44570c0&redirect_uri=http://localhost:5000&state=1234&response_type=code";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleOAuth}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition"
      >
        Continue with ShivaAuth
      </button>
    </div>
  );
}

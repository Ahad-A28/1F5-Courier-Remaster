import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;

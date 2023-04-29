import React from "react";

function Heading({ title, subtitle }) {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-gray-800 tracking-wide uppercase mb-2">
        {title}
      </h1>
      <div className="border-t-2 border-gray-600 border-dashed w-32 mx-auto my-4"></div>
      <h2 className="text-2xl font-semibold text-gray-700 tracking-widest">
        {subtitle}
      </h2>
    </div>
  );
}

export default Heading;

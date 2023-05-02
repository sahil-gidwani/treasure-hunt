export default function Alert({ message, type }) {
  if (type == "info")
  {
    return (
      <div
        role="alert"
        className={`flex p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 w-full`}
      >
        <svg
          className="flex-shrink-0 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="ml-3 text-sm font-medium">{message}</div>
      </div>
    );
  }
  if (type == "success")
  {
    return (
      <div
        role="alert"
        className={`flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 w-full`}
      >
        <svg
          className="flex-shrink-0 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="ml-3 text-sm font-medium">{message}</div>
      </div>
    );
  }
  if (type == "error")
  {
    return (
      <div
        role="alert"
        className={`flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 w-full`}
      >
        <svg
          className="flex-shrink-0 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="ml-3 text-sm font-medium">{message}</div>
      </div>
    );
  }
  // let color = "";
  // if (type === "info") color = "blue"
  // if (type === "success") color = "green";
  // if (type === "error") color = "red";

  // return (
  //   <div
  //     role="alert"
  //     className={`flex p-4 mb-4 text-${color}-800 border-t-4 border-${color}-300 bg-${color}-50 w-full`}
  //   >
  //     <svg
  //       className="flex-shrink-0 w-5 h-5"
  //       fill="currentColor"
  //       viewBox="0 0 20 20"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         fillRule="evenodd"
  //         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
  //         clipRule="evenodd"
  //       ></path>
  //     </svg>
  //     <div className="ml-3 text-sm font-medium">{message}</div>
  //   </div>
  // );
}

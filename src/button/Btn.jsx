import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Btn = ({ text, loading = false, className, onClick }) => {
  return (
    <button className={`px-3 py-2 text-white text-sm font-semibold rounded flex items-center justify-center ${className}`}
    onClick={onClick}>
      <div className="flex items-center gap-2">
        {loading && <AiOutlineLoading3Quarters className="animate-spin" />}

        <p>{text}</p>
      </div>
    </button>
  );
};

export default Btn;

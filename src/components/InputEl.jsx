import React from "react";

const InputEl = ({ type = "text", id, label, register, error, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        {...register}
        className={`rounded bg-bg w-full outline-none px-3 py-1 text-sm ${
          error ? "border-2 border-accent" : ""
        }`}
      />

      {error && (
        <span className="text-xs text-red-600 font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputEl;

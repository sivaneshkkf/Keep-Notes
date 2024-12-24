import React from "react";

const TextArea = ({ type = "text", id, label, register, error, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-text">{label}</label>
      <textarea
        type="text"
        id={id}
        name={id}
        value = {value}
        onChange={onChange}
        {...register}
        className={`rounded bg-bg w-full outline-none px-3 py-1 text-sm ${
          error ? "border-2 border-accent" : ""
        }`}
        rows={4}
      />

      {error && (
        <span className="text-xs text-red-600 font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default TextArea;

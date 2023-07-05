import React from "react";

export const TextInput = ({ type, placeholder, onChange, icon }) => {
  return (
    <div className="text-input">
      {icon}
      <input onChange={onChange} type={type} placeholder={placeholder} />
    </div>
  );
};

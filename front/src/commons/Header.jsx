import React from "react";

const Header = ({ title, showInput }) => {
  return (
    <div className="header">
      <h1 className="header-title">{title}</h1>
      <input
        style={showInput ? { display: "block" } : { display: "none" }}
        type="search"
        placeholder="Find an actor..."
      />
    </div>
  );
};

export default Header;

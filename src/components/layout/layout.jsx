import React from "react";

const Layout = ({ children, showHeader, title, subtitle }) => {
  return (
    <div className="my-6">
      {showHeader && (
        <header className="container space-y-2 my-6">
          <h1 className="text-2xl uppercase">{title}</h1>
          <p>{subtitle}</p>
        </header>
      )}
      <div className="flex flex-col container">{children}</div>
    </div>
  );
};

export default Layout;

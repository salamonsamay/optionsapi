import React from "react";

function Sidebar() {
  const endpoints = [
    // List of endpoints
  ];

  return (
    <aside>
      {endpoints.map((endpoint) => (
        <li key={endpoint.id}>{endpoint.name}</li>
      ))}
    </aside>
  );
}

export default Sidebar;

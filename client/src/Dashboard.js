import React from "react";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
            <a href="/admin">Admin</a>
            <br/>
            <a href="/editor">Editor</a>
            <br/>
            <a href="/user">User</a>
        </div>
        <div className="col-8">
            <h2>welcome</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

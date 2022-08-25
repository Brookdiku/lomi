import React from "react";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin/admin";
import Editor from "./pages/Editor/Editor";
import User from "./pages/User/User";
import NotFound from "./pages/Notfound";
import AuthRequired from "./AuthRequired";
import Layout from "./Layout";
import UnAuthorized from "./pages/unAuthorized";
import Home from "./pages/Home.js";
import PersistLogin from "./PersistLogin";
import Dashboard from "./Dashboard";
const App = () => {
  const ROLES = {
    admin: "980654",
    editor: "792610",
    user: "486235",
  };
  return (
    <div className="container" >
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
              <Route path="/" element={<Home />} />
              {/* public route */}
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              {/* protected route */}

              <Route
                element={
                  <AuthRequired
                    allowedRoles={[ROLES.admin, ROLES.editor, ROLES.user]}
                  />
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              <Route element={<AuthRequired allowedRoles={[ROLES.admin]} />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route
                element={
                  <AuthRequired
                    allowedRoles={[ROLES.admin, ROLES.editor, ROLES.user]}
                  />
                }
              >
                <Route path="/user" element={<User />} />
              </Route>
              <Route
                element={
                  <AuthRequired allowedRoles={[ROLES.admin, ROLES.editor]} />
                }
              >
                <Route path="/editor" element={<Editor />} />
              </Route>
              <Route path="/unauthorized" element={<UnAuthorized />} />
            </Route>
            {/* End of protected route */}
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;

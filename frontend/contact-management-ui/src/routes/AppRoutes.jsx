import EditContact from "../pages/contacts/EditContact";
import ContactDetails from "../pages/contacts/ContactDetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Contacts from "../pages/contacts/Contacts";
import AddContact from "../pages/contacts/AddContact";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Contacts */}
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/:id" element={<ContactDetails />} />
        <Route path="/contacts/edit/:id" element={<EditContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

import { Link } from "react-router-dom";
import {
  BookUser,
  Contact,
  LogOut,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo / Application Name */}
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <BookUser size={22} />
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  Contact Management System
                </h1>

                <p className="text-xs text-slate-500">
                  Manage your contacts securely
                </p>
              </div>
            </Link>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 transition"
              >
                <Settings size={18} />
                Settings
              </button>

              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
              >
                <LogOut size={18} />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Welcome back, Sathish 👋
            </h2>

            <p className="text-slate-500 mt-2">
              Here's an overview of your contact management system.
            </p>
          </div>

          <Link
            to="/contacts/add"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Contact
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total Contacts */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Contacts</p>

                <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>
          </div>

          {/* Important */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Important</p>

                <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
            </div>
          </div>

          {/* Moderate */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Moderate</p>

                <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <Contact size={24} />
              </div>
            </div>
          </div>

          {/* Not Allowed */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Not Allowed</p>

                <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Search Contacts */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-5">
              <Search size={22} className="text-blue-600" />

              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Search Contacts
                </h3>

                <p className="text-sm text-slate-500">
                  Quickly find a contact from your collection.
                </p>
              </div>
            </div>

            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by name, number, relation or location..."
                className="w-full border border-slate-300 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Quick Action */}
          <div className="bg-blue-600 rounded-2xl shadow-sm p-6 text-white">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
              <Plus size={25} />
            </div>

            <h3 className="text-xl font-semibold">Add a New Contact</h3>

            <p className="text-blue-100 text-sm mt-2 leading-6">
              Store contact information securely and organize it according to
              its importance.
            </p>

            <Link
              to="/contacts/add"
              className="inline-flex items-center gap-2 mt-5 bg-white text-blue-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              <Plus size={18} />
              Add Contact
            </Link>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Recent Contacts
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your recently added contacts will appear here.
              </p>
            </div>

            <Link
              to="/contacts"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>
          </div>

          {/* Empty State */}
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <Users size={30} />
            </div>

            <h4 className="text-lg font-semibold text-slate-700 mt-5">
              No contacts yet
            </h4>

            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Start building your private contact collection by adding your
              first contact.
            </p>

            <Link
              to="/contacts/add"
              className="inline-flex items-center gap-2 mt-5 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Add Your First Contact
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-xs text-slate-400">
          © 2026 Contact Management System
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;

import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  FileText,
  MapPin,
  Phone,
  Tag,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

function ContactDetails() {
  const { id } = useParams();

  // Temporary sample data
  const contacts = [
    {
      id: 1,
      name: "Arun Kumar",
      contactNumber: "9876543210",
      relationType: "Friend",
      description: "College friend",
      location: "Chennai",
      category: "IMPORTANT",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      contactNumber: "9876501234",
      relationType: "Relative",
      description: "Family contact",
      location: "Ambur",
      category: "MODERATE",
    },
    {
      id: 3,
      name: "Suresh",
      contactNumber: "9123456780",
      relationType: "Work",
      description: "Former colleague",
      location: "Bangalore",
      category: "LOW",
    },
  ];

  const contact = contacts.find((item) => item.id === Number(id));

  const getCategoryClass = (category) => {
    switch (category) {
      case "IMPORTANT":
        return "bg-red-100 text-red-700";

      case "MODERATE":
        return "bg-yellow-100 text-yellow-700";

      case "LOW":
        return "bg-green-100 text-green-700";

      case "NOT_ALLOWED":
        return "bg-slate-200 text-slate-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (!contact) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
            <UserRound size={30} />
          </div>

          <h2 className="text-xl font-bold text-slate-800 mt-5">
            Contact Not Found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            The contact you are looking for does not exist.
          </p>

          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <ArrowLeft size={18} />
            Back to Contacts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center gap-4">
            <Link
              to="/contacts"
              className="text-slate-500 hover:text-slate-800 transition"
            >
              <ArrowLeft size={22} />
            </Link>

            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Contact Details
              </h1>

              <p className="text-xs text-slate-500">View contact information</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <UserRound size={32} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {contact.name}
                  </h2>

                  <p className="text-slate-500 mt-1">{contact.relationType}</p>
                </div>
              </div>

              <span
                className={`self-start sm:self-auto px-4 py-2 rounded-full text-sm font-semibold ${getCategoryClass(
                  contact.category,
                )}`}
              >
                {contact.category.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-5">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone */}
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Phone size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Contact Number</p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {contact.contactNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Relation */}
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Relation Type</p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {contact.relationType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Location</p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {contact.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Tag size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Category</p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {contact.category.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5 border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Description</p>

                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    About this contact
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-6">
                {contact.description}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <Link
                to="/contacts"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-white transition"
              >
                <ArrowLeft size={18} />
                Back
              </Link>

              <button
                type="button"
                onClick={() => console.log("Edit contact:", contact)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                <Edit size={18} />
                Edit Contact
              </button>

              <button
                type="button"
                onClick={() => console.log("Delete contact:", contact)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
                Delete Contact
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-xs text-slate-400">
          © 2026 Contact Management System
        </p>
      </footer>
    </div>
  );
}

export default ContactDetails;

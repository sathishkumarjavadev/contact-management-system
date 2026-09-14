import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  MapPin,
  Phone,
  Save,
  Tag,
  UserRound,
  Users,
} from "lucide-react";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const existingContact = contacts.find((contact) => contact.id === Number(id));

  const [formData, setFormData] = useState(
    existingContact || {
      name: "",
      contactNumber: "",
      relationType: "",
      description: "",
      location: "",
      category: "",
    },
  );

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must contain exactly 10 digits";
    }

    if (!formData.relationType.trim()) {
      newErrors.relationType = "Relation type is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Updated contact:", formData);

    alert("Contact updated successfully!");

    navigate(`/contacts/${id}`);
  };

  if (!existingContact) {
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
            The contact you are trying to edit does not exist.
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
              to={`/contacts/${id}`}
              className="text-slate-500 hover:text-slate-800 transition"
            >
              <ArrowLeft size={22} />
            </Link>

            <div>
              <h1 className="text-xl font-bold text-slate-800">Edit Contact</h1>

              <p className="text-xs text-slate-500">
                Update contact information
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          {/* Form Header */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">
              Edit Contact Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Update the details of this contact.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter contact name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 pl-10 pr-4 outline-none transition ${
                      errors.name
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Contact Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    inputMode="numeric"
                    maxLength="10"
                    placeholder="Enter 10 digit number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 pl-10 pr-4 outline-none transition ${
                      errors.contactNumber
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.contactNumber && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* Relation Type */}
              <div>
                <label
                  htmlFor="relationType"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Relation Type
                </label>

                <div className="relative">
                  <Users
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="relationType"
                    name="relationType"
                    type="text"
                    placeholder="Example: Friend, Relative, Work"
                    value={formData.relationType}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 pl-10 pr-4 outline-none transition ${
                      errors.relationType
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.relationType && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.relationType}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Example: Chennai"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 pl-10 pr-4 outline-none transition ${
                      errors.location
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.location && (
                  <p className="text-sm text-red-600 mt-1">{errors.location}</p>
                )}
              </div>

              {/* Category */}
              <div className="md:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Category
                </label>

                <div className="relative">
                  <Tag
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 pl-10 pr-4 outline-none transition bg-white ${
                      errors.category
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Select contact category</option>

                    <option value="IMPORTANT">Important</option>

                    <option value="MODERATE">Moderate</option>

                    <option value="LOW">Low</option>

                    <option value="NOT_ALLOWED">Not Allowed</option>
                  </select>
                </div>

                {errors.category && (
                  <p className="text-sm text-red-600 mt-1">{errors.category}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Description
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Enter a short description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 pl-10 pr-4 outline-none transition resize-none ${
                      errors.description
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
              <Link
                to={`/contacts/${id}`}
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                <Save size={18} />
                Update Contact
              </button>
            </div>
          </form>
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

export default EditContact;

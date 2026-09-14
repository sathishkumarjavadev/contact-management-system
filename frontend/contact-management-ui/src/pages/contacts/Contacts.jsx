import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

const initialContacts = [
  {
    id: 1,
    name: "Arun Kumar",
    contactNumber: "9876543210",
    relation: "Friend",
    location: "Chennai",
    category: "IMPORTANT",
    description: "College friend",
  },
  {
    id: 2,
    name: "Priya Sharma",
    contactNumber: "9876543211",
    relation: "Colleague",
    location: "Bangalore",
    category: "WORK",
    description: "Office colleague",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    contactNumber: "9876543212",
    relation: "Family",
    location: "Vellore",
    category: "PERSONAL",
    description: "Family member",
  },
];

const categoryOptions = ["ALL", "IMPORTANT", "WORK", "PERSONAL"];

function Contacts() {
  const [contacts, setContacts] = useState(initialContacts);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        contact.name.toLowerCase().includes(search) ||
        contact.contactNumber.includes(search) ||
        contact.relation.toLowerCase().includes(search) ||
        contact.location.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "ALL" || contact.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [contacts, searchTerm, selectedCategory]);

  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedContact(null);
    setShowDeleteModal(false);
  };

  const handleDeleteContact = () => {
    if (!selectedContact) {
      return;
    }

    setContacts((currentContacts) =>
      currentContacts.filter((contact) => contact.id !== selectedContact.id),
    );

    closeDeleteModal();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Contacts</h1>

            <p className="mt-1 text-sm text-slate-500">Manage your contacts</p>
          </div>

          <Link
            to="/contacts/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Contact
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search contacts..."
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact List */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-4">
                <Search size={28} className="text-slate-400" />
              </div>

              <h2 className="text-lg font-semibold text-slate-700">
                No contacts found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-left">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Name
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Contact Number
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Relation
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Location
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Category
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">
                            {contact.name}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {contact.contactNumber}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {contact.relation}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {contact.location}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {contact.category}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/contacts/${contact.id}`}
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                              title="View Contact"
                            >
                              <Eye size={18} />
                            </Link>

                            <Link
                              to={`/contacts/edit/${contact.id}`}
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                              title="Edit Contact"
                            >
                              <Pencil size={18} />
                            </Link>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal(contact);
                              }}
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                              title="Delete Contact"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-slate-100 md:hidden">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-slate-800">
                          {contact.name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          {contact.contactNumber}
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {contact.category}
                      </span>
                    </div>

                    <div className="mb-4 space-y-1 text-sm text-slate-600">
                      <p>
                        <span className="font-medium">Relation:</span>{" "}
                        {contact.relation}
                      </p>

                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {contact.location}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/contacts/${contact.id}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                      >
                        <Eye size={16} />
                        View
                      </Link>

                      <Link
                        to={`/contacts/edit/${contact.id}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(contact)}
                        className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-red-600 transition hover:bg-red-50"
                        title="Delete Contact"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeDeleteModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle size={23} className="text-red-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Delete Contact
                  </h2>

                  <p className="text-sm text-slate-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-6">
              <p className="text-sm leading-6 text-slate-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-800">
                  {selectedContact.name}
                </span>
                ?
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteContact}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <Trash2 size={17} />
                Delete Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;

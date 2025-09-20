
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { authAPI } from "../services/api";
import SectionHeader from "../components/SectionHeader";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { logout, user: authUser } = useContext(AuthContext);
  const [user, setUser] = useState(authUser || null);
  const [loading, setLoading] = useState(false);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const navigate = useNavigate();

  // Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await authAPI.getProfile();
        setUser(res.data);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Delete account
  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await authAPI.deleteAccount();
      logout();
      toast.success("Account deleted successfully");
      navigate("/");
    } catch {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Edit click
  const handleEditClick = () => {
    setFormData({ name: user?.name || "", email: user?.email || "" });
    setShowEditModal(true);
  };

 


  const handleSaveChanges = async () => {
  try {
    setLoading(true);
    const res = await authAPI.updateProfile(formData);
    setUser(res.data); // update UI with new data
    toast.success("Profile updated successfully!");
    setShowEditModal(false);
  } catch {
    toast.error("Failed to update profile");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="profile-page">
      <ToastContainer />

      <SectionHeader
        title="Your Profile"
        subtitle="Manage your account settings"
        align="center"
      />

      {loading && !user ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info"></div>
          <p className="mt-2">Loading profile...</p>
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card hover-card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title text-primary mb-4">Account Info</h5>

                  {user ? (
                    <div className="row">
                      <div className="col-md-6">
                        <p className="text-white"><strong>Name:</strong> {user.name}</p>
                        <p className="text-white"><strong>Email:</strong> {user.email}</p>
                        {user.createdAt && (
                          <p className="text-white">
                            <strong>Member Since:</strong>{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <p className="text-white"><strong>Journal Entries:</strong> {user.journals?.length || 0}</p>
                        <p className="text-white"><strong>Total Scores:</strong> {user.scores?.length || 0}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-muted">No profile data.</p>
                  )}

                  <hr className="my-4" />
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleEditClick}
                      disabled={loading}
                    >
                      Edit Profile
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => setShowDeleteModal(true)}
                      disabled={loading}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Delete Account</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your account?</p>
                <p className="text-danger">
                  <strong>Warning:</strong> This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

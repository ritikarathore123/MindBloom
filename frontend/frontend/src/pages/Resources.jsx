
import React, { useState, useEffect } from "react";
import { resourceAPI } from "../services/api";

const ResourceCard = ({ resource }) => (
  <div className="card mb-3 shadow-sm hover-shadow-lg bg-dark">
    <div className="card-body">
      <h5 className="card-title">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-decoration-none"
        >
          {resource.title}
        </a>
      </h5>
      <p className="card-text text-white">{resource.description}</p>
    </div>
  </div>
);

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await resourceAPI.getResources();
        setResources(res.data);
      } catch {
        setError("Failed to load resources.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading resources...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (resources.length === 0) return <p className="text-center mt-5 text-warning">No resources found.</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-white">Community Support Resources</h2>
      <div className="row">
        {resources.map((res) => (
          <div key={res._id} className="col-md-6">
            <ResourceCard resource={res} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
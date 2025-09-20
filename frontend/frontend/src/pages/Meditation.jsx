
import { useEffect, useState } from "react";
import { meditationAPI } from "../services/api"; 
function Meditation() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const { data } = await meditationAPI.getSessions(); 
        setSessions(data || []);
      } catch (error) {
        console.error("Error fetching meditations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeditations();
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading Meditations...</h3>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Meditation Sessions</h2>
      <div className="row g-4">
        {sessions.map((item, index) => (
          <div key={index} className="col-12 col-md-4">
            <div className="card h-100 shadow-sm text-center">
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                {item.author && (
                  <p className="card-text text-secondary ">{item.author}</p>
                )}
                <a
                  href={item.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Watch Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meditation;
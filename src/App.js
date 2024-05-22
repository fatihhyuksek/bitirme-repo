import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import AfetEkleFormu from './AfetEkleFormu';
import MapContainer from './GoogleMap';


function App() {
  const [afetler, setAfetler] = useState([]);

  useEffect(() => {
    fetchAfetler();
  }, []);

  const fetchAfetler = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Afet/get');
      setAfetler(response.data);
    } catch (error) {
      console.error('Error fetching afetler:', error);
    }
  };

  const handleAfetEkle = async (newAfet) => {
    
      fetchAfetler();
  
  };

  return (
    <>
      <nav>
        <h1>LOGO</h1>
        <h1>Afet Kordinasyon Sistemi</h1>
        <ul>
          <li>Main page</li>
          <li>Project</li>
          <li>About us</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="afet-ekle-formu">
            <AfetEkleFormu onAfetEkle={handleAfetEkle} />
            <MapContainer />
          </div>
      <section className="backimage">
        <div className="container">
          <h2>Afetler</h2>
          <div className="afet-table-container">
            <table className="afet-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Affected Population</th>
                </tr>
              </thead>
              <tbody>
                {afetler.map((afet, index) => (
                  <tr key={index}>
                    <td>{afet.type}</td>
                    <td>{afet.description}</td>
                    <td>{afet.city}, {afet.district}</td>
                    <td>{new Date(afet.date).toLocaleString()}</td>
                    <td>{afet.affectedPopulation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

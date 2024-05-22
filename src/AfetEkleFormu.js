import { useState } from 'react';
import axios from 'axios';
import './AfetEkleFormu.css';

function AfetEkleFormu({ onAfetEkle }) {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAfet = {
      type,
      description,
      city,
      district,
      affectedPopulation: 0,
    };

    try {
      const response = await axios.post('http://localhost:8080/Afet/add', newAfet);
      // Yeni afeti ana bileşene ilet
      onAfetEkle(newAfet);
      // Formu sıfırla
      setType('');
      setDescription('');
      setCity('');
      setDistrict('');
      console.log(response.data); // Başarıyla eklendiğine dair geri dönüş
    } catch (error) {
      console.error('Error adding afet:', error);
    }
  };

  return (
    <div className="afet-ekle-formu-container">
      <h2>Afet Bildir</h2>
      <form onSubmit={handleSubmit} className="afet-ekle-formu">
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select</option>
            <option value="Deprem">Deprem</option>
            <option value="Yangın">Yangın</option>
            <option value="Sel">Sel</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <select id="city" value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">Select</option>
            <option value="Erzurum">Erzurum</option>
            <option value="Istanbul">Istanbul</option>
            <option value="Ankara">Ankara</option>
            {/* Diğer şehirleri buraya ekle */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="district">District:</label>
          <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} required>
            <option value="">Select</option>
            <option value="Aşkale">Aşkale</option>
            <option value="Lalapaşa">Lalapaşa</option>
            <option value="Çankaya">Çankaya</option>
            {/* Diğer ilçeleri buraya ekle */}
          </select>
        </div>
        <button type="submit">Afet Bildir</button>
      </form>
    </div>
  );
}

export default AfetEkleFormu;

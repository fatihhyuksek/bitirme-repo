import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import './GoogleMap.css'; // CSS dosyasını ekleyin

function MapContainer() {
  const mapStyles = {
    height: "60vh",
    width: "70%"
  };

  const defaultCenter = {
    lat: 39.9208,
    lng: 41.2751
  };

  const [origin, setOrigin] = useState(null); // Kullanıcının konumu
  const [destination, setDestination] = useState(""); // Kullanıcının gitmek istediği yer
  const [directions, setDirections] = useState(null); // Yönlerin durumu

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcının konumunu al
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Konum alınamadı.", error);
        }
      );
    } else {
      console.error("Tarayıcınız konum hizmetlerini desteklemiyor.");
    }
  }, []); // Komponent yalnızca bir kez yüklendiğinde çalıştır

  const handleMapClick = (event) => {
    const { latLng } = event;
    const clickedLat = latLng.lat();
    const clickedLng = latLng.lng();
    const clickedLocation = { lat: clickedLat, lng: clickedLng };

    // İlk tıklamada konumu, ikinci tıklamada gitmek istediği yeri belirle
    if (!origin) {
      setOrigin(clickedLocation);
    } else {
      setDestination(clickedLocation);
    }
  };

  const handleShowRoute = () => {
    if (!origin || !destination) {
      alert("Lütfen konumunuzu ve gitmek istediğiniz yeri belirleyin.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING // Sürüş modunda rota alınacak
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result); // Yönleri set et
        } else {
          alert("Rota bulunamadı: " + status);
        }
      }
    );
  };

  return (
    <div className="map-container">
      <div className="input-container">
        <input
          className="location-input"
          type="text"
          placeholder="Konumunuz"
          value={origin ? `${origin.lat}, ${origin.lng}` : ""}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          className="location-input"
          type="text"
          placeholder="Gitmek İstediğiniz Yer"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button className="route-button" onClick={handleShowRoute}>Rota Göster</button>
      </div>
      
      <LoadScript
        googleMapsApiKey="AIzaSyAVmaCTQ1hnszhEgWRFuY_OWOx0m0ypvBw" // API anahtarınızı buraya ekleyin
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={origin || defaultCenter}
          onClick={handleMapClick} // Harita üzerinde tıklama etkinliğini dinle
        >
          {/* Kullanıcının konumunu işaret etmek için Marker */}
          {origin && <Marker position={origin} />}
          {/* Yönleri göstermek için DirectionsRenderer */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
export default MapContainer;

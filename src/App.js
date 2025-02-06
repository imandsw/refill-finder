import React, { useState } from 'react';

function LuxuryRefillFinder() {
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      identifyProduct(file);
    }
  };

  const identifyProduct = (file) => {
    // Simulation d'une requête d'IA pour reconnaître le produit
    setTimeout(() => {
      setProduct({
        name: "Chanel No. 5 Eau de Parfum",
        refillable: true,
      });
      fetchNearbyStores();
    }, 2000);
  };

  const fetchNearbyStores = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Simulation de boutiques proches avec des coordonnées ajustées
        setNearbyStores([
          { name: "Sephora Champs-Élysées", lat: userLocation.lat + 0.002, lng: userLocation.lng + 0.002 },
          { name: "Galeries Lafayette Beauté", lat: userLocation.lat - 0.002, lng: userLocation.lng - 0.002 },
        ]);
      });
    } else {
      console.error("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Luxury Refill Finder</h1>

      <div style={{ margin: '20px 0' }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {image && (
        <div style={{ margin: '20px 0' }}>
          <img src={image} alt="Produit Uploadé" style={{ width: '100%', borderRadius: '10px' }} />
        </div>
      )}

      {product && (
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <h2>{product.name}</h2>
          <p>Option refill disponible : {product.refillable ? "Oui" : "Non"}</p>
        </div>
      )}

      {nearbyStores.length > 0 && (
        <div>
          <h3>Boutiques proches :</h3>
          <ul>
            {nearbyStores.map((store, index) => (
              <li key={index}>
                <strong>{store.name}</strong> - (Lat: {store.lat.toFixed(5)}, Lng: {store.lng.toFixed(5)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LuxuryRefillFinder;

"use client"
import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
export default function Home() {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          loadProperties(pos.coords);
        },
        (err) => {
          console.error("Error getting location:", err);
          setLoading(false);
        }
      );
    }
  }, []);

  // Temporary mock data
  const loadProperties = async (coords) => {
    // Replace this with real API call later
    const mockProperties = [
      {
        lat: coords.latitude + 0.001,
        lng: coords.longitude + 0.001,
        price: "$500,000",
        address: "123 Main St"
      },
      {
        lat: coords.latitude - 0.001,
        lng: coords.longitude - 0.001,
        price: "$750,000",
        address: "456 Oak Ave"
      }
    ];
    setProperties(mockProperties);
    setLoading(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">Loading...</p>
    </div>
  );

  return (
    <div className="w-full h-screen">
      <MapComponent position={position} properties={properties} />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const VehicleList = (contract) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const loadVehicles = async () => {
      if (contract) {
        const vehicleCount = await contract.getVehicleCount();
        const loadedVehicles = [];
        for (let i = 0; i < vehicleCount; i++) {
          const vehicle = await contract.getVehicle(i);
          loadedVehicles.push({ id: i, ...vehicle });
        }
        setVehicles(loadedVehicles);
      } else {
        console.error("Contract is not initialized.");
      }
    };
    loadVehicles();
  }, []);

  return (
    <div>
      <h2>Available Vehicles</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>
            {vehicle.make} {vehicle.model} - {ethers.utils.formatEther(vehicle.rentalPrice)} ETH
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;

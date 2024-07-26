import React, { useState } from 'react';
import { ethers } from 'ethers';

const RentVehicle = ({ account,contract }) => {
  const [vehicleId, setVehicleId] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');

  const rentVehicle = async () => {
    await contract.rentVehicle(vehicleId, { from: account, value: ethers.utils.parseEther(rentalPrice) });
  };

  return (
    <div>
      <h2>Rent Vehicle</h2>
      <input value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} placeholder="Vehicle ID" />
      <input value={rentalPrice} onChange={(e) => setRentalPrice(e.target.value)} placeholder="Rental Price (ETH)" />
      <button onClick={rentVehicle}>Rent Vehicle</button>
    </div>
  );
};

export default RentVehicle;

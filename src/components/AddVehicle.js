import React, { useState } from 'react';
import { ethers } from 'ethers';

const AddVehicle = ({ provider, contract }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addVehicle = async () => {
    if (!make || !model || !rentalPrice) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const signer = provider.getSigner();
      const transaction = await contract.connect(signer).addVehicle(
        make,
        model,
        ethers.utils.parseUnits(rentalPrice.toString(), 'ether')
      );
      
      await transaction.wait();
      setLoading(false);
      setMake('');
      setModel('');
      setRentalPrice('');
      alert('Vehicle added successfully');
    } catch (err) {
      setLoading(false);
      setError('Failed to add vehicle: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Add Vehicle</h2>
      <input value={make} onChange={(e) => setMake(e.target.value)} placeholder="Make" />
      <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" />
      <input value={rentalPrice} onChange={(e) => setRentalPrice(e.target.value)} placeholder="Rental Price (ETH)" />
      <button onClick={addVehicle} disabled={loading}>
        {loading ? 'Adding...' : 'Add Vehicle'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddVehicle;

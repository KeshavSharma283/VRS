import React, { useState } from 'react';

const RemoveVehicle = ({ account,contract }) => {
  const [vehicleId, setVehicleId] = useState('');

  const removeVehicle = async () => {
    await contract.removeVehicle(vehicleId, { from: account });
  };

  return (
    <div>
      <h2>Remove Vehicle</h2>
      <input value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} placeholder="Vehicle ID" />
      <button onClick={removeVehicle}>Remove Vehicle</button>
    </div>
  );
};

export default RemoveVehicle;

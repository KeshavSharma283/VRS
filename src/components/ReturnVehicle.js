import React, { useState } from 'react';

const ReturnVehicle = ({ account,contract }) => {
  const [vehicleId, setVehicleId] = useState('');

  const returnVehicle = async () => {
    await contract.returnVehicle(vehicleId, { from: account });
  };

  return (
    <div>
      <h2>Return Vehicle</h2>
      <input value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} placeholder="Vehicle ID" />
      <button onClick={returnVehicle}>Return Vehicle</button>
    </div>
  );
};

export default ReturnVehicle;

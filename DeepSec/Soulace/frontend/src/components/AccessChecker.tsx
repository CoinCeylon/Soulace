import React, { useState } from 'react';
import { checkAccess } from '../api/soulace';

export default function AccessChecker() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    const data = await checkAccess(address);
    setResult(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Check SBT Access</h1>
      <input
        className="border p-2 rounded"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleCheck} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Check
      </button>

      {result && (
        <div className="mt-4">
          <p>Access: {result.access}</p>
          <p>Role: {result.role}</p>
        </div>
      )}
    </div>
  );
}

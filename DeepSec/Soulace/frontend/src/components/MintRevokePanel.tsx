import { useState } from 'react';
import { mintSBT, revokeSBT } from '../api/soulace';

export default function MintRevokePanel() {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');

  const handleMint = async () => {
    const res = await mintSBT(address);
    setStatus(`✅ Minted: ${res.transaction}`);
  };

  const handleRevoke = async () => {
    const res = await revokeSBT(address);
    setStatus(`⚠️ Revoked: ${res.transaction}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin SBT Panel</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Wallet address"
        className="w-full p-2 border rounded mb-2"
      />
      <div className="flex gap-2">
        <button onClick={handleMint} className="bg-green-600 text-white px-4 py-2 rounded">
          Mint SBT
        </button>
        <button onClick={handleRevoke} className="bg-red-600 text-white px-4 py-2 rounded">
          Revoke SBT
        </button>
      </div>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}

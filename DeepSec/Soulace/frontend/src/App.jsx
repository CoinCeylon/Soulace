import { useEffect, useState } from "react";
import { getStatus, checkWallet } from "./services/api";

function App() {
  const [status, setStatus] = useState("Checking backend...");
  const [wallet, setWallet] = useState("");
  const [access, setAccess] = useState("");

  useEffect(() => {
    // Ping backend on load
    getStatus().then((res) => setStatus(res.status)).catch(() => setStatus("Backend offline"));
  }, []);

  const handleCheck = async () => {
    if (!wallet) {
      setAccess("Please enter a wallet address.");
      return;
    }
    const res = await checkWallet(wallet);
    setAccess(res.access);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">CampusKey SBTs</h1>

      <p className="mb-4 text-lg">Backend Status: <span className="font-semibold">{status}</span></p>

      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="border p-2 rounded w-80 mb-4"
      />

      <button
        onClick={handleCheck}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
      >
        Check Wallet Access
      </button>

      {access && (
        <p className="mt-6 text-xl font-semibold">
          Access: <span className={access === "granted" ? "text-green-600" : "text-red-600"}>{access}</span>
        </p>
      )}
    </div>
  );
}

export default App;
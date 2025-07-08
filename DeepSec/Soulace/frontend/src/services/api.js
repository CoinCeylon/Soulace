const API_BASE = "/api";

export async function getStatus() {
  const response = await fetch(`${API_BASE}/status`);
  if (!response.ok) throw new Error("Failed to fetch backend status");
  return response.json();
}

export async function checkWallet(walletAddress) {
  const response = await fetch(`${API_BASE}/check-wallet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet: walletAddress }),
  });
  if (!response.ok) throw new Error("Failed to check wallet");
  return response.json();
}

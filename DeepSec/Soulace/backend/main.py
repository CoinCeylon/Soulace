from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS: Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/status")
def read_status():
    return {"status": "Backend is live"}

@app.post("/api/check-wallet")
async def check_wallet(data: Request):
    body = await data.json()
    wallet_address = body.get("wallet")
    
    # TODO: Call Mesh SDK / Blockfrost to verify SBT
    if wallet_address == "valid_wallet_example":
        return {"access": "granted"}
    else:
        return {"access": "denied"}

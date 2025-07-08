from fastapi import APIRouter, Body
from app.services.blockchain_service import mint_sbt, revoke_sbt

router = APIRouter()

@router.post("/mint-sbt")
def mint_sbt_endpoint(wallet_address: str = Body(..., embed=True)):
    tx_hash = mint_sbt(wallet_address)
    return {"status": "SBT minted", "transaction": tx_hash}

@router.post("/revoke-sbt")
def revoke_sbt_endpoint(wallet_address: str = Body(..., embed=True)):
    tx_hash = revoke_sbt(wallet_address)
    return {"status": "SBT revoked", "transaction": tx_hash}

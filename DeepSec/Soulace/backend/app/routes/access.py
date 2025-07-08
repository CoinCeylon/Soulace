from fastapi import APIRouter, Query
from app.services.blockchain_service import check_wallet_for_sbt

router = APIRouter()

@router.get("/check-access")
def check_access(address: str = Query(..., description="Cardano wallet address")):
    has_sbt, role = check_wallet_for_sbt(address)
    if has_sbt:
        return {"access": "granted", "role": role}
    else:
        return {"access": "denied", "role": None}

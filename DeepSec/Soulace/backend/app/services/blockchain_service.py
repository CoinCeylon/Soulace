import os
from blockfrost import BlockFrostApi, ApiError, ApiUrls
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("BLOCKFROST_API_KEY")
POLICY_ID = os.getenv("POLICY_ID")
ASSET_NAME = os.getenv("ASSET_NAME")
ADMIN_WALLET = os.getenv("ADMIN_WALLET")

api = BlockFrostApi(project_id=API_KEY, base_url=ApiUrls.preview.value)

def check_wallet_for_sbt(wallet_address):
    try:
        assets = api.addresses_assets(address=wallet_address)
        for asset in assets:
            if POLICY_ID in asset.unit and ASSET_NAME in asset.unit:
                return True, "Student"  # You can expand this to check roles from metadata
        return False, None
    except ApiError as e:
        print(e)
        return False, None

def mint_sbt(wallet_address):
    print(f"Mint SBT for {wallet_address}")
    return "fake_tx_hash_for_mint"

def revoke_sbt(wallet_address):
    print(f"Revoke SBT for {wallet_address}")
    return "fake_tx_hash_for_burn"

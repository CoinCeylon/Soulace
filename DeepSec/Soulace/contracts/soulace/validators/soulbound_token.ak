use cardano/assets.{PolicyId, AssetName, flatten}
use cardano/transaction.{Transaction}

const admin_pkh: ByteArray = #"359ad1c804b21d9ef32b6eedfd385ff54e63b2dfec13c5b40883cec6"

const soulace_token_name: AssetName = "SoulaceStudent"

fn is_admin_signed(signatories: List<ByteArray>) -> Bool {
  when signatories is {
    [] -> False
    [head, ..tail] -> 
      if head == admin_pkh { 
        True 
      } else { 
        is_admin_signed(tail) 
      }
  }
}

fn only_minting(mint_value) -> Bool {
  let flattened_mint = flatten(mint_value)
  check_all_positive(flattened_mint)
}

fn check_all_positive(assets) -> Bool {
  when assets is {
    [] -> True
    [asset, ..rest] -> {
      let (_policy_id, _asset_name, amount) = asset
      if amount > 0 {
        check_all_positive(rest)
      } else {
        False
      }
    }
  }
}

fn single_sbt_mint(mint_value, policy_id: PolicyId) -> Bool {
  let flattened_mint = flatten(mint_value)
  let our_tokens = filter_our_tokens(flattened_mint, policy_id)
  
  when our_tokens is {
    [(_policy_id, _asset_name, amount)] -> amount == 1
    _ -> False
  }
}

fn filter_our_tokens(assets, policy_id: PolicyId) -> List<(PolicyId, AssetName, Int)> {
  when assets is {
    [] -> []
    [asset, ..rest] -> {
      let (pid, name, _amount) = asset
      if pid == policy_id && name == soulace_token_name {
        [asset, ..filter_our_tokens(rest, policy_id)]
      } else {
        filter_our_tokens(rest, policy_id)
      }
    }
  }
}

validator soulbound_token {
  mint(_redeemer: Data, policy_id: PolicyId, self: Transaction) {
    let Transaction { extra_signatories, mint, .. } = self
    
    // Check all conditions:
    // 1. Admin must sign the transaction
    // 2. Only positive amounts (no burning)
    // 3. Only one SBT per transaction
    is_admin_signed(extra_signatories) && 
    only_minting(mint) && 
    single_sbt_mint(mint, policy_id)
  }
  
  spend(_datum: Option<Data>, _redeemer: Data, _utxo, _self: Transaction) {
    False
  }
  
  else(_ctx) {
    False
  }
}

test admin_signature_test() {
  let mock_signatories = [admin_pkh]
  is_admin_signed(mock_signatories)
}

test non_admin_signature_test() {
  let mock_signatories = [#"459ad1c804b21d9ef32b6eedfd385ff54e63b2dfec13c5b40883cec7"]
  !is_admin_signed(mock_signatories)
}

test empty_signature_test() {
  let mock_signatories = []
  !is_admin_signed(mock_signatories)
}
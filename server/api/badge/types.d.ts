export interface BadgeClass {
  id: string;
  class_id: string;
  chain_id: number;
  profile_id: string;
  badge_contract_address: string;
  metadata: Record<string, any>;
  tx_hash: string;
  wallet_address: string;
}

export interface Badge {
  badge_id: string;
  class_id: string;
  wallet_address: string;
  metadata: Record<string, any>;
  chain_id: number;
  tx_hash: string;
  status: string;
  created_at: Date;
}

export interface Profile {
  profile_id: string;
  wallet_address: string;
  chain_id: number;
  tx_hash: string;
}

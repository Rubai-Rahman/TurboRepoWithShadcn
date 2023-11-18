export interface TransactionDataType {
  id: string;
  reference: string;
  isDebit: boolean;
  type: string;
  amount: number;
  status: number;
  detailsMap: DetailsMap;
  createdAt: TimeStamps;
  updatedAt: TimeStamps;
  postedAt: TimeStamps;
}

export interface TimeStamps {
  seconds: number;
  nanos: number;
}

export interface DetailsMap {
  amount: string;
  cr_currency: string;
  dr_currency: string;
  from_account_id: string;
  funds_transfer_tx_created_at: Date;
  funds_transfer_tx_id: string;
  message: string;
  outgoing_account_transaction_id: string;
  payment_network_tx_id: string;
  purpose_of_transfer: string;
  receiver_first_name_arabic: string;
  receiver_first_name_english: string;
  receiver_last_name_arabic: string;
  receiver_last_name_english: string;
  receiver_second_name_arabic: string;
  receiver_second_name_english: string;
  receiver_third_name_arabic: string;
  receiver_third_name_english: string;
  sender_first_name_arabic: string;
  sender_first_name_english: string;
  sender_last_name_arabic: string;
  sender_last_name_english: string;
  sender_second_name_arabic: string;
  sender_second_name_english: string;
  sender_third_name_arabic: string;
  sender_third_name_english: string;
  to_account_id: string;
  scheme_acceptor_name: string;
  scheme_tx_currency: string;
}

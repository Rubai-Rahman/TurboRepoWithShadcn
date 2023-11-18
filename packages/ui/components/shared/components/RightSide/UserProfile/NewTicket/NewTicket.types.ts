export type FormValues = {
  subject: string;
  assigned_team: { value: number; label: string };
  assigned_agent: { value: number; label: string };
  source: string;
  description: string;
  priority: number;
  status: number;
};

export interface NewTicketTypes {
  setSelected?: any;
  contactData?: any;
}

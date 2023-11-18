export type TextEditorStateType = {
  enterCheck: boolean;
  emails: { cc: string; bcc: string };
  cannedQuery: string;
  // cannedSelected: null,
  addDMLink: boolean;
  // attachments: [],
  textAlign: "text-left" | "text-right";
  closeTabSelectedStatus: number;
  selectedTicketIdOnClose: number | null;
  contactReasonData: any;
};

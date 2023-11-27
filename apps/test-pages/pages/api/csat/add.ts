import { ADD_CSAT_FEEDBACK } from "@api-lib/graphql";
import { NextApiRequest, NextApiResponse } from "next";

export interface AddCsatFeedbackVars {
  contact_id: number;
  conversation_id?: number;
  ticket_id?: number;
  satisfaction_point: number;
  open_question_ans: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body }: { body: AddCsatFeedbackVars } = req;
    const result = await ADD_CSAT_FEEDBACK(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CaseData, Verdict } from "../types";

const VERDICT_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    plaintiffResponsibility: {
      type: Type.NUMBER,
      description: "Percentage of responsibility assigned to the Plaintiff (0-100).",
    },
    defendantResponsibility: {
      type: Type.NUMBER,
      description: "Percentage of responsibility assigned to the Defendant (0-100). Should sum to 100 with plaintiff.",
    },
    decree: {
      type: Type.STRING,
      description: "The judge's official explanation using legal jargon and compassionate parenting wisdom.",
    },
    plaintiffReparation: {
      type: Type.STRING,
      description: "A short, immediate, actionable task for the Plaintiff to resolve the conflict.",
    },
    defendantReparation: {
      type: Type.STRING,
      description: "A short, immediate, actionable task for the Defendant to resolve the conflict.",
    },
  },
  required: [
    "plaintiffResponsibility",
    "defendantResponsibility",
    "decree",
    "plaintiffReparation",
    "defendantReparation",
  ],
};

const SYSTEM_INSTRUCTION = `
You are the Honorable Panda Judge, presiding over the 'Home Court'.
Your jurisdiction is family disputes (Parent vs. Child, Sibling vs. Sibling).
You speak with a unique mix of cute animal metaphors, strict official legal terminology (e.g., 'Habeas Corpus', 'In lieu of', 'The court finds', 'Sustain', 'Overrule'), and deep, compassionate parenting wisdom.

Your psychological framework is based on evidence-based parenting books like "Raising Cain" and "The Whole-Brain Child".
Key principles to apply:
1. Connection before correction.
2. Understanding emotional flooding (the "lizard brain").
3. Recognizing the "boy code" or emotional suppression if applicable.
4. De-escalation over punishment.

Your Task:
1. Analyze the conflict provided by the Plaintiff and Defendant.
2. Assign responsibility percentages. It is rarely 100% one person's fault; relationships are systems.
3. Write a "Decree": A paragraph explaining *why* the conflict escalated, acknowledging the feelings of both sides validly, but ruling on the behavior. Use legal flair.
4. Assign "Reparations": Short, immediate, useful actions to cool down or reconnect (e.g., "Drink a glass of water", "Do 5 jumping jacks", "Say one thing you like about the other person", "3-minute silent hug").

Tone: Authoritative but adorable. Firm but fair.
`;

export const judgeCase = async (caseData: CaseData): Promise<Verdict> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    CASE NUMBER: ${Date.now()}
    
    PLAINTIFF (${caseData.plaintiffName}):
    "${caseData.plaintiffStatement}"

    DEFENDANT (${caseData.defendantName}):
    "${caseData.defendantStatement}"

    Please adjudicate this matter immediately.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: VERDICT_SCHEMA,
        temperature: 0.7, // Slight creativity for the "Decree"
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("The Panda Judge is sleeping (Empty response).");
    }

    const verdict = JSON.parse(text) as Verdict;
    return verdict;
  } catch (error) {
    console.error("Error judging case:", error);
    throw new Error("The court is in recess due to technical difficulties.");
  }
};

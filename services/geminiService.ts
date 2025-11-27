
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedProblem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const problemSchema = {
  type: Type.OBJECT,
  properties: {
    problemText: {
      type: Type.STRING,
      description: 'The full text of the word problem for the student.'
    },
    sequenceType: {
      type: Type.STRING,
      description: 'Either "arithmetic" or "geometric".'
    },
    firstTerm: {
      type: Type.NUMBER,
      description: 'The first number in the sequence.'
    },
    commonValue: {
      type: Type.NUMBER,
      description: 'The common difference (for arithmetic) or common ratio (for geometric).'
    },
    questionTermIndex: {
      type: Type.NUMBER,
      description: 'The index of the term the student needs to find (e.g., 10 for the 10th term).'
    },
    answer: {
      type: Type.NUMBER,
      description: 'The correct numerical answer for the question asked in the problem.'
    }
  },
  required: ['problemText', 'sequenceType', 'firstTerm', 'commonValue', 'questionTermIndex', 'answer']
};

export const generateProblem = async (): Promise<GeneratedProblem> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an educational content creator specializing in math for middle school students. Generate a short, engaging, real-world word problem involving either an arithmetic or a geometric sequence.
        The response MUST be in JSON format and adhere to the provided schema.
        The problem should ask for a specific term in the sequence (e.g., the 10th term).
        Example problem themes:
        - A sunflower's petals growing.
        - A ball bouncing.
        - Stacking cans in a pyramid.
        - A savings account with regular deposits.
        Do not use complex numbers. Keep the starting numbers and differences/ratios simple. The first term should be less than 10. The common difference should be between 2 and 5. The common ratio should be 2 or 3. The question term index should be between 5 and 10.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: problemSchema
      },
    });

    const jsonText = response.text.trim();
    const parsedProblem = JSON.parse(jsonText) as GeneratedProblem;
    
    // Basic validation
    if (
      !parsedProblem.problemText || 
      !parsedProblem.answer || 
      !parsedProblem.sequenceType ||
      !['arithmetic', 'geometric'].includes(parsedProblem.sequenceType)
      ) {
      throw new Error("Invalid problem structure from API.");
    }

    return parsedProblem;
  } catch (error) {
    console.error("Error generating problem with Gemini:", error);
    // Fallback problem in case of API failure
    return {
      problemText: "A baker decorates a cake with rings of frosting. The first ring has 5 dots, the second has 7, the third has 9, and so on. How many dots are in the 8th ring?",
      sequenceType: 'arithmetic',
      firstTerm: 5,
      commonValue: 2,
      questionTermIndex: 8,
      answer: 19
    };
  }
};

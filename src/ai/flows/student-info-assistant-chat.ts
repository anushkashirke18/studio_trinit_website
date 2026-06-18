'use server';
/**
 * @fileOverview An AI chatbot flow that helps students retrieve school operational data
 * like lecture timings, exam schedules, and announcements directly from Firestore.
 *
 * - studentInfoAssistantChat - The main function to interact with the student info assistant.
 * - StudentInfoAssistantChatInput - The input type for the studentInfoAssistantChat function.
 * - StudentInfoAssistantChatOutput - The return type for the studentInfoAssistantChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// Initialize Firebase for the server-side environment (Genkit flows are Server Actions)
const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

/**
 * Represents the input for the student info assistant chat.
 */
const StudentInfoAssistantChatInputSchema = z
  .string()
  .describe('The student\'s natural language question about school operational data.');
export type StudentInfoAssistantChatInput = z.infer<typeof StudentInfoAssistantChatInputSchema>;

/**
 * Represents the output from the student info assistant chat.
 */
const StudentInfoAssistantChatOutputSchema = z
  .string()
  .describe('The AI chatbot\'s answer to the student\'s question.');
export type StudentInfoAssistantChatOutput = z.infer<typeof StudentInfoAssistantChatOutputSchema>;

/**
 * A tool to retrieve real-time school operational data from Firestore.
 */
const retrieveSchoolData = ai.defineTool(
  {
    name: 'retrieveSchoolData',
    description: 'Retrieves all current school operational data (schedules, announcements, exams) to provide accurate answers.',
    inputSchema: z.object({}),
  },
  async () => {
    try {
      // Fetch all relevant collections in parallel
      const [schedulesSnap, announcementsSnap, examsSnap] = await Promise.all([
        getDocs(collection(db, 'schedules')),
        getDocs(collection(db, 'announcements')),
        getDocs(collection(db, 'exams')),
      ]);

      const schedules = schedulesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const announcements = announcementsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const exams = examsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      let result = "--- SCHOOL DATABASE CONTEXT ---\n\n";
      
      result += "SCHEDULES (Lectures/Labs):\n";
      if (schedules.length > 0) {
        schedules.forEach((s: any) => {
          result += `- ${s.subject} [${s.type}]: ${s.day} at ${s.time} in ${s.room}\n`;
        });
      } else {
        result += "- No schedules found in database.\n";
      }

      result += "\nLIVE ANNOUNCEMENTS:\n";
      if (announcements.length > 0) {
        announcements.forEach((a: any) => {
          result += `- [${a.type}] ${a.text} (Date: ${a.createdAt?.toDate ? a.createdAt.toDate().toLocaleDateString() : 'N/A'})\n`;
        });
      } else {
        result += "- No announcements found.\n";
      }

      result += "\nEXAM CALENDAR:\n";
      if (exams.length > 0) {
        exams.forEach((e: any) => {
          result += `- ${e.subject}: Date ${e.date}, Time ${e.time}, Room ${e.room}\n`;
        });
      } else {
        result += "- No exams scheduled.\n";
      }

      return result;
    } catch (error) {
      return "ERROR: Could not access the school database context.";
    }
  }
);

/**
 * Defines the prompt for the student info assistant.
 */
const studentInfoAssistantChatPrompt = ai.definePrompt({
  name: 'studentInfoAssistantChatPrompt',
  input: {schema: StudentInfoAssistantChatInputSchema},
  output: {schema: StudentInfoAssistantChatOutputSchema},
  tools: [retrieveSchoolData],
  prompt: `You are CampusConnect AI, an intelligent and friendly student success assistant. 

Your goal is to provide students with precise information about their academic life, including class timings, exam dates, and announcements.

INSTRUCTIONS:
1. ALWAYS use the 'retrieveSchoolData' tool to get the latest context from the database before answering any question about schedules, exams, or news.
2. If the tool returns "No schedules found" or similar for a specific topic the user asked about, explain that the database is currently empty for that category.
3. Be concise and helpful. Use a supportive tone.
4. If asked about something unrelated to school operations, politely decline and offer to help with school-related queries instead.

Student's Question: {{{.}}}
`,
});

/**
 * Implements the Genkit flow for the student info assistant chat.
 */
const studentInfoAssistantChatFlow = ai.defineFlow(
  {
    name: 'studentInfoAssistantChatFlow',
    inputSchema: StudentInfoAssistantChatInputSchema,
    outputSchema: StudentInfoAssistantChatOutputSchema,
  },
  async (input) => {
    const {output} = await studentInfoAssistantChatPrompt(input);
    return output!;
  }
);

/**
 * Wrapper function for the student info assistant chat flow.
 * @param input The student's natural language question.
 * @returns The AI chatbot's answer.
 */
export async function studentInfoAssistantChat(
  input: StudentInfoAssistantChatInput
): Promise<StudentInfoAssistantChatOutput> {
  return studentInfoAssistantChatFlow(input);
}

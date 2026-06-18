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
import { getFirestore, collection, getDocs, query, limit } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

/**
 * Lazy-initialized Firestore instance to ensure it's only created when needed 
 * in the server-side environment.
 */
function getDb() {
  const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getFirestore(firebaseApp);
}

const StudentInfoAssistantChatInputSchema = z.string().describe('The student\'s question about school operations.');
export type StudentInfoAssistantChatInput = z.infer<typeof StudentInfoAssistantChatInputSchema>;

const StudentInfoAssistantChatOutputSchema = z.string().describe('The AI response.');
export type StudentInfoAssistantChatOutput = z.infer<typeof StudentInfoAssistantChatOutputSchema>;

/**
 * A tool to retrieve real-time school data from Firestore.
 * Returns structured data for better LLM comprehension.
 */
const retrieveSchoolData = ai.defineTool(
  {
    name: 'retrieveSchoolData',
    description: 'Retrieves all current school operational data including schedules, announcements, and exams.',
    inputSchema: z.object({}),
    outputSchema: z.object({
      schedules: z.array(z.any()),
      announcements: z.array(z.any()),
      exams: z.array(z.any()),
    }),
  },
  async () => {
    try {
      const db = getDb();
      const [schedulesSnap, announcementsSnap, examsSnap] = await Promise.all([
        getDocs(query(collection(db, 'schedules'), limit(20))),
        getDocs(query(collection(db, 'announcements'), limit(10))),
        getDocs(query(collection(db, 'exams'), limit(20))),
      ]);

      return {
        schedules: schedulesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        announcements: announcementsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        exams: examsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      };
    } catch (error) {
      console.error('Error fetching school data:', error);
      return { schedules: [], announcements: [], exams: [] };
    }
  }
);

const studentInfoAssistantChatPrompt = ai.definePrompt({
  name: 'studentInfoAssistantChatPrompt',
  // Inherits default model from ai instance to prevent resolution errors
  input: {schema: StudentInfoAssistantChatInputSchema},
  output: {schema: StudentInfoAssistantChatOutputSchema},
  tools: [retrieveSchoolData],
  system: `You are CampusConnect AI, a friendly and helpful student assistant. 
  
  Your primary responsibility is to provide accurate information about school schedules, exams, and announcements.
  
  GUIDELINES:
  - ALWAYS call the 'retrieveSchoolData' tool first if the user asks about schedules, classes, timings, or campus news.
  - If the database is empty (no records found), kindly inform the student that no information is currently available for that request.
  - Be precise with times and locations.
  - Maintain a supportive, professional academic tone.
  - If a student asks something completely unrelated to school, politely steer them back to school-related assistance.`,
  prompt: `Student's Question: {{{.}}}`,
});

const studentInfoAssistantChatFlow = ai.defineFlow(
  {
    name: 'studentInfoAssistantChatFlow',
    inputSchema: StudentInfoAssistantChatInputSchema,
    outputSchema: StudentInfoAssistantChatOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await studentInfoAssistantChatPrompt(input);
      return output!;
    } catch (error) {
      console.error('Flow execution failed:', error);
      throw error;
    }
  }
);

export async function studentInfoAssistantChat(
  input: StudentInfoAssistantChatInput
): Promise<StudentInfoAssistantChatOutput> {
  return studentInfoAssistantChatFlow(input);
}

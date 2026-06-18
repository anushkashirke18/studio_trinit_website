'use server';
/**
 * @fileOverview An AI chatbot flow that helps students retrieve school operational data
 * like lecture timings, exam schedules, and announcements.
 *
 * - studentInfoAssistantChat - The main function to interact with the student info assistant.
 * - StudentInfoAssistantChatInput - The input type for the studentInfoAssistantChat function.
 * - StudentInfoAssistantChatOutput - The return type for the studentInfoAssistantChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
 * A tool to simulate retrieving school operational data based on a query.
 * In a real application, this would connect to a database or other data source.
 */
const retrieveSchoolData = ai.defineTool(
  {
    name: 'retrieveSchoolData',
    description: 'Retrieves relevant school operational data, such as lecture timings, exam schedules, and important announcements, based on a student\'s query.',
    inputSchema: z
      .object({
        query: z.string().describe('The specific query or keywords to search for within the school data.'),
      })
      .describe('Input for retrieving school operational data.'),
    outputSchema: z
      .string()
      .describe('The retrieved school data or a message indicating no relevant information was found.'),
  },
  async (input) => {
    // This is a placeholder implementation.
    // In a real application, you would query a database or an external API.
    console.log(`Tool: retrieveSchoolData called with query: ${input.query}`);
    if (input.query.includes('exam') || input.query.includes('timetable')) {
      return 'The final exam for Mathematics is on December 15th at 9:00 AM in Room 201. The English exam is on December 17th at 10:00 AM in the Main Hall.';
    } else if (input.query.includes('lecture') || input.query.includes('timings')) {
      return 'Introduction to Computer Science lectures are held every Monday and Wednesday from 11:00 AM to 12:30 PM in Lecture Hall A. History 101 lectures are Tuesday and Thursday from 2:00 PM to 3:30 PM in Room 105.';
    } else if (input.query.includes('announcement') || input.query.includes('update')) {
      return 'Urgent Announcement: The library will close early at 5:00 PM on Friday, November 24th for maintenance. All students are advised to return books before this time.';
    } else if (input.query.includes('holiday') || input.query.includes('break')) {
      return 'The winter break starts on December 20th and classes resume on January 5th.';
    } else {
      return 'No specific information found for your query. Please try rephrasing or asking about exams, lectures, or announcements.';
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
  prompt: `You are CampusConnect AI, a helpful and friendly assistant for students. Your primary role is to provide accurate and concise information about school operational data.

When a student asks a question, use the available tools to find the most relevant information regarding lecture timings, exam schedules, important announcements, or other school-related queries. If the student's question directly relates to information that can be retrieved, use the 'retrieveSchoolData' tool.

If the information is not found or the question is outside the scope of school operational data, politely state that you cannot assist with that specific query.

Student's Question: {{{.}}}
`,
});

/**
 * Implements the Genkit flow for the student info assistant chat.
 * It takes a student's question as input and returns an AI-generated answer.
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

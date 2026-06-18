import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // Setting the default model for the entire AI instance
  model: 'googleai/gemini-1.5-flash',
});

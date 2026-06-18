import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // Using the explicit provider prefix for the model
  model: 'googleai/gemini-1.5-flash',
});

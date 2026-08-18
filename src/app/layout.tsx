
import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { 
  Anton, 
  Bebas_Neue, 
  Inter, 
  Space_Grotesk, 
  Cormorant_Garamond, 
  Playfair_Display, 
  DM_Sans,
  Pinyon_Script
} from 'next/font/google';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
});

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon',
});

export const metadata: Metadata = {
  title: 'Fresh Start | Next.js Project',
  description: 'A clean start for your new application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${anton.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} ${cormorantGaramond.variable} ${playfairDisplay.variable} ${dmSans.variable} ${pinyonScript.variable} antialiased`}>
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

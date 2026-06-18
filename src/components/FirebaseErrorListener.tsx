'use client';

import React, { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export const FirebaseErrorListener: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      toast({
        variant: "destructive",
        title: "Database Permission Denied",
        description: `Operation '${error.context.operation}' at ${error.context.path} failed. Check security rules.`,
      });
      // In development, we also throw to trigger the Next.js error overlay
      if (process.env.NODE_ENV === 'development') {
        throw error;
      }
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  return null;
};

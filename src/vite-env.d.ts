/// <reference types="vite/client" />

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: unknown;
  export default content;
}

interface Window {
  electronAPI?: {
    mapsApiKey: string;
    getMapsDiagnostics: () => Promise<{
      hasKey: boolean;
      keyLength: number;
      keyPrefix: string;
      source: 'env' | 'missing';
    }>;
  };
}

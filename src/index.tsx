import React, { useState, useEffect } from 'react';

export default function useMediaQuery(obj: { query: string }) {
  const [state, setState] = useState(() => window.matchMedia(obj.query).matches);

  useEffect(() => {
    const mql = window.matchMedia(obj.query);
    function handler(e: MediaQueryListEvent) {
      setState(e.matches);
    }
    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, [obj.query]);

  return state;
}

interface MediaProps {
  orientation?: string;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  // minResolution?: number | `${number}dppx`;
  minResolution?: number | string;
  // maxResolution?: number | `${number}dppx`;
  maxResolution?: number | string;
  children: React.ReactNode | ((matches: boolean) => React.ReactNode);
}

export function MediaQuery({ children, ...props }: MediaProps) {
  const query = Object.entries(props)
    .map(([key, value]) => {
      const condition: string = key
        .split('')
        .map((letter: string, idx: number) => {
          return letter === letter.toUpperCase()
            ? idx === 0
              ? letter.toLowerCase()
              : '-' + letter.toLowerCase()
            : letter;
        })
        .join('');
      switch (condition) {
        case 'orientation':
          return '(' + condition + ': ' + value + ')';
        case 'min-resolution':
        case 'max-resolution':
          return '(' + condition + ': ' + (typeof value === 'string' ? value : value + 'dppx') + ')';
        default:
          return '(' + condition + ': ' + value + 'px)';
      }
    })
    .join(' and ');
  const matches = useMediaQuery({ query: query });

  if (typeof children === 'function') return <div>{children(matches)}</div>;

  if (!matches) return null;
  return <div>{children}</div>;
}

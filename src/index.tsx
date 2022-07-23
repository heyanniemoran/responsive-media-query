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

export function MediaQuery(props: MediaProps) {
  function getCondition(key: string, value: string) {
    switch (key) {
      case 'orientation':
        return `(orientation: ${value})`;
      case 'minWidth':
        return `(min-width: ${value}px)`;
      case 'maxWidth':
        return `(max-width: ${value}px)`;
      case 'minHeight':
        return `(min-height: ${value}px)`;
      case 'maxHeight':
        return `(max-height: ${value}px)`;
      case 'minResolution':
        return `(min-resolution: ${typeof value === 'string' ? value : value + 'dppx'})`;
      case 'maxResolution':
        return `(max-resolution: ${typeof value === 'string' ? value : value + 'dppx'})`;
      default:
        throw new Error('props not found');
    }
  }

  const query = Object.entries(props)
    .filter(([key]) => key !== 'children')
    .map(([key, value]) => `${getCondition(key, value)}`)
    .join(' and ');
  const matches = useMediaQuery({ query: query });

  if (typeof props.children == 'function') return <div>{props.children(matches)}</div>;

  if (!matches) return null;
  return <div>{props.children}</div>;
}

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
  minResolution?: number | `${number}dppx`;
  maxResolution?: number | `${number}dppx`;
  children: React.ReactNode | ((matches: boolean) => React.ReactNode);
}

export function MediaQuery(props: MediaProps) {
  const query_array: string[] = [];

  function add(field: string, value: string | number | undefined, suffix?: string) {
    if (value) query_array.push(`(${field}: ${value}${suffix})`);
  }
  add('orientation', props.orientation);
  add('min-width', props.minWidth, 'px');
  add('max-width', props.maxWidth, 'px');
  add('min-height', props.minHeight, 'px');
  add('max-height', props.maxHeight, 'px');
  add('min-resolution', typeof props.minResolution === 'string' ? props.minResolution : props.minResolution + 'dppx');
  add('max-resolution', typeof props.maxResolution === 'string' ? props.maxResolution : props.maxResolution + 'dppx');

  const query = query_array.join(' and ');
  const matches = useMediaQuery({ query: query });

  if (typeof props.children == 'function') return <div>{props.children(matches)}</div>;

  if (!matches) return null;
  return <div>{props.children}</div>;
}

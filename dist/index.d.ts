import React from 'react';
export default function useMediaQuery(obj: {
    query: string;
}): boolean;
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
export declare function MediaQuery(props: MediaProps): JSX.Element | null;
export {};

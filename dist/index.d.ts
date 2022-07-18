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
    minResolution?: string | number;
    maxResolution?: string | number;
    children: React.ReactNode | ((matches: boolean) => React.ReactNode);
}
export declare function MediaQuery(props: MediaProps): JSX.Element | null;
export {};

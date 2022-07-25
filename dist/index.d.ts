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
    minResolution?: number | string;
    maxResolution?: number | string;
    children: React.ReactNode | ((matches: boolean) => React.ReactNode);
}
export declare function MediaQuery({ children, ...props }: MediaProps): JSX.Element | null;
export {};

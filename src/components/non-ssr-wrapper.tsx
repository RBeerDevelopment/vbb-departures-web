import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import React from "react";
const NonSSRWrapper = ({ children}: { children: ReactNode}) => ( 
    <React.Fragment>{children}</React.Fragment> 
); 
export default dynamic(() => Promise.resolve(NonSSRWrapper), { 
    ssr: false 
});
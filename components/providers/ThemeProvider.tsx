'use client';
import { AGGridProvider } from "./AgGridProvider";
import { TabProviderWrapper } from "./TabProviderWrapper";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return(
        <AGGridProvider>
            <TabProviderWrapper>
                {children}
            </TabProviderWrapper>
        </AGGridProvider>
    )

}

export default ThemeProvider;
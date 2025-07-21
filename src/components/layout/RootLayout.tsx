import React from 'react';
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {headerConfigs} from "../../config/headerConfig.tsx";
import {useLocation} from "react-router-dom";
import BottomSheet from "../ui/BottomSheet.tsx";

interface LayoutProps{
    children: React.ReactNode;
}

function RootLayout(props: LayoutProps) {
    const location = useLocation().pathname;
    const hasFixedTypeFooter = headerConfigs[location]?.footerType==='fixed';
    const mainClassNames = headerConfigs[location]?.mainClassNames;
    const paddingBottomClassName = hasFixedTypeFooter ? ' pb-20' : '';
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className={`flex-1 px-4 ${paddingBottomClassName} ${mainClassNames}`.trim()}>
                {props.children}
            </main>
            <Footer />
            <BottomSheet />
        </div>
    );
}

export default RootLayout;
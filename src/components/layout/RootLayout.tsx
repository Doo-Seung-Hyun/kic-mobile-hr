import React from 'react';
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {headerConfigs} from "../../config/headerConfig.tsx";
import {useLocation} from "react-router-dom";

interface LayoutProps{
    children: React.ReactNode;
}

function RootLayout(props: LayoutProps) {
    const location = useLocation().pathname;
    const hasFixedTypeFooter = headerConfigs[location].footerType==='fixed';
    const paddingBottomClassName = hasFixedTypeFooter ? ' pb-20' : '';
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className={"flex-1 px-4" + paddingBottomClassName}>
                {props.children}
            </main>
            <Footer />
        </div>
    );
}

export default RootLayout;
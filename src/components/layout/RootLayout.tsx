import React from 'react';
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

interface LayoutProps{
    children: React.ReactNode;
}

function RootLayout(props: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 px-4">
                {props.children}
            </main>
            <Footer />
        </div>
    );
}

export default RootLayout;
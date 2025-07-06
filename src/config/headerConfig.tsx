import MainHeader from "../components/layout/MainHeader.tsx";
import SubHeader from "../components/layout/SubHeader.tsx";
import React from "react";
import MainFooter from "../components/layout/MainFooter.tsx";
import SubmitFooter from "../components/layout/SubmitFooter.tsx";

interface HeaderConfig {
    headerComponent : React.ReactNode;
    footerType : 'fixed' | 'default';
    footerComponent : React.ReactNode;
}

export const headerConfigs: Record<string, HeaderConfig> = {
    '/' : {
        headerComponent : <MainHeader />,
        footerType : "default",
        footerComponent : <MainFooter />
    },

    '/leave/apply' : {
        headerComponent: <SubHeader title={'휴가 신청'} />,
        footerType : 'fixed',
        footerComponent : <SubmitFooter text={'휴가 신청하기'} />
    }
}
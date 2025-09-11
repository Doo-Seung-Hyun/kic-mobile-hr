import {useLocation} from "react-router-dom";
import {headerConfigs} from "../../config/headerConfig.tsx";

interface Props {
    className?: string;
}

function Footer({
    className,
                }:Props) {
    const location = useLocation();
    const headerConfig = headerConfigs[location.pathname];
    const footerComponent = headerConfig?.footerComponent;
    const fixedFooterClassName = headerConfig?.footerType==='fixed' ? ' fixed left-0 right-0 bottom-0' : '';

    if(!headerConfig)
        return null;

    return (
        <footer className={className+" flex-none p-4 justify-center"+fixedFooterClassName}>
            {footerComponent}
        </footer>
    );
}

export default Footer;
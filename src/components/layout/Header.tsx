import {useLocation} from "react-router-dom";
import {headerConfigs} from "../../config/headerConfig.tsx";

function Header() {
    const location = useLocation();
    const headerConfig = headerConfigs[location.pathname];

    if(!headerConfig || !headerConfig.headerComponent)
        return null;

    return (
        <header className="flex flex-row items-center justify-between h-14 font-bold bg-white px-4">
            {headerConfig.headerComponent}
        </header>
    );
}

export default Header;
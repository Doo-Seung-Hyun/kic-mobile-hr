import {useLocation, useNavigate} from "react-router-dom";
import {headerConfigs} from "../../config/headerConfig.tsx";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const isMainPage = location.pathname === '/';
    const headerConfig = headerConfigs[location.pathname];
    return (
        <header className="flex flex-row items-center justify-between h-14 font-bold bg-white px-4">
            {
                isMainPage ? <>
                    <div>
                        <img src="/src/assets/images/logo.jpg"
                             className="h-7 w-auto"/>
                    </div>
                    <div className={"font-normal"}>
                        <span>두승현님</span>
                    </div>
                </> : <div className={"relative w-full text-center"}>
                    <button className={"absolute left-0"}
                            onClick={()=>navigate(-1)}
                    >
                        {headerConfig.backButtonIcon}
                    </button>
                    <span>
                        {headerConfig.title}
                    </span>
                </div>
            }
        </header>
    );
}

export default Header;
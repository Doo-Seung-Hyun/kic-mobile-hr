import logo from "/src/assets/images/logo.jpg"

const MainHeader = () => <>
    <div>
        <img src={logo} alt={"logo"}
             className="h-7 w-auto"/>
    </div>
    <div className={"font-normal"}>
        <span>두승현님</span>
    </div>
</>;

export default MainHeader;
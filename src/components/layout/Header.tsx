function Header() {
    return (
        <header className="flex flex-row justify-between h-10 font-semibold">
            <div>
                <img src="/src/assets/images/logo.jpg"
                     className="h-6 w-auto" />
            </div>
            <div>
                <span>두승현님</span>
            </div>
        </header>
    );
}

export default Header;
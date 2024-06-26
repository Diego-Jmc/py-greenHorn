import './navbar.css'

const Navbar = () => {
    return (
        <nav className='app-navbar'>
            <div>
                <h2 className="page-logo">GreenHorn</h2>
            </div>


            <ul className="ul-navbar-item-list">
                <li>
                    <a href="/">Code editor</a>
                </li>

                <li>
                    <a href="/documentation">Documentation</a>
                </li>
            </ul>

        </nav>
    );
};

export default Navbar;

import Link from "next/link";

const Nav = () => {
    return (
        <nav className="nav__container">
            <ul className="nav__links">
                <li className="nav__item">
                    <Link href="/operators">Operators</Link>
                </li>
                <li className="nav__item">
                    <Link href="/infrastructure">RIIC</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;

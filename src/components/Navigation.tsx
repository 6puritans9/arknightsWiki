import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="navigation__background"></div>
            <ul className="navigation__list">
                <li>
                    <Link href="/operators" className="navigation__link">
                        오퍼레이터
                    </Link>
                </li>
                <li>
                    <Link href="/tier-list" className="navigation__link">
                        티어
                    </Link>
                </li>
                <li>
                    <Link href="/infrastructure" className="navigation__link">
                        인프라
                    </Link>
                </li>
                <li>
                    <Link href="/materials" className="navigation__link">
                        재료
                    </Link>
                </li>
                <li>
                    <Link href="/guides" className="navigation__link">
                        가이드
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

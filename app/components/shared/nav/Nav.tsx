"use client";

import styles from "./Nav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/blog", label: "blog" },
    { href: "/mumblings", label: "mumblings" },
    { href: "/bookshelf", label: "bookshelf" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className={styles.nav}>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${styles.link} ${isActive(link.href) ? styles.active : ""}`.trim()}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

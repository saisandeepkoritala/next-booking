"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from "./navbar.module.css";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.title}>Booking.com</Link>
            <ul className={`${styles.ul}`}>
                <li className={styles.li}>
                    <Link href="/">Stays</Link>
                </li>
                <li className={styles.li}>
                    <Link href="/attraction">Attraction</Link>
                </li>
                <li className={styles.li}>
                    <Link href="/cars">Cars</Link>
                </li>
            </ul>
            <div className={styles.div} onClick={()=>{
                setOpenMenu(!openMenu)}}>
                <span className={styles.span}></span>
                <span className={styles.span}></span>
                <span className={styles.span}></span>
            </div>
            {openMenu && (
                <ul className={`${styles.mobile}`}>
                    <li className={styles.li}>
                        <Link href="/" onClick={() => setOpenMenu(false)} className={styles.link}>Stays</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/attraction" onClick={() => setOpenMenu(false)} className={styles.link}>Attraction</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/cars" onClick={() => setOpenMenu(false)} className={styles.link}>Cars</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;

import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout({children}) {
  return (
    <>
        <NavBar />
        <main>
            <Outlet/>
        </main>
        <Footer />
    </>
  );
}

import React, { Suspense } from "react";
import Navbar from './Navbar'
import Loading from "../Loader/Loading";


export default function Header() {
  return (
    <header className="header">
      <Suspense fallback={<Loading/>}>
        <Navbar />
      </Suspense>
    </header>
  )
}

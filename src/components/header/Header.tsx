import React, { Suspense } from "react";
import Navbar from './Navbar'


export default function Header() {
  return (
    <header className="header">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
    </header>
  )
}

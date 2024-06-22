import React from 'react'
import s from './CatalogNavLost.module.scss'
import Link from 'next/link'

export default function CatalogNavList() {
  return (
    <div className={s.catalog}>
      <ul className={s.catalog_list}>
        <li>
          <Link href="" className={s.catalog_link}>Super Categories</Link>
        </li>
        <li>
          <Link href="" className={s.catalog_link}>Super Categories</Link>
        </li>
        <li>
          <Link href="" className={s.catalog_link}>Super Categories</Link>
        </li>
        <li>
          <Link href="" className={s.catalog_link}>Super Categories</Link>
        </li>
        <li>
          <Link href="" className={s.catalog_link}>Super Categories</Link>
        </li>
        <li>
          <Link href="" className={s.catalog_link}>Super Categories</Link>
        </li>
        <li>
          <Link href="" className={s.catalog_link}>Super Categories</Link>
        </li>
      </ul>
    </div>
  )
}

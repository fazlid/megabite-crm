import React from 'react'
import CatalogSearch from './CatalogSearch'
import s from './NavSearch.module.scss'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function NavSearch() {
  return (
    <form action="" className={s.search}>
      <CatalogSearch/>
      <div className={s.search_block}>
      <input type="text" className={s.search_input} placeholder='Искать товары и категории' />
      <button className={s.search_btn}>
        <MagnifyingGlassIcon className={s.search_btn_icon}/>
      </button>
      </div>
    </form>
  )
}

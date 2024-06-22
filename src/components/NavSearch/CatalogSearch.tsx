import React from 'react'
import s from './CatalogSearch.module.scss'
import { QueueListIcon } from "@heroicons/react/24/outline";

export default function CatalogSearch() {
  return (
    <button className={s.catalog_btn}>
        <QueueListIcon className={s.catalog_btn_icon}/>
        <span>Каталог</span>
    </button>
  )
}

import React from 'react'
import s from './Loading.module.scss'

export default function Loading() {



  return (
    <div className={s.loading}>
        <div className={s.loading_spinner}></div>
        <h2 className={s.loading_text}>Loading ...</h2>
    </div>
  )
}

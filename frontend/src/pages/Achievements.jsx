import { useEffect, useState } from 'react'
import { getAchievements } from '../services/api'

export default function Achievements(){
  const [items, setItems] = useState([])
  useEffect(()=>{ getAchievements().then(setItems).catch(()=>{}) }, [])
  return (
    <div>
      <h1>Prestasi</h1>
      <ul>
        {items.length ? items.map(i=> (
          <li key={i.id} style={{padding:8, borderBottom:'1px solid var(--border)'}}>
            <div style={{fontWeight:600}}>{i.title}</div>
            <div style={{fontSize:13}}>{i.detail}</div>
          </li>
        )) : <li>Tidak ada prestasi.</li>}
      </ul>
    </div>
  )
}

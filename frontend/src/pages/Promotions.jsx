import { useEffect, useState } from 'react'
import { getPromotions } from '../services/api'

export default function Promotions(){
  const [promos, setPromos] = useState([])
  useEffect(()=>{ getPromotions().then(setPromos).catch(()=>{}) }, [])
  return (
    <div>
      <h1>Promosi & Layanan</h1>
      <div style={{display:'grid', gap:12}}>
        {promos.length ? promos.map(p=> (
          <div key={p.id} style={{border:'1px solid var(--border)', padding:12, borderRadius:8}}>
            <div style={{fontWeight:600}}>{p.title}</div>
            <div style={{fontSize:13}}>{p.description}</div>
          </div>
        )) : <div>Tidak ada promosi.</div>}
      </div>
    </div>
  )
}

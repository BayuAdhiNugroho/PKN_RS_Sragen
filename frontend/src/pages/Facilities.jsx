import { useEffect, useState } from 'react'
import { getFacilities } from '../services/api'

export default function Facilities(){
  const [fac, setFac] = useState([])
  useEffect(()=>{ getFacilities().then(setFac).catch(()=>{}) }, [])
  return (
    <div>
      <h1>Fasilitas</h1>
      <div style={{display:'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap:12}}>
        {fac.length ? fac.map(f=> (
          <div key={f.id} style={{border:'1px solid var(--border)', padding:12, borderRadius:8}}>
            <div style={{fontWeight:600}}>{f.name}</div>
            <div style={{fontSize:13}}>{f.description}</div>
          </div>
        )) : <div>Tidak ada fasilitas.</div>}
      </div>
    </div>
  )
}

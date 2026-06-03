import { useEffect, useState } from 'react'
import { getDoctors } from '../services/api'

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  useEffect(()=>{ getDoctors().then(setDoctors).catch(()=>{}) }, [])
  return (
    <div>
      <h1>Daftar Dokter</h1>
      <div style={{display:'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
        {doctors.length ? doctors.map(d => (
          <div key={d.id} style={{border: '1px solid var(--border)', padding:12, borderRadius:8}}>
            <div style={{fontWeight:600}}>{d.name}</div>
            <div style={{fontSize:13}}>{d.specialty}</div>
            <div style={{fontSize:12, marginTop:8}}>Kualifikasi: {d.qualification || '-'}</div>
          </div>
        )) : <div>Tidak ada data dokter.</div>}
      </div>
    </div>
  )
}

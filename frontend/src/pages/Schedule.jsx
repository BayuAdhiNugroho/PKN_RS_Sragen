import { useEffect, useState } from 'react'
import { getSchedule } from '../services/api'

export default function Schedule(){
  const [schedule, setSchedule] = useState([])
  useEffect(()=>{ getSchedule().then(setSchedule).catch(()=>{}) }, [])
  return (
    <div>
      <h1>Jadwal Praktek</h1>
      {schedule.length ? (
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left', padding:8}}>Dokter</th>
              <th style={{textAlign:'left', padding:8}}>Hari</th>
              <th style={{textAlign:'left', padding:8}}>Jam</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(s=> (
              <tr key={s.id}>
                <td style={{padding:8, borderTop:'1px solid var(--border)'}}>{s.doctorName}</td>
                <td style={{padding:8, borderTop:'1px solid var(--border)'}}>{s.day}</td>
                <td style={{padding:8, borderTop:'1px solid var(--border)'}}>{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <div>Tidak ada jadwal.</div>}
    </div>
  )
}

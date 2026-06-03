import { useEffect, useState } from 'react'
import { getNews } from '../services/api'

export default function News(){
  const [news, setNews] = useState([])
  useEffect(()=>{ getNews().then(setNews).catch(()=>{}) }, [])
  return (
    <div>
      <h1>Berita</h1>
      <div style={{display:'grid', gap:12}}>
        {news.length ? news.map(n=> (
          <article key={n.id} style={{border:'1px solid var(--border)', padding:12, borderRadius:8}}>
            <div style={{fontWeight:600}}>{n.title}</div>
            <div style={{fontSize:13}}>{n.summary}</div>
          </article>
        )) : <div>Tidak ada berita.</div>}
      </div>
    </div>
  )
}

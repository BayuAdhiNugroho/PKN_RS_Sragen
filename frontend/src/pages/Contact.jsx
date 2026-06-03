import { useState } from 'react'
import { sendContact } from '../services/api'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:''})
  const [status, setStatus] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await sendContact(form)
      setStatus('Terkirim')
      setForm({name:'', email:'', message:''})
    }catch(err){
      setStatus('Gagal mengirim')
    }
  }

  return (
    <div>
      <h1>Kontak</h1>
      <form onSubmit={submit} style={{maxWidth:560, display:'grid', gap:8}}>
        <input placeholder="Nama" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <textarea placeholder="Pesan" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required rows={6} />
        <div>
          <button type="submit" style={{padding:'8px 12px'}}>Kirim</button>
          {status && <span style={{marginLeft:12}}>{status}</span>}
        </div>
      </form>
    </div>
  )
}

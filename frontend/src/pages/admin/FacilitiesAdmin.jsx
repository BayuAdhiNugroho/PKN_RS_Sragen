import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

export default function FacilitiesAdmin() {
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({ id: null, nama: '', deskripsi: '', gambar: null });
  const [isEditing, setIsEditing] = useState(false);

  // === AUTO SCROLL LOGIC ===
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    // Cek jika URL memiliki hash #tambah-fasilitas
    if (location.hash === '#tambah-fasilitas' && formRef.current) {
      // Tunggu sebentar agar halaman selesai render
      setTimeout(() => {
        // Scroll halus ke form
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Beri efek highlight (border indigo) selama 2 detik
        formRef.current.classList.add('ring-2', 'ring-indigo-500', 'transition-all');
        setTimeout(() => {
          formRef.current.classList.remove('ring-2', 'ring-indigo-500');
        }, 2000);
      }, 100);
    }
  }, [location]);
  // =========================

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/facilities');
      setFacilities(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nama', formData.nama);
    if (formData.deskripsi) data.append('deskripsi', formData.deskripsi);
    if (formData.gambar) data.append('gambar', formData.gambar);

    try {
      if (isEditing) {
        await api.put(`/admin/facilities/${formData.id}`, data);
      } else {
        await api.post('/admin/facilities', data);
      }
      setFormData({ id: null, nama: '', deskripsi: '', gambar: null });
      setIsEditing(false);
      fetchData();
    } catch (err) { alert('Gagal menyimpan fasilitas'); }
  };

  const handleEdit = (f) => {
    setFormData({ id: f.id, nama: f.nama, deskripsi: f.deskripsi || '', gambar: null });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus?')) {
      await api.delete(`/admin/facilities/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Fasilitas</h1>
      
      {/* PASANG ref={formRef} DI SINI */}
      <div ref={formRef} className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Tambah'} Fasilitas</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm">Nama Fasilitas</label><input type="text" className="w-full border p-2" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required /></div>
          <div><label className="block text-sm">Deskripsi</label><textarea className="w-full border p-2" value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} /></div>
          <div><label className="block text-sm">Gambar</label><input type="file" accept="image/*" onChange={e => setFormData({...formData, gambar: e.target.files[0]})} /></div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2">Simpan</button>
            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, nama: '', deskripsi: '', gambar: null }); }} className="bg-gray-400 text-white px-4 py-2">Batal</button>}
          </div>
        </form>
      </div>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Nama</th><th className="px-6 py-3 text-left">Aksi</th></tr></thead>
        <tbody>
          {facilities.map(f => (
            <tr key={f.id} className="border-t">
              <td className="px-6 py-4">{f.nama}</td>
              <td className="px-6 py-4">
                <button onClick={() => handleEdit(f)} className="text-indigo-600 mr-4">Edit</button>
                <button onClick={() => handleDelete(f.id)} className="text-red-600">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
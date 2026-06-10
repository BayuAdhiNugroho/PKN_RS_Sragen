import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

export default function PromotionsAdmin() {
  const [promotions, setPromotions] = useState([]);
  const [formData, setFormData] = useState({ id: null, judul: '', deskripsi: '', tanggal_mulai: '', tanggal_berakhir: '', gambar: null });
  const [isEditing, setIsEditing] = useState(false);

  // === AUTO SCROLL LOGIC ===
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    // Cek jika URL memiliki hash #tambah-promosi
    if (location.hash === '#tambah-promosi' && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Efek highlight tetap UNGU (sesuai warna tombol di Dashboard)
        formRef.current.classList.add('ring-2', 'ring-purple-500', 'transition-all');
        setTimeout(() => {
          formRef.current.classList.remove('ring-2', 'ring-purple-500');
        }, 2000);
      }, 100);
    }
  }, [location]);
  // =========================

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/promotions');
      setPromotions(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('judul', formData.judul);
    data.append('tanggal_mulai', formData.tanggal_mulai);
    data.append('tanggal_berakhir', formData.tanggal_berakhir);
    if (formData.deskripsi) data.append('deskripsi', formData.deskripsi);
    if (formData.gambar) data.append('gambar', formData.gambar);

    try {
      if (isEditing) {
        await api.put(`/admin/promotions/${formData.id}`, data);
      } else {
        await api.post('/admin/promotions', data);
      }
      setFormData({ id: null, judul: '', deskripsi: '', tanggal_mulai: '', tanggal_berakhir: '', gambar: null });
      setIsEditing(false);
      fetchData();
    } catch (err) { alert('Gagal menyimpan promo'); }
  };

  const handleEdit = (p) => {
    setFormData({ 
      id: p.id, 
      judul: p.judul, 
      deskripsi: p.deskripsi || '', 
      tanggal_mulai: p.tanggal_mulai.split('T')[0], 
      tanggal_berakhir: p.tanggal_berakhir.split('T')[0], 
      gambar: null 
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus?')) {
      await api.delete(`/admin/promotions/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Promo</h1>
      
      <div ref={formRef} className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Tambah'} Promo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm">Judul Promo</label><input type="text" className="w-full border p-2" value={formData.judul} onChange={e => setFormData({...formData, judul: e.target.value})} required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm">Mulai</label><input type="date" className="w-full border p-2" value={formData.tanggal_mulai} onChange={e => setFormData({...formData, tanggal_mulai: e.target.value})} required /></div>
            <div><label className="block text-sm">Berakhir</label><input type="date" className="w-full border p-2" value={formData.tanggal_berakhir} onChange={e => setFormData({...formData, tanggal_berakhir: e.target.value})} required /></div>
          </div>
          <div><label className="block text-sm">Deskripsi</label><textarea className="w-full border p-2" value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} /></div>
          <div><label className="block text-sm">Gambar</label><input type="file" accept="image/*" onChange={e => setFormData({...formData, gambar: e.target.files[0]})} /></div>
          <div className="flex gap-2">
            {/* TOMBOL SIMPAN DIUBAH MENJADI BIRU */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, judul: '', deskripsi: '', tanggal_mulai: '', tanggal_berakhir: '', gambar: null }); }} className="bg-gray-400 text-white px-4 py-2 rounded">Batal</button>}
          </div>
        </form>
      </div>
      
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Judul</th>
            <th className="px-6 py-3 text-left">Mulai</th>
            <th className="px-6 py-3 text-left">Berakhir</th>
            <th className="px-6 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map(p => (
            <tr key={p.id} className="border-t">
              <td className="px-6 py-4">{p.judul}</td>
              <td className="px-6 py-4">{new Date(p.tanggal_mulai).toLocaleDateString('id-ID')}</td>
              <td className="px-6 py-4">{new Date(p.tanggal_berakhir).toLocaleDateString('id-ID')}</td>
              <td className="px-6 py-4">
                <button onClick={() => handleEdit(p)} className="text-purple-600 mr-4 hover:text-purple-800">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">Hapus</button>
              </td>
            </tr>
          ))}
          {promotions.length === 0 && (
            <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">Belum ada data promo</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
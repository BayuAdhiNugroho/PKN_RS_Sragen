import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({ id: null, judul: '', isi: '', gambar: null });
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/news');
      setNews(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('judul', formData.judul);
    data.append('isi', formData.isi);
    if (formData.gambar) data.append('gambar', formData.gambar);

    try {
      if (isEditing) {
        await api.put(`/admin/news/${formData.id}`, data);
      } else {
        await api.post('/admin/news', data);
      }
      setFormData({ id: null, judul: '', isi: '', gambar: null });
      setIsEditing(false);
      fetchData();
    } catch (err) { alert('Gagal menyimpan berita'); }
  };

  const handleEdit = (n) => {
    setFormData({ id: n.id, judul: n.judul, isi: n.isi, gambar: null });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus?')) {
      await api.delete(`/admin/news/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Berita</h1>
      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Tambah'} Berita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm">Judul</label><input type="text" className="w-full border p-2" value={formData.judul} onChange={e => setFormData({...formData, judul: e.target.value})} required /></div>
          <div><label className="block text-sm">Isi Berita</label><textarea className="w-full border p-2 h-32" value={formData.isi} onChange={e => setFormData({...formData, isi: e.target.value})} required /></div>
          <div><label className="block text-sm">Gambar</label><input type="file" accept="image/*" onChange={e => setFormData({...formData, gambar: e.target.files[0]})} /></div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2">Simpan</button>
            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, judul: '', isi: '', gambar: null }); }} className="bg-gray-400 text-white px-4 py-2">Batal</button>}
          </div>
        </form>
      </div>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Judul</th><th className="px-6 py-3 text-left">Aksi</th></tr></thead>
        <tbody>
          {news.map(n => (
            <tr key={n.id} className="border-t">
              <td className="px-6 py-4">{n.judul}</td>
              <td className="px-6 py-4">
                <button onClick={() => handleEdit(n)} className="text-indigo-600 mr-4">Edit</button>
                <button onClick={() => handleDelete(n.id)} className="text-red-600">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

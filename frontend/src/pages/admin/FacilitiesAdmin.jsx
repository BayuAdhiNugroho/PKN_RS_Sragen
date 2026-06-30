import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

const emptyForm = {
  id: null,
  nama: '',
  deskripsi: '',
  harga_mulai: '',
  jumlah_tersedia: 0,
  status_aktif: true,
  gambar: null,
};

export default function FacilitiesAdmin() {
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
        
        // Beri efek highlight (border BIRU) selama 2 detik
        formRef.current.classList.add('ring-2', 'ring-blue-500', 'transition-all');
        setTimeout(() => {
          formRef.current.classList.remove('ring-2', 'ring-blue-500');
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
    data.append('harga_mulai', formData.harga_mulai);
    data.append('jumlah_tersedia', formData.jumlah_tersedia);
    data.append('status_aktif', formData.status_aktif ? 'true' : 'false');
    if (formData.gambar) data.append('gambar', formData.gambar);

    try {
      if (isEditing) {
        await api.put(`/admin/facilities/${formData.id}`, data);
      } else {
        await api.post('/admin/facilities', data);
      }
      setFormData(emptyForm);
      setIsEditing(false);
      fetchData();
    } catch (err) { alert('Gagal menyimpan fasilitas'); }
  };

  const handleEdit = (f) => {
    setFormData({
      id: f.id,
      nama: f.nama || '',
      deskripsi: f.deskripsi || '',
      harga_mulai: f.harga_mulai ?? '',
      jumlah_tersedia: f.jumlah_tersedia ?? 0,
      status_aktif: f.status_aktif ?? true,
      gambar: null,
    });
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus?')) {
      await api.delete(`/admin/facilities/${id}`);
      fetchData();
    }
  };

  const filteredFacilities = facilities.filter((item) => {
    const keyword = searchText.trim().toLowerCase();
    const matchesSearch = !keyword || [item.nama, item.deskripsi]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(keyword));
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && item.status_aktif) ||
      (statusFilter === 'inactive' && !item.status_aktif);

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Kamar/Fasilitas</h1>
      
      {/* PASANG ref={formRef} DI SINI */}
      <div ref={formRef} className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Tambah'} Kamar/Fasilitas</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm">Nama Kamar/Fasilitas</label><input type="text" className="w-full border p-2 rounded" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required /></div>
          <div><label className="block text-sm">Deskripsi</label><textarea className="w-full border p-2" value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm">Harga Mulai</label>
              <input type="number" min="0" step="1000" className="w-full border p-2 rounded" value={formData.harga_mulai} onChange={e => setFormData({...formData, harga_mulai: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm">Jumlah Tersedia</label>
              <input type="number" min="0" className="w-full border p-2 rounded" value={formData.jumlah_tersedia} onChange={e => setFormData({...formData, jumlah_tersedia: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm">Status</label>
              <select className="w-full border p-2 rounded" value={formData.status_aktif ? 'true' : 'false'} onChange={e => setFormData({...formData, status_aktif: e.target.value === 'true'})}>
                <option value="true">Aktif</option>
                <option value="false">Nonaktif</option>
              </select>
            </div>
          </div>
          <div><label className="block text-sm">Gambar</label><input type="file" accept="image/*" onChange={e => setFormData({...formData, gambar: e.target.files[0]})} /></div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2">Simpan</button>
            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData(emptyForm); }} className="bg-gray-400 text-white px-4 py-2">Batal</button>}
          </div>
        </form>
      </div>

      <div className="bg-white p-4 rounded shadow-md mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Cari Kamar/Fasilitas</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Ketik nama atau deskripsi..."
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select className="w-full border p-2 rounded" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Semua</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          Menampilkan {filteredFacilities.length} dari {facilities.length} data
        </div>
      </div>

      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Nama</th><th className="px-6 py-3 text-left">Harga</th><th className="px-6 py-3 text-left">Tersedia</th><th className="px-6 py-3 text-left">Status</th><th className="px-6 py-3 text-left">Aksi</th></tr></thead>
        <tbody>
          {filteredFacilities.map(f => (
            <tr key={f.id} className="border-t">
              <td className="px-6 py-4">{f.nama}</td>
              <td className="px-6 py-4">{f.harga_mulai ? Number(f.harga_mulai).toLocaleString('id-ID') : '-'}</td>
              <td className="px-6 py-4">{f.jumlah_tersedia ?? 0}</td>
              <td className="px-6 py-4">{f.status_aktif ? 'Aktif' : 'Nonaktif'}</td>
              <td className="px-6 py-4">
                <button onClick={() => handleEdit(f)} className="text-indigo-600 mr-4">Edit</button>
                <button onClick={() => handleDelete(f.id)} className="text-red-600">Hapus</button>
              </td>
            </tr>
          ))}
          {filteredFacilities.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Tidak ada data yang sesuai filter</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

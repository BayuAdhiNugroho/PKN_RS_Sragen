import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

const emptyForm = {
  id: null,
  nama: '',
  spesialis: '',
  subspesialis: '',
  deskripsi: '',
  status_aktif: true,
  foto: null,
};

export default function DoctorsAdmin() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [subspecialties, setSubspecialties] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#tambah-dokter' && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        formRef.current.classList.add('ring-2', 'ring-blue-500', 'transition-all');
        setTimeout(() => {
          formRef.current.classList.remove('ring-2', 'ring-blue-500');
        }, 2000);
      }, 100);
    }
  }, [location]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/admin/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const [specialtyRes, subspecialtyRes] = await Promise.all([
        api.get('/doctors/specialties'),
        api.get('/doctors/subspecialties'),
      ]);
      setSpecialties(Array.isArray(specialtyRes.data) ? specialtyRes.data : []);
      setSubspecialties(Array.isArray(subspecialtyRes.data) ? subspecialtyRes.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nama', formData.nama);
    data.append('spesialis', formData.spesialis);
    data.append('subspesialis', formData.subspesialis);
    data.append('deskripsi', formData.deskripsi);
    data.append('status_aktif', formData.status_aktif ? 'true' : 'false');
    if (formData.foto) {
      data.append('foto', formData.foto);
    }

    try {
      if (isEditing) {
        await api.put(`/admin/doctors/${formData.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/doctors', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setFormData(emptyForm);
      setIsEditing(false);
      fetchDoctors();
      fetchSpecialties();
    } catch (err) {
      alert('Gagal menyimpan data dokter');
    }
  };

  const handleEdit = (doc) => {
    setFormData({
      id: doc.id,
      nama: doc.nama || '',
      spesialis: doc.spesialis || '',
      subspesialis: doc.subspesialis || '',
      deskripsi: doc.deskripsi || '',
      status_aktif: doc.status_aktif ?? true,
      foto: null,
    });
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus dokter ini?')) {
      try {
        await api.delete(`/admin/doctors/${id}`);
        fetchDoctors();
      } catch (err) {
        alert('Gagal menghapus dokter');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Dokter</h1>
      
      <div ref={formRef} className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Dokter' : 'Tambah Dokter'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input type="text" className="w-full border p-2 rounded" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Spesialis</label>
              <input list="spesialis-options" type="text" className="w-full border p-2 rounded" value={formData.spesialis} onChange={(e) => setFormData({...formData, spesialis: e.target.value})} required placeholder="Contoh: Anak" />
              <datalist id="spesialis-options">
                {specialties.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subspesialis</label>
              <input list="subspesialis-options" type="text" className="w-full border p-2 rounded" value={formData.subspesialis} onChange={(e) => setFormData({...formData, subspesialis: e.target.value})} placeholder="Opsional" />
              <datalist id="subspesialis-options">
                {subspecialties.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="w-full border p-2 rounded" value={formData.status_aktif ? 'true' : 'false'} onChange={(e) => setFormData({...formData, status_aktif: e.target.value === 'true'})}>
                <option value="true">Aktif</option>
                <option value="false">Nonaktif</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea className="w-full border p-2 rounded" value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Foto (Opsional)</label>
            <input type="file" accept="image/*" className="w-full border p-2 rounded" onChange={(e) => setFormData({...formData, foto: e.target.files[0]})} />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setFormData(emptyForm); }} className="bg-gray-400 text-white px-4 py-2 rounded">Batal</button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spesialis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subspesialis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map(doc => (
              <tr key={doc.id}>
                <td className="px-6 py-4 whitespace-nowrap">{doc.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doc.spesialis}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doc.subspesialis || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doc.status_aktif ? 'Aktif' : 'Nonaktif'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEdit(doc)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(doc.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">Belum ada data dokter</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

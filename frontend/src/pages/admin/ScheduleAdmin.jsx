import { useState, useEffect } from 'react';
import api from '../../services/api';

const emptyForm = { id: null, doctor_id: '', hari: 'Senin', jam_mulai: '', jam_selesai: '', nama_poli: '' };

export default function ScheduleAdmin() {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const [schedRes, docRes] = await Promise.all([
        api.get('/admin/schedules'),
        api.get('/admin/doctors')
      ]);
      setSchedules(schedRes.data);
      setDoctors(docRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/admin/schedules/${formData.id}`, formData);
      } else {
        await api.post('/admin/schedules', formData);
      }
      setFormData(emptyForm);
      setIsEditing(false);
      fetchData();
    } catch (err) {
      alert('Gagal menyimpan jadwal');
    }
  };

  const handleEdit = (sched) => {
    setFormData({
      id: sched.id,
      doctor_id: sched.doctor_id || '',
      hari: sched.hari || 'Senin',
      jam_mulai: sched.jam_mulai || '',
      jam_selesai: sched.jam_selesai || '',
      nama_poli: sched.nama_poli || '',
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus jadwal ini?')) {
      try {
        await api.delete(`/admin/schedules/${id}`);
        fetchData();
      } catch (err) {
        alert('Gagal menghapus jadwal');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Jadwal Praktik</h1>
      
      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Jadwal' : 'Tambah Jadwal'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Dokter</label>
              <select className="w-full border p-2 rounded" value={formData.doctor_id} onChange={(e) => setFormData({...formData, doctor_id: e.target.value})} required>
                <option value="">Pilih Dokter</option>
                {doctors.map(d => <option key={d.id} value={d.id}>{d.nama}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hari</label>
              <select className="w-full border p-2 rounded" value={formData.hari} onChange={(e) => setFormData({...formData, hari: e.target.value})}>
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jam Mulai</label>
              <input type="time" className="w-full border p-2 rounded" value={formData.jam_mulai} onChange={(e) => setFormData({...formData, jam_mulai: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jam Selesai</label>
              <input type="time" className="w-full border p-2 rounded" value={formData.jam_selesai} onChange={(e) => setFormData({...formData, jam_selesai: e.target.value})} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Nama Poli</label>
              <input type="text" className="w-full border p-2 rounded" value={formData.nama_poli} onChange={(e) => setFormData({...formData, nama_poli: e.target.value})} placeholder="Contoh: Poli Anak" />
            </div>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dokter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hari</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poli</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jam</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.map(sched => (
              <tr key={sched.id}>
                <td className="px-6 py-4">{sched.doctor?.nama || 'Unknown'}</td>
                <td className="px-6 py-4">{sched.hari}</td>
                <td className="px-6 py-4">{sched.nama_poli || '-'}</td>
                <td className="px-6 py-4">{sched.jam_mulai} - {sched.jam_selesai}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button onClick={() => handleEdit(sched)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(sched.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

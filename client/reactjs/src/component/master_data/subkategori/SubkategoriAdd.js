import "../Mahasiswa.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function DataSubkategoriAdd() {
  const [formValue, setFormValue] = useState({
    id_kategori: "",
    nama_subkategori: "",
    deskripsi: "",
    image: null,
  });
  const [kategoriDestinasi, setKategoriDestinasi] = useState([]);

  useEffect(() => {
    fetchKategoriDestinasi();
  }, []);

  const fetchKategoriDestinasi = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/kategoris");
      setKategoriDestinasi(response.data);
    } catch (error) {
      console.error("Error fetching kategori destinasi:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id_kategori", formValue.id_kategori);
    formData.append("nama_subkategori", formValue.nama_subkategori);
    formData.append("deskripsi", formValue.deskripsi);
    formData.append("image", formValue.image);

    console.log("Submitting form with values:", formValue);
    console.log("FormData:", formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/subkategori/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Data berhasil disimpan");
      window.location.href = "/datasubkategori";
      console.log(response);
    } catch (error) {
      console.error("Error menyimpan data:", error);
      alert("Error menyimpan data: " + error.message);
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Tambah Data Subkategori</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="id_kategori">Kota Destinasi</label>
              <select
                className="form-control"
                id="id_kategori"
                name="id_kategori"
                value={formValue.id_kategori}
                onChange={handleChange}
                required
              > 
                <option value="">Pilih Kota Destinasi</option>
                {kategoriDestinasi.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.nama_kategori}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="nama_subkategori">Tempat Destinasi</label>
              <input
                type="text"
                className="form-control"
                id="nama_subkategori"
                name="nama_subkategori"
                placeholder="Masukkan tempat destinasi"
                value={formValue.nama_subkategori}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="deskripsi">Deskripsi</label>
              <input
                type="text"
                className="form-control"
                id="deskripsi"
                name="deskripsi"
                placeholder="Masukkan deskripsi"
                value={formValue.deskripsi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Gambar</label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                name="image"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DataSubkategoriAdd;

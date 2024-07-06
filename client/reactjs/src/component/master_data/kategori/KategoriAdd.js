import "../Mahasiswa.css";
import axios from "axios";
import React, { useState } from "react";

function DataKategoriAdd() {
  const [formValue, setFormValue] = useState({
    nama_kategori: "",
    deskripsi: "",
    image: null,
  });

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
    formData.append("nama_kategori", formValue.nama_kategori);
    formData.append("deskripsi", formValue.deskripsi);
    formData.append("image", formValue.image);

    console.log("Submitting form with values:", formValue);
    console.log("FormData:", formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/kategori/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log()
      alert("Data berhasil disimpan");
      window.location.href = "/datakategori";
      console.log(response);
    } catch (error) {
      console.log("error= ", error);
      alert("Error menyimpan data: " + error.message);
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Tambah Data Kategori</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nama_kategori"
              placeholder="Masukkan Kategori Destinasi"
              value={formValue.nama_kategori}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="deskripsi"
              placeholder="Masukkan deskripsi"
              value={formValue.deskripsi}
              onChange={handleChange}
            />
            <input type="file" name="image" onChange={handleChange} />
            <br />
            <br />
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DataKategoriAdd;

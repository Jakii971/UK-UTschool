import "../Mahasiswa.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DataKategoriEdit() {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    id: "",
    nama_kategori: "",
    deskripsi: "",
    image: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/kategoris/${id}`
      );
      const data = await response.data;
      const dataId = data[0].id;
      const dataNama = data[0].nama_kategori;
      const dataStock = data[0].deskripsi;
      const dataHarga = data[0].image;

      setFormValue({
        id: dataId,
        nama_kategori: dataNama,
        deskripsi: dataStock,
        image: dataHarga,
      });
    } catch (error) {
      console.error(error);
      alert("Data tidak ditemukan!");
    }
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/kategori/update/${id}`,
        formValue
      );

      window.location.href = "/datakategori";

      alert("Data berhasil diubah");
    } catch (error) {
      console.error(error);
      alert("Error saat mengubah data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="title">Edit Data Kategori {id}</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="id"
              placeholder="Masukkan Id"
              value={formValue.id}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="nama_kategori"
              placeholder="Masukkan Nama kategori"
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
            <br />
            <br />
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

export default DataKategoriEdit;

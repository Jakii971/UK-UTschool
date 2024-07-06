import "../Mahasiswa.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DataSubkategoriEdit() {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    id: "",
    id_kategori: "",
    nama_subkategori: "",
    deskripsi: "",
    image: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/subkategoris/${id}`
      );
      const data = await response.data;
      const dataId = data[0].id;
      const dataSub = data[0].id_kategori;
      const dataNama = data[0].nama_subkategori;
      const dataStock = data[0].deskripsi;
      const dataHarga = data[0].image;

      setFormValue({
        id: dataId,
        id_kategori: dataSub,
        nama_subkategori: dataNama,
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
        `http://127.0.0.1:5000/api/subkategori/update/${id}`,
        formValue
      );

      window.location.href = "/datasubkategori";

      alert("Data berhasil diubah");
    } catch (error) {
      console.error(error);
      alert("Error saat mengubah data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="title">Edit Data Subsubkategori {id}</div>
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
              name="id_kategori"
              placeholder="Masukkan Id Kategori"
              value={formValue.id_kategori}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="nama_subkategori"
              placeholder="Masukkan Nama subkategori"
              value={formValue.nama_subkategori}
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

export default DataSubkategoriEdit;

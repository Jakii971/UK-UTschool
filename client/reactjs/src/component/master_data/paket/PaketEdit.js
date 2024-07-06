import "../Mahasiswa.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserEdit() {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    id: "",
    id_subkategori: "",
    nama_paket: "",
    durasi: "",
    harga: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/pakets/${id}`
      );
      const data = await response.data;
      const dataId = data[0].id;
      const dataSub = data[0].id_subkategori;
      const dataNama = data[0].nama_paket;
      const dataStock = data[0].durasi;
      const dataHarga = data[0].harga;

      setFormValue({
        id: dataId,
        id_subkategori: dataSub,
        nama_paket: dataNama,
        durasi: dataStock,
        harga: dataHarga,
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
        `http://127.0.0.1:5000/api/paket/update/${id}`,
        formValue
      );

      window.location.href = "/datapaket";

      alert("Data berhasil diubah");
    } catch (error) {
      console.error(error);
      alert("Error saat mengubah data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="title">Edit Data User {id}</div>
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
              name="id_subkategori"
              placeholder="Masukkan Id Subkategori"
              value={formValue.id_subkategori}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="nama_paket"
              placeholder="Masukkan Paket Destinasi"
              value={formValue.nama_paket}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="durasi"
              placeholder="Masukkan durasi"
              value={formValue.durasi}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="harga"
              placeholder="Masukkan Harga Satuan"
              value={formValue.harga}
              onChange={handleChange}
            />
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

export default UserEdit;

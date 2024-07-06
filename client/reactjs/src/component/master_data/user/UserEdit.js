import "../Mahasiswa.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserEdit() {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    id: "",
    nama: "",
    username: "",
    role: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7092/User/GetByIdUser?id=" + id
      );
      const data = await response.data;
      const dataId = data[0].id;
      const dataNama = data[0].nama;
      const dataStock = data[0].username;
      const dataHarga = data[0].role;

      setFormValue({
        id: dataId,
        nama: dataNama,
        username: dataStock,
        role: dataHarga,
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
        "https://localhost:7092/User/UpdateUser?id=" + id,
        formValue
      );

      window.location.href = "/datauser";

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
              name="nama"
              placeholder="Masukkan Nama user"
              value={formValue.nama}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="username"
              placeholder="Masukkan username"
              value={formValue.username}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="role"
              placeholder="Masukkan Harga Satuan"
              value={formValue.role}
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

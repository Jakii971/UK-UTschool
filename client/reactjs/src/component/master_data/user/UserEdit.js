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
      const response = await axios.get(`http://127.0.0.1:5000/api/pakets/${id}`);
      const data = response.data[0];

      setFormValue({
        id: data.id,
        id_subkategori: data.id_subkategori,
        nama_paket: data.nama_paket,
        durasi: data.durasi,
        harga: data.harga,
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
      await axios.put(`http://127.0.0.1:5000/api/paket/update/${id}`, formValue);
      alert("Data berhasil diubah");
      window.location.href = "/datapaket";
    } catch (error) {
      console.error(error);
      alert("Error saat mengubah data");
    }
  };

  return (
    <div className="card mt-5">
      <div className="container">
        <div className="title">Edit Data User {id}</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            {["id", "id_subkategori", "nama_paket", "durasi", "harga"].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  placeholder={`Masukkan ${field}`}
                  value={formValue[field]}
                  onChange={handleChange}
                />
                <br />
                <br />
              </div>
            ))}
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

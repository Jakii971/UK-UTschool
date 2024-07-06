import "../Mahasiswa.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserDelete() {
  const { id } = useParams();
  const [user, setUser] = useState({
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
        `https://localhost:7092/User/GetByIdUser?id=${id}`
      );
      const data = response.data;
      setUser({
        id: data.id,
        nama: data.nama,
        username: data.username,
        role: data.roleuan,
      });
    } catch (error) {
      console.log(error);
      alert("Data tidak ditemukan atau sudah dihapus!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(
        `https://localhost:7092/User/DeleteUser?id=${id}`
      );
      alert("Data berhasil dihapus");
      window.location.href = "/datauser";
    } catch (error) {
      console.error(error);
      alert("Error deleting data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Hapus Data User {id}</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <p>Yakin ingin menghapus user {user.nama}?</p>
            <button type="submit" className="btn btn-danger">
              Hapus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDelete;

import "../Mahasiswa.css";
import axios from "axios";
import React from "react";

function UserAdd() {
  const [formValue, setformValue] = React.useState({

    nama: "",
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // store the states in the form data
    const formData = {
      id: formValue.id,
      nama: formValue.nama,
      username: formValue.username,
      password: formValue.password,
      role: formValue.role,
    };

    try {
      // make axios post request
      const response = await axios.post(
        "https://localhost:7245/User/create",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Data berhasil disimpan");
      window.location.href = "/datauser";
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Error menyimpan data: " + error.message);
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Tambah Data User</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>

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
              name="password"
              placeholder="Masukkan Password"
              value={formValue.password}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="role"
              placeholder="Masukkan Role"
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

export default UserAdd;

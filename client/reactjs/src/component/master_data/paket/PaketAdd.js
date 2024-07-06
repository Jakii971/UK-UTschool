import "../Mahasiswa.css";
import axios from "axios";
import React from "react";

function DataPaketAdd() {
  const [formValue, setformValue] = React.useState({
    id_subkategori: "",
    nama_paket: "",
    durasi: "",
    harga: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formValue.id_subkategori ||
      !formValue.nama_paket ||
      !formValue.durasi ||
      !formValue.harga
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    // store the states in the form data
    const formData = {
      id: 0,
      id_subkategori: formValue.id_subkategori,
      nama_paket: formValue.nama_paket,
      durasi: formValue.durasi,
      harga: formValue.harga,
    };

    try {
      // make axios post request
      const response = await axios.post(
        "http://127.0.0.1:5000/api/paket/create", formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Data berhasil disimpan");
      window.location.href = "/datapaket";
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Error menyimpan data: " + error.message);
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Tambah Data Paket</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
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
              placeholder="Masukkan Nama Paket"
              value={formValue.nama_paket}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="durasi"
              placeholder="Masukkan Durasi Destinasi"
              value={formValue.durasi}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="harga"
              placeholder="Masukkan Harga Paket"
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

export default DataPaketAdd;

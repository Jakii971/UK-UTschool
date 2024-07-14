import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "./kategori.css"; // Ubah sesuai path file kategori.css Anda

const DataKategori = () => {
  const [datakategori, setDatakategori] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/kategoris");
      setDatakategori(response.data);
    } catch (error) {
      console.log("Error Fetching data: ", error);
    }
  };

  const deleteData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/kategori/delete/${id}`);
        setDatakategori(datakategori.filter((kategori) => kategori.id !== id));
      } catch (error) {
        console.log("Error deleting data: ", error);
      }
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Nama Kota",
      selector: (row) => row.nama_kategori,
      sortable: true,
      width: "200px",
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: true,
      width: "300px",
    },
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <img
          src={`http://127.0.0.1:5000${row.image}`} //! Sesuaikan dengan path API Anda
          alt={row.nama_kategori}
          style={{ width: "100px", height: "auto" }}
        />
      ),
      sortable: true,
      width: "400px",
    },
    {
      name: "Ubah",
      selector: (row) => (
        <Link
          to={`/datakategori-edit/${row.id}`}
          className="btn btn-primary btn-sm"
        >
          Edit
        </Link>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Hapus",
      selector: (row) => (
        <button
          onClick={() => deleteData(row.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
      sortable: true,
      width: "100px",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Data Kota Destinasi</h3>
        </div>
        <div className="card-body">
          <Link to="/datakategori-add" className="btn btn-success mb-3">
            + Tambah Data
          </Link>
          <DataTable
            columns={columns}
            data={datakategori}
            pagination
            striped
            highlightOnHover
            responsive
            noHeader
            className="table"
          />
        </div>
      </div>
    </div>
  );
};

export default DataKategori;

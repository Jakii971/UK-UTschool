import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "./sub.css";

const DataSubkategori = () => {
  const [dataSubkategori, setDataSubkategori] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/subkategoris"
      );
      setDataSubkategori(response.data);
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
        setDataSubkategori(
          dataSubkategori.filter((kategori) => kategori.id !== id)
        );
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
      name: "Kota Destinasi",
      selector: (row) => row.nama_kategori,
      sortable: true,
      width: "150px",
    },
    {
      name: "Tempat Destinasi",
      selector: (row) => row.nama_subkategori,
      sortable: true,
      width: "150px",
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: true,
      width: "350px",
    },
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <img
          src={`http://127.0.0.1:5000${row.image}`} //! Adjust the path as per your API response
          alt={row.nama_subkategori}
          style={{ width: "100px", height: "auto" }}
        />
      ),
      sortable: true,
    },
    {
      name: "Ubah",
      selector: (row) => (
        <Link
          to={`/datasubkategori-edit/${row.id}`}
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
          <h3>Data Tempat Destinasi</h3>
        </div>
        <div className="card-body">
          <Link to="/datasubkategori-add" className="btn btn-success mb-3">
            + Tambah Data
          </Link>
          <DataTable
            columns={columns}
            data={dataSubkategori}
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

export default DataSubkategori;

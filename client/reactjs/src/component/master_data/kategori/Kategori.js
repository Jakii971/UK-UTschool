import React, { useState, useEffect } from "react";
import "../Mahasiswa.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function DataKategori() {
  const [datakategori, setDatakategori] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const response = await axios.get("http://127.0.0.1:5000/api/kategoris");
      const data = await response.data;
      setDatakategori(data);
    } catch (error){
      console.log("Error Fetching data: ", error)
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
      name: "Nama Kategori",
      selector: (row) => row.nama_kategori,
      sortable: true,
      width: "233px",
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
          src={`http://127.0.0.1:5000${row.image}`} //! http://127.0.0.1:5000(/uploads/image.jpg)
          alt={row.nama_kategori}
          style={{ width: "100px" }}
        />
      ),
      sortable: true,
      width: "400px",
    },
    {
      name: "Ubah",
      selector: (row) => (
        <Link to={"/datakategori-edit/" + row.id} className="btn btn-primary">
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
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
      sortable: true,
      width: "100px",
    },
  ];

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Data Kategori</div>
        <div className="conten">
          <h2>Data Kategori</h2>
          <Link to="/datakategori-add" className="btn btn-primary"> + Data Kategori</Link>
          <DataTable columns={columns} data={datakategori} pagination />
        </div>
      </div>
    </div>
  );
}

export default DataKategori;
import React, { useState, useEffect } from "react";
import "../Mahasiswa.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function DataPaket() {
  const [dataPaket, setDataPaket] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/pakets");
      const data = await response.data;
      setDataPaket(data);
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
        await axios.delete(`http://127.0.0.1:5000/api/paket/delete/${id}`);
        setDataPaket(dataPaket.filter((paket) => paket.id !== id));
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
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Id Kategori",
      selector: (row) => row.id_subkategori,
      sortable: true,
      minWidth: "100px",
      width: "180px",
    },
    {
      name: "Nama Paket Destinasi",
      selector: (row) => row.nama_paket,
      sortable: true,
      minWidth: "200px",
      width: "233px",
    },
    {
      name: "Durasi",
      selector: (row) => row.durasi,
      sortable: true,
      minWidth: "300px",
      width: "300px",
    },
    {
      name: "Harga",
      selector: (row) => row.harga,
      sortable: true,
      minWidth: "150px",
      width: "200px",
    },
    {
      name: "Ubah",
      selector: (row) => (
        <Link to={"/dataPaket-edit/" + row.id} className="btn btn-primary">
          Edit
        </Link>
      ),
      sortable: true,
      minWidth: "150px",
      width: "100px",
    },
    {
      name: "Hapus",
      selector: (row) => (
        <button onClick={() => deleteData(row.id)} className="btn btn-danger">
          Delete
        </button>
      ),
      sortable: true,
      minWidth: "150px",
      width: "100px",
    },
  ];

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Data Paket Destinasi</div>
        <div className="conten">
          <h2>Data Paket Destinasi</h2>
          <Link to="/dataPaket-add" className="btn btn-primary">
            + Data Paket Destinasi
          </Link>
          <DataTable columns={columns} data={dataPaket} pagination />
        </div>
      </div>
    </div>
  );
}

export default DataPaket;

import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "./paket.css"; // Sesuaikan dengan path file paket.css Anda

const DataPaket = () => {
  const [dataPaket, setDataPaket] = useState([]);
  const [dataSubkategori, setDataSubkategori] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responsePaket = await axios.get("http://127.0.0.1:5000/api/pakets");
      setDataPaket(responsePaket.data);

      // Fetch subkategori data to map id_subkategori to nama_subkategori
      const responseSubkategori = await axios.get(
        "http://127.0.0.1:5000/api/subkategoris"
      );
      const subkategoriMap = responseSubkategori.data.reduce(
        (map, subkategori) => {
          map[subkategori.id] = subkategori.nama_subkategori;
          return map;
        },
        {}
      );
      setDataSubkategori(subkategoriMap);
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
      name: "Tempat Wisata",
      selector: (row) => dataSubkategori[row.id_subkategori] || "Unknown",
      sortable: true,
      minWidth: "200px",
      width: "233px",
    },
    {
      name: "Paket Destinasi",
      selector: (row) => row.nama_paket,
      sortable: true,
      minWidth: "200px",
      width: "233px",
    },
    {
      name: "Durasi Liburan",
      selector: (row) => row.durasi,
      sortable: true,
      width: "200px",
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
        <Link
          to={`/dataPaket-edit/${row.id}`}
          className="btn btn-primary btn-sm"
        >
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
        <button
          onClick={() => deleteData(row.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
      sortable: true,
      minWidth: "150px",
      width: "100px",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Data Paket Destinasi</h3>
        </div>
        <div className="card-body">
          <Link to="/dataPaket-add" className="btn btn-success mb-3">
            + Tambah Data
          </Link>
          <DataTable
            columns={columns}
            data={dataPaket}
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

export default DataPaket;

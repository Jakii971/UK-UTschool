import React, { useState, useEffect } from "react";
import "../Mahasiswa.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function DataSubkategori() {
  const [dataSubkategori, setDataSubkategori] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/subkategoris");
      const data = await response.data;
      setDataSubkategori(data);
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
      name: "Id Kategori",
      selector: (row) => row.id_kategori,
      sortable: true,
    },
    {
      name: "Nama Subkategori Destinasi",
      selector: (row) => row.nama_subkategori,
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <img
          src={`http://127.0.0.1:5000${row.image}`} //! http://127.0.0.1:5000(/uploads/image.jpg)
          alt={row.nama_subkategori}
          style={{ width: "100px" }}
        />
      ),
      sortable: true,
    },
    {
      name: "Ubah",
      selector: (row) => (
        <Link
          to={"/datasubkategori-edit/" + row.id}
          className="btn btn-primary"
        >
          Edit
        </Link>
      ),
      sortable: true,
      minWidth: "150px",
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
        <div className="Titel">Data Subkategori Destinasi</div>
        <div className="conten">
          <h2>Data Subkategori Destinasi</h2>
          <Link to="/datasubkategori-add" className="btn btn-primary">
            {" "}
            + Data Subkategori Destinasi
          </Link>
          <DataTable columns={columns} data={dataSubkategori} pagination />
        </div>
      </div>
    </div>
  );
}

export default DataSubkategori;

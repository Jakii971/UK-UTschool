import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./user.css"; // Assuming this is your custom CSS file

function DataUser() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/users");
      setDataUser(response.data);
    } catch (error) {
      console.log("Error Fetching data: ", error);
    }
  };

  const deleteData = async(id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if(confirmDelete) {
      try{
        await axios.delete(`http://127.0.0.1:5000/api//user/delete/${id}`);
        setDataUser(dataUser.filter((kategori) => kategori.id !== id));
      } catch (error){
        console.log("Error deleting data: ", error);
      }
    }
  }

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Nama User",
      selector: (row) => row.nama_pelanggan,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row) => row.alamat,
      sortable: true,
    },
    {
      name: "Kontak",
      selector: (row) => row.no_telp,
      sortable: true,
    },
    {
      name: "Ubah",
      cell: (row) => (
        <Link to={`/datauser_edit/${row.id}`} className="btn btn-primary">
          Edit
        </Link>
      ),
      sortable: true,
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
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Data User</h3>
        </div>
        <div className="card-body">
          <Link to="/datauser_add" className="btn btn-success">
            + Data User
          </Link>
          <DataTable
            columns={columns}
            data={dataUser}
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
}

export default DataUser;

import React, { useState, useEffect } from "react";
import "../Mahasiswa.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function DataUser() {
  //define state
  const [datauser, setDatauser] = useState([]);

  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get("https://localhost:7245/api/User");
    //get response data
    const data = await response.data;
    //assign response data to state "datamahasiswa"
    setDatauser(data);
    console.log(data);
  };

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
    // {
    //   name: "Ubah",
    //   selector: (row) => (
    //     <Link to={"/datauser_edit/" + row.id} className="btn btn-primary">
    //       Edit
    //     </Link>
    //   ),
    //   sortable: true,
    // },
    // {
    //   name: "Hapus",
    //   selector: (row) => (
    //     <Link to={"/datauser_delete/" + row.id} className="btn btn-danger">
    //       Delete
    //     </Link>
    //   ),
    //   sortable: true,
    // },
  ];
  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Data User</div>
        <div className="conten">
          <h2>Data User</h2>
          <Link to="/datauser_add" className="btn btn-primary">+ Data User</Link>
          <DataTable columns={columns} data={datauser.data} pagination />
        </div>
      </div>
    </div>
  );
}

export default DataUser;
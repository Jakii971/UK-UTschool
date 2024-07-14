import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./transaksi.css";

const DataTransaksi = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [dataPaket, setDataPaket] = useState({});
  const [dataPengguna, setDataPengguna] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseTransaksi = await axios.get(
        "http://127.0.0.1:5000/api/transaksis"
      );

      const responsePaket = await axios.get("http://127.0.0.1:5000/api/pakets");
      const paketMap = responsePaket.data.reduce((map, paket) => {
        map[paket.id] = paket.nama_paket;
        return map;
      }, {});
      setDataPaket(paketMap);

      const responsePengguna = await axios.get(
        "http://127.0.0.1:5000/api/users"
      );
      const penggunaMap = responsePengguna.data.reduce((map, pengguna) => {
        map[pengguna.id] = pengguna.nama_pelanggan;
        return map;
      }, {});
      setDataPengguna(penggunaMap);

      const transaksiDataWithNamaPelanggan = responseTransaksi.data.map(
        (transaksi) => ({
          ...transaksi,
          nama_pelanggan: penggunaMap[transaksi.user_id] || "Unknown",
        })
      );

      setDataTransaksi(transaksiDataWithNamaPelanggan);
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
        await axios.delete(`http://127.0.0.1:5000/api/transaksi/delete/${id}`);
        setDataTransaksi(
          dataTransaksi.filter((transaksi) => transaksi.id !== id)
        );
      } catch (error) {
        console.log("Error deleting data: ", error);
      }
    }
  };

  const handleShowModal = (row) => {
    setCurrentData(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentData(null);
  };

  const handleUpdate = async () => {
    try {
      const { id, user_id, paket_id, tanggal_transaksi, jumlah_harga } =
        currentData;
      await axios.put(`http://127.0.0.1:5000/api/transaksi/update/${id}`, {
        user_id,
        paket_id,
        tanggal_transaksi,
        jumlah_harga,
      });
      fetchData(); // Refresh data
      handleCloseModal();
    } catch (error) {
      console.log("Error updating data: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentData({ ...currentData, [name]: value });
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
      name: "Nama Pelanggan",
      selector: (row) => row.nama_pelanggan,
      sortable: true,
      minWidth: "150px",
      width: "150px",
    },
    {
      name: "Nama Paket",
      selector: (row) => dataPaket[row.paket_id] || "Unknown",
      sortable: true,
      minWidth: "200px",
      width: "233px",
    },
    {
      name: "Tanggal Transaksi",
      selector: (row) => new Date(row.tanggal_transaksi).toLocaleDateString(),
      sortable: true,
      minWidth: "200px",
      width: "233px",
    },
    {
      name: "Jumlah Harga",
      selector: (row) => row.jumlah_harga,
      sortable: true,
      minWidth: "150px",
      width: "200px",
    },
    {
      name: "Ubah",
      selector: (row) => (
        <button
          onClick={() => handleShowModal(row)}
          className="btn btn-primary btn-sm"
        >
          Edit
        </button>
      ),
      sortable: false,
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
      sortable: false,
      minWidth: "150px",
      width: "100px",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Data Transaksi Destinasi</h3>
        </div>
        <div className="card-body">
          <Link to="/dataTransaksi-add" className="btn btn-success mb-3">
            + Tambah Data
          </Link>
          <DataTable
            columns={columns}
            data={dataTransaksi}
            pagination
            striped
            highlightOnHover
            responsive
            noHeader
            className="table"
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data Transaksi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Pelanggan</Form.Label>
              <Form.Control
                type="text"
                name="nama_pelanggan"
                value={currentData?.nama_pelanggan || ""}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Paket</Form.Label>
              <Form.Control
                type="text"
                name="paket_id"
                value={currentData?.paket_id || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tanggal Transaksi</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_transaksi"
                value={
                  currentData?.tanggal_transaksi
                    ? new Date(currentData.tanggal_transaksi)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jumlah Harga</Form.Label>
              <Form.Control
                type="number"
                name="jumlah_harga"
                value={currentData?.jumlah_harga || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataTransaksi;

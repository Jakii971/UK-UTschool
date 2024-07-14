const express = require("express");
const router = express.Router();
const Transaksi = require("../models/transaksi");

router.get("/transaksis", (req, res) => {
  Transaksi.getAllTransaksis((err, transaksis) => {
    if (err) {
      console.error("Error fetching transaksis:", err);
      res.status(500).json({ error: "Server error" });
    } else {
      res.json(transaksis);
    }
  });
});

router.get("/transaksis/:id", (req, res) => {
  const transaksiId = req.params.id;
  Transaksi.getTransaksiById(transaksiId, (err, transaksi) => {
    if (err) {
      console.error("Error fetching transaksi:", err);
      res.status(500).json({ error: "Server error" });
    } else if (!transaksi) {
      res.status(404).json({ message: "Transaksi not found" });
    } else {
      res.json(transaksi);
    }
  });
});

router.post("/transaksi/create", (req, res) => {
  const { user_id, paket_id, tanggal_transaksi, jumlah_harga } = req.body;

  Transaksi.createTransaksi(
    user_id,
    paket_id,
    tanggal_transaksi,
    jumlah_harga,
    (err, result) => {
      if (err) {
        console.error("Error creating transaksi:", err);
        res.status(500).json({ error: "Server error" });
      } else {
        res.status(201).json({
          message: "Transaksi created",
          transaksi: {
            id: result.insertId,
            user_id,
            paket_id,
            tanggal_transaksi,
            jumlah_harga,
          },
        });
      }
    }
  );
});

// Memperbarui pengguna berdasarkan ID
router.put("/transaksi/update/:id", (req, res) => {
  const transaksiId = req.params.id;
  const { user_id, paket_id, tanggal_transaksi, jumlah_harga } = req.body;
  Transaksi.updateTransaksi(
    user_id,
    paket_id,
    tanggal_transaksi,
    jumlah_harga,
    (err, result) => {
      if (err) {
        console.error("Error updating transaksi:", err);
        res.status(500).json({ error: "Server error" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Transaksi not found" });
      } else {
        res.json({ message: "Transaksi updated", transaksiId });
      }
    }
  );
});

// Menghapus pengguna berdasarkan ID
router.delete("/transaksi/delete/:id", (req, res) => {
  const transaksiId = req.params.id;
  Transaksi.deleteTransaksi(transaksiId, (err, result) => {
    if (err) {
      console.error("Error deleting transaksi:", err);
      res.status(500).json({ error: "Server error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Transaksi not found" });
    } else {
      res.json({ message: "Transaksi deleted", transaksiId });
    }
  });
});

module.exports = router;

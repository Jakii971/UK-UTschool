const express = require("express");
const router = express.Router();
const Kategori = require("../models/kategori");
const multer = require("multer");
const path = require("path");

router.get("/kategoris", (req, res) => {
  Kategori.getAllKategoris((err, kategoris) => {
    if (err) {
      console.error("Error fetching kategoris:", err);
      res.status(500).json({ error: "Server error" });
    } else {
      res.json(kategoris);
    }
  });
});

router.get("/kategoris/:id", (req, res) => {
  const kategoriId = req.params.id;
  Kategori.getKategoriById(kategoriId, (err, kategori) => {
    if (err) {
      console.error("Error fetching kategori:", err);
      res.status(500).json({ error: "Server error" });
    } else if (!kategori) {
      res.status(404).json({ message: "Kategori not found" });
    } else {
      res.json(kategori);
    }
  });
});

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const cleanedName = req.body.nama_kategori
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "_");
    const uniqueFileName = cleanedName + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

// Route untuk membuat kategori dengan mengunggah gambar
router.post("/kategori/create", upload.single("image"), (req, res) => {
  const { nama_kategori, deskripsi } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; //! /uploads/image.jpg

  Kategori.createKategori(nama_kategori, deskripsi, image, (err, result) => {
    if (err) {
      console.error("Error creating kategori:", err);
      res.status(500).json({ error: "Server error" });
    } else {
      res.status(201).json({
        message: "Kategori created",
        kategori: { id: result.insertId, nama_kategori, deskripsi, image },
      });
      console.log("Created kategori:", result);
    }
  });
});

// Route untuk mengupdate kategori dengan mengunggah gambar
router.put("/kategori/update/:id", upload.single("image"), (req, res) => {
  const kategoriId = req.params.id;
  const { nama_kategori, deskripsi } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  Kategori.updateKategori(
    kategoriId,
    nama_kategori,
    deskripsi,
    image,
    (err, result) => {
      if (err) {
        console.error("Error updating kategori:", err);
        res.status(500).json({ error: "Server error" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Kategori not found" });
      } else {
        res.json({ message: "Kategori updated", kategoriId });
      }
    }
  );
});

// Menghapus pengguna berdasarkan ID
router.delete("/kategori/delete/:id", (req, res) => {
  const kategoriId = req.params.id;
  Kategori.deleteKategori(kategoriId, (err, result) => {
    if (err) {
      console.error("Error deleting kategori:", err);
      res.status(500).json({ error: "Server error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Kategori not found" });
    } else {
      res.json({ message: "Kategori deleted", kategoriId });
    }
  });
});

module.exports = router;

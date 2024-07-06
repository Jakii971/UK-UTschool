const express = require("express");
const router = express.Router();
const Subkategori = require("../models/subkategori");
const multer = require("multer");
const path = require("path");

router.get("/subkategoris", (req, res) => {
  Subkategori.getAllSubkategoris((err, subkategoris) => {
    if (err) {
      console.error("Error fetching subkategoris:", err);
      res.status(500).json({ error: "Server error" });
    } else {
      res.json(subkategoris);
    }
  });
});

router.get("/subkategoris/:id", (req, res) => {
  const subkategoriId = req.params.id;
  Subkategori.getSubkategoriById(subkategoriId, (err, subkategori) => {
    if (err) {
      console.error("Error fetching subkategori:", err);
      res.status(500).json({ error: "Server error" });
    } else if (!subkategori) {
      res.status(404).json({ message: "Subkategori not found" });
    } else {
      res.json(subkategori);
    }
  });
});

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const cleanedName = req.body.nama_subkategori
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "_");
    const uniqueFileName = cleanedName + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

// Route untuk membuat kategori dengan mengunggah gambar
router.post("/subkategori/create", upload.single("image"), (req, res) => {
  
  const { id_kategori, nama_subkategori, deskripsi } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  Subkategori.createSubkategori(
    id_kategori,
    nama_subkategori,
    deskripsi,
    image,
    (err, result) => {
      if (err) {
        console.error("Error creating subkategori:", err);
        res.status(500).json({ error: "Server error" });
      } else {
        res.status(201).json({
          message: "Subkategori created",
          subkategori: {
            id: result.insertId,
            id_kategori,
            nama_subkategori,
            deskripsi,
            image,
          },
        });
      }
    }
  );
});

router.put("/subkategori/update/:id", upload.single("image"), (req, res) => {
  const subkategoriId = req.params.id;
  const { id_kategori, nama_subkategori, deskripsi } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}`: null;

  Subkategori.updateSubkategori(
    subkategoriId,
    id_kategori,
    nama_subkategori,
    deskripsi,
    image,
    (err, result) => {
      if (err) {
        console.error("Error updating subkategori:", err);
        res.status(500).json({ error: "Server error" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Subkategori not found" });
      } else {
        res.json({ message: "Subkategori updated", subkategoriId });
      }
    }
  );
});

// Menghapus pengguna berdasarkan ID
router.delete("/subkategori/delete/:id", (req, res) => {
  const subkategoriId = req.params.id;
  Subkategori.deleteSubkategori(subkategoriId, (err, result) => {
    if (err) {
      console.error("Error deleting subkategori:", err);
      res.status(500).json({ error: "Server error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Subkategori not found" });
    } else {
      res.json({ message: "Subkategori deleted", subkategoriId });
    }
  });
});

module.exports = router;

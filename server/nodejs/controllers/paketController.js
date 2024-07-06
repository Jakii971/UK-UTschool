const express = require('express');
const router = express.Router();
const Paket = require('../models/paket');


router.get('/pakets', (req, res) => {
  Paket.getAllPakets((err, pakets) => {
    if (err) {
      console.error('Error fetching pakets:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.json(pakets);
    }
  });
});

router.get('/pakets/:id', (req, res) => {
  const paketId = req.params.id;
  Paket.getPaketById(paketId, (err, paket) => {
    if (err) {
      console.error('Error fetching paket:', err);
      res.status(500).json({ error: 'Server error' });
    } else if (!paket) {
      res.status(404).json({ message: 'Paket not found' });
    } else {
      res.json(paket);
    }
  });
});

router.post('/paket/create', (req, res) => {
  const { id_subkategori, nama_paket, durasi, harga } = req.body;

  Paket.createPaket(id_subkategori, nama_paket, durasi, harga, (err, result) => {
    if (err) {
      console.error('Error creating paket:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.status(201).json({ message: 'Paket created', paket: { id: result.insertId, id_subkategori, nama_paket, durasi, harga, } });
    }
  });
});

// Memperbarui pengguna berdasarkan ID
router.put('/paket/update/:id', (req, res) => {
  const paketId = req.params.id;
  const { id_subkategori, nama_paket, durasi, harga } = req.body;
  Paket.updatePaket(paketId, id_subkategori, nama_paket, durasi, harga, (err, result) => {
    if (err) {
      console.error('Error updating paket:', err);
      res.status(500).json({ error: 'Server error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Paket not found' });
    } else {
      res.json({ message: 'Paket updated', paketId });
    }
  });
});

// Menghapus pengguna berdasarkan ID
router.delete('/paket/delete/:id', (req, res) => {
  const paketId = req.params.id;
  Paket.deletePaket(paketId, (err, result) => {
    if (err) {
      console.error('Error deleting paket:', err);
      res.status(500).json({ error: 'Server error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Paket not found' });
    } else {
      res.json({ message: 'Paket deleted', paketId });
    }
  });
});


module.exports = router;
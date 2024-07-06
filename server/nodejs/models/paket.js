const dbService = require('../dbService');

const db = dbService.getConnection();

const Paket = {
  getAllPakets: function(callback) {
    db.query('SELECT * FROM paket', callback);
  },

  getPaketById: function(id, callback) {
    db.query('SELECT * FROM paket WHERE id = ?', [id], callback);
  },

  createPaket: function(id_subkategori, nama_paket, durasi, harga, callback) {
    db.query("INSERT INTO paket (id_subkategori, nama_paket, durasi, harga) VALUES (?, ?, ?, ?)", [id_subkategori, nama_paket, durasi, harga], callback);
  },

  updatePaket: function(id, id_subkategori, nama_paket, durasi, harga, callback) {
    db.query('UPDATE paket SET id_subkategori = ?, nama_paket=? ,durasi = ? , harga = ? WHERE id = ?', [id_subkategori, nama_paket, durasi, harga, id], callback);
  },

  deletePaket: function(id, callback) {
    db.query('DELETE FROM paket WHERE id = ?', [id], callback);
  }
};

module.exports = Paket;


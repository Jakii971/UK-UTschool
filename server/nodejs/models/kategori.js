const dbService = require('../dbService');

const db = dbService.getConnection();

const Kategori = {
  getAllKategoris: function(callback) {
    db.query('SELECT * FROM kategori_destinasi', callback);
  },

  getKategoriById: function(id, callback) {
    db.query('SELECT * FROM kategori_destinasi WHERE id = ?', [id], callback);
  },

  createKategori: function(nama_kategori, deskripsi, image, callback) {
    db.query("INSERT INTO kategori_destinasi (nama_kategori, deskripsi, image) VALUES (?, ?, ?)", [nama_kategori, deskripsi, image], callback);
  },

  updateKategori: function(id, nama_kategori, deskripsi, image, callback) {
    db.query('UPDATE kategori_destinasi SET nama_kategori = ?, deskripsi=?, image = ? WHERE id = ?', [nama_kategori, deskripsi, image, id], callback);
  },

  deleteKategori: function(id, callback) {
    db.query('DELETE FROM kategori_destinasi WHERE id = ?', [id], callback);
  }
};

module.exports = Kategori;


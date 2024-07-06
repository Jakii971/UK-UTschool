const dbService = require('../dbService');

const db = dbService.getConnection();

const Subkategori = {
  getAllSubkategoris: function(callback) {
    db.query('SELECT * FROM subkategori_destinasi', callback);
  },

  getSubkategoriById: function(id, callback) {
    db.query('SELECT * FROM subkategori_destinasi WHERE id = ?', [id], callback);
  },

  createSubkategori: function(id_kategori, nama_subkategori, deskripsi, image, callback) {
    db.query(
      "INSERT INTO subkategori_destinasi (id_kategori, nama_subkategori, deskripsi, image) VALUES (?, ?, ?, ?)",
      [id_kategori, nama_subkategori, deskripsi, image],
      callback
    );
  },

  updateSubkategori: function(id, id_kategori, nama_subkategori, deskripsi, image, callback) {
    db.query('UPDATE subkategori_destinasi SET id_kategori = ?, nama_subkategori=?, deskripsi = ?, image = ? WHERE id = ?', [id_kategori, nama_subkategori, deskripsi, image, id], callback);
  },

  deleteSubkategori: function(id, callback) {
    db.query('DELETE FROM subkategori_destinasi WHERE id = ?', [id], callback);
  }
};

module.exports = Subkategori;


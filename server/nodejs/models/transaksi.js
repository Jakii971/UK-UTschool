const dbService = require("../dbService");

const db = dbService.getConnection();

const Transaksi = {
  getAllTransaksis: function (callback) {
    db.query("SELECT * FROM transaksi", callback);
  },

  getTransaksiById: function (id, callback) {
    db.query("SELECT * FROM transaksi WHERE id = ?", [id], callback);
  },

  createTransaksi: function (
    user_id,
    paket_id,
    tanggal_transaksi,
    jumlah_harga,
    callback
  ) {
    db.query(
      "INSERT INTO transaksi (user_id, paket_id, tanggal_transaksi, jumlah_harga) VALUES (?, ?, ?)",
      [user_id, paket_id, tanggal_transaksi, jumlah_harga],
      callback
    );
  },

  updateTransaksi: function (
    id,
    user_id,
    paket_id,
    tanggal_transaksi,
    jumlah_harga,
    callback
  ) {
    db.query(
      "UPDATE transaksi SET user_id = ?, paket_id=?, tanggal_transaksi = ?, jumlah_harga = ? WHERE id = ?",
      [user_id, paket_id, tanggal_transaksi, jumlah_harga, id],
      callback
    );
  },

  deleteTransaksi: function (id, callback) {
    db.query("DELETE FROM transaksi WHERE id = ?", [id], callback);
  },
};

module.exports = Transaksi;

const dbService = require('../dbService');

const db = dbService.getConnection();

const UserRole = {
  admin: 'admin',
  customer: 'customer'
}

const User = {
  getAllUsers: function(callback) {
    db.query('SELECT * FROM users', callback);
  },

  getUserById: function(id, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  createUser: function(username, password, role, nama_pelanggan, alamat, no_telp, callback) {
    console.log(role)
    if(!Object.values(UserRole).includes(role)){
      return callback(new Error('Invalid role'))
    }
    db.query('INSERT INTO users (username, password, role, nama_pelanggan, alamat, no_telp) VALUES (?, ?, ?, ?, ?, ?)', [username, password, role, nama_pelanggan, alamat, no_telp], callback);
  },

  updateUser: function(id, username, password, role, nama_pelanggan, alamat, no_telp, callback) {
    db.query('UPDATE users SET username = ?, password=? ,role = ? , nama_pelanggan = ?, alamat=?, no_telp=? WHERE id = ?', [username, password, role, nama_pelanggan, alamat, no_telp, id], callback);
  },

  deleteUser: function(id, callback) {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = {User, UserRole};


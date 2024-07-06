const express = require('express');
const router = express.Router();
const { User, UserRole } = require('../models/user');

// Mendapatkan semua pengguna
router.get('/users', (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.json(users);
    }
  });
});

// Mendapatkan pengguna berdasarkan ID
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  User.getUserById(userId, (err, user) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Server error' });
    } else if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  });
});

// Membuat pengguna baru
router.post('/user/create', (req, res) => {
  const { username, password, role, nama_pelanggan, alamat, no_telp } = req.body;

  User.createUser(username, password, role, nama_pelanggan, alamat, no_telp, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.status(201).json({ message: 'User created', user: { id: result.insertId, username, role, nama_pelanggan, alamat, no_telp } });
    }
  });
});

// Memperbarui pengguna berdasarkan ID
router.put('/user/update/:id', (req, res) => {
  const userId = req.params.id;
  const { username, password,role, nama_pelanggan, alamat, no_telp } = req.body;
  User.updateUser(userId, username, password, role, nama_pelanggan, alamat, no_telp, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Server error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated', userId });
    }
  });
});

// Menghapus pengguna berdasarkan ID
router.delete('/user/delete/:id', (req, res) => {
  const userId = req.params.id;
  User.deleteUser(userId, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Server error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User deleted', userId });
    }
  });
});


module.exports = router;
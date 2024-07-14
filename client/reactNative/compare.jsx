import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import axios from "axios";

const serverUrl = "192.168.1.57"; // Ganti dengan IP server Anda

export default function UserProfile({ route, navigation }) {
  const { id, username, role, password, nama_pelanggan, alamat, no_telp } =
    route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState(nama_pelanggan);
  const [newAddress, setNewAddress] = useState(alamat);
  const [newPhone, setNewPhone] = useState(no_telp);

  const updateUser = () => {
    const formData = {
      username,
      password,
      role,
      nama_pelanggan: newName,
      alamat: newAddress,
      no_telp: newPhone,
    };

    axios
      .put(`http://${serverUrl}:7245/User/update/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        setIsModalVisible(false);
        navigation.push("Login"); // Menggunakan navigation untuk pindah halaman
        // Tambahkan notifikasi atau feedback sukses di sini jika diperlukan
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle error
      });
  };

  const deleteUser = () => {
    axios
      .delete(`http://${serverUrl}:7245/User/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        navigation.push("Login"); // Menggunakan navigation untuk pindah halaman
        // Tambahkan notifikasi atau feedback sukses di sini jika diperlukan
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
        // Handle error
      });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus pengguna ini?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Hapus dibatalkan"),
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: deleteUser,
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.profileContainer}>
      <Text style={styles.heading}>PROFILE CUSTOMER</Text>
      <Text style={styles.username}>@{username}</Text>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://avatar.iran.liara.run/public/boy?username=${nama_pelanggan}`,
          }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.fullName}>{newName}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>Alamat: {newAddress}</Text>
          <Text style={styles.detailText}>No Telp: {newPhone}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.actionText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={confirmDelete}>
          <Text style={[styles.actionText, { color: "red" }]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Update Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            value={newAddress}
            onChangeText={setNewAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="No Telepon"
            value={newPhone}
            onChangeText={setNewPhone}
          />
          <View style={styles.modalButtons}>
            <Button title="Simpan" onPress={updateUser} />
            <Button
              title="Batal"
              onPress={() => setIsModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#EEF7FF",
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    marginBottom: 5,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    alignItems: "center",
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 10,
  },
  actionText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

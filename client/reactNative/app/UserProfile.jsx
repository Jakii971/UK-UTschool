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
  ImageBackground
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useRouter } from "expo-router";

import {
  scheduleNotification,
  requestPermissions,
} from "./Modal/notifications";

const serverUrl = "192.168.1.56"; //! ubah ip disini dengan ip server/komputer

export default function UserProfile(props) {
  const { id, username, role, password, nama_pelanggan, alamat, no_telp } =
    useLocalSearchParams();

  const router = useRouter();
  const userId = id;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState(nama_pelanggan);
  const [newAddress, setNewAddress] = useState(alamat);
  const [newPhone, setNewPhone] = useState(no_telp);

  useEffect(() => {
    requestPermissions();
    console.log("Component mounted");
  }, []);

  const updateUser = () => {
    const formData = {
      username,
      password,
      role: role,
      nama_pelanggan: newName,
      alamat: newAddress,
      no_telp: newPhone,
    };

    axios
      .put(`http://${serverUrl}:7245/User/update/${userId}`, formData)
      .then((response) => {
        console.log(response);
        setIsModalVisible(false);
        router.push({ pathname: "/Login" });

        scheduleNotification("Success", "Profile berhasil diperbarui!");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Response error:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  const deleteUser = () => {
    axios
      .delete(`http://${serverUrl}:7245/User/delete/${userId}`)
      .then((response) => {
        console.log(response);
        router.push({ pathname: "/Login" });

        scheduleNotification("Success", "Profile berhasil dihapus!");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Response error:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
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
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/58/60/fa/5860fab04dedcc7d98c49fff4704b4fe.jpg",
      }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.profileContainer}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 2,
              color: "#fafafa",
            }}
          >
            PROFILE CUSTOMER
          </Text>
          <Text style={{ fontSize: 15, color: "#fafafa" }}>@{username}</Text>
          <View>
            <View
              style={{ alignItems: "center", marginTop: 50, marginBottom: 15 }}
            >
              <Image
                source={{
                  uri: `https://avatar.iran.liara.run/public/boy?username=${nama_pelanggan}`,
                }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.textWrapper}>
              <Text style={{ fontSize: 20, color: "#fafafa" }}>Hello!</Text>
              <Text style={styles.profileText}>{nama_pelanggan}</Text>
              <View>
                <Text style={styles.profileSubText}>Alamat: {alamat}</Text>
                <Text style={styles.profileSubText}>No Telp: {no_telp}</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={(styles.button, styles.editButton)}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=7LhMaNDFgoYK&format=png&color=000000",
                }}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmDelete}
              style={[styles.button, styles.deleteButton]}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=13086&format=png&color=000000",
                }}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
          >
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
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.4)",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: '90%',
    height: '74%',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  textWrapper: {
    marginTop: 10,
    alignItems: "center",
  },
  profileText: {
    textTransform: "uppercase",
    fontSize: 25,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 10,
  },
  profileSubText: {
    fontSize: 14,
    color: "#fafafa",
  },
  actionButton: {
    padding: 5,
  },
  actionIcon: {
    width: 35,
    height: 35,
  },
  modalContainer: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70,
    width: "85%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
    paddingVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    width: 35,
    height: 35,
  },
  editButton: {
    paddingLeft: 20,
  },
  deleteButton: {
    paddingRight: 20,
  },
  backgroundImage: {
    flex: 1,
  },
});

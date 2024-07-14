import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  scheduleNotification,
  requestPermissions,
} from "./Modal/notifications";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama_pelanggan, setNama_pelanggan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_telp, setTelp] = useState("");
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [btn, setBtn] = useState("Sign Up");
  const router = useRouter();

  useEffect(() => {
    requestPermissions();
    console.log("Component mounted");
  }, []);

  const serverUrl = "192.168.1.56"; //! ubah ip disini dengan ip server/komputer

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // read();
    readUsername();
    console.log("username1 =", users);
  }, []);

  useEffect(() => {
    console.log("username2 =", users);
  }, [users]);

  const readUsername = () => {
    axios
      .get(`http://${serverUrl}:7245/User/Usernames`)
      .then((response) => {
        const data = response.data;
        console.log("data = ", data);
        setUsers(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const submit = () => {
    const isUsernameTaken = users.some((user) => user.username === username);

    if (isUsernameTaken) {
      alert("Username already taken. Please choose another username.");
    } else {
      const fromData = {
        username,
        password,
        role,
        nama_pelanggan,
        alamat,
        no_telp,
      };

      axios
        .post(`http://${serverUrl}:7245/User/create`, fromData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          router.push("/Login");
          scheduleNotification("Success", "Register Sukses!");
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

      setUsername("");
      setPassword("");
      setNama_pelanggan("");
      setAlamat("");
      setTelp("");
      // setBtn("Sign Up");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/pantai.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up to TRAVELkuy</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="username"
            value={username}
            onChangeText={(value) => setUsername(value)}
            placeholderTextColor="#9DB2BF"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#9DB2BF"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#9DB2BF"
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={nama_pelanggan}
            onChangeText={(value) => setNama_pelanggan(value)}
            placeholderTextColor="#9DB2BF"
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            value={alamat}
            onChangeText={(value) => setAlamat(value)}
            placeholderTextColor="#9DB2BF"
          />
          <TextInput
            style={styles.input}
            placeholder="Kontak"
            value={no_telp}
            onChangeText={(value) => setTelp(value)}
            placeholderTextColor="#9DB2BF"
          />
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>{btn}</Text>
          </TouchableOpacity>
          <Link href="/Login" style={{ color: "blue" }}>
            Sudah punya akun? Login
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 50,
  },
  inputContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  inputPassword: {
    flex: 1,
    padding: 10,
    color: "#000",
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Register;
// const read = () => {
//   axios
//     .get(`http://${serverUrl}:7245/api/User`)
//     .then((response) => {
//       const usernames = response.data.data.map((user) => user.username);
//       console.log("username3 =", usernames);

//       setUsers(usernames);
//     })
//     .catch((error) => console.error("Error:", error));
// };
// useEffect(() => {
//   read();
//   console.log("username1 =", users);
// }, []);

// http://192.168.0.130:7245/User/Usernames

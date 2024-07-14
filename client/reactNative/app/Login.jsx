import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  scheduleNotification,
  requestPermissions,
} from "./Modal/notifications";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const serverUrl = "192.168.1.56"; //! ubah ip disini dengan ip server/komputer

  useEffect(() => {
    requestPermissions();
    console.log("Component mounted");
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    axios
      .get(
        `http://${serverUrl}:7245/User/login?username=${username}&password=${password}`
      )
      .then((response) => {
        if (response.data) {
          const { id, role, nama_pelanggan, alamat, no_telp } = response.data;
          router.push({
            pathname: "/UserProfile",
            params: {
              id,
              username,
              password,
              role,
              nama_pelanggan,
              alamat,
              no_telp,
            },
          });
        } else {
          Alert.alert("Error", "Invalid username or password");
        }
        setUsername("");
        setPassword("");
        scheduleNotification("Success", "Login Berhasil!");
      })
      .catch((error) => {
        if (error.response) {
          Alert.alert(
            "Error",
            error.response.data.message || error.response.data
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          Alert.alert("Error", "No response received from server");
        } else {
          console.error("Error:", error.message);
          Alert.alert("Error", "An error occurred: " + error.message);
        }
      });
  };

  return (
    <ImageBackground
      source={require("../assets/bgLogin.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
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
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Link href="/Register" style={styles.link}>
            Belum punya akun? Buat Akun
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
    width: 450,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
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
  link: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Login;

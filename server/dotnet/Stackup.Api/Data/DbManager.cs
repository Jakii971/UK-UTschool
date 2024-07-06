using System.Data;
using System.Text.RegularExpressions;
using MySql.Data.MySqlClient;

public class DbManager
{
    private readonly string connectionString;
    private readonly MySqlConnection _connection;
    public DbManager(IConfiguration configuration) //constuctor
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
        _connection = new MySqlConnection(connectionString);
    }
    // !===========================================================================================
    // !=================================Paket=====================================================

    // GET ALL
    public List<Paket> GetAllPakets()
    {
        List<Paket> paketList = new List<Paket>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM Paket";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Paket paket = new Paket
                        {
                            id = Convert.ToInt32(reader["id"]),
                            id_subkategori = Convert.ToInt32(reader["id_subkategori"]),
                            nama_paket = reader["nama_paket"].ToString(),
                            durasi = reader["durasi"].ToString(),
                            harga = reader["harga"].ToString(),
                        };
                        paketList.Add(paket);
                    };
                };
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return paketList;
    }
    // CREATE
    public int CreatePaket(Paket paket)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO paket (id_subkategori, nama_paket, durasi, harga) VALUES (@idSubkategori, @namaPaket, @durasi, @harga)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@idSubkategori", paket.id_subkategori);
                command.Parameters.AddWithValue("@namaPaket", paket.nama_paket);
                command.Parameters.AddWithValue("@durasi", paket.durasi);
                command.Parameters.AddWithValue("@harga", paket.harga);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // UPDATE
    public int UpdatePaket(int id, Paket paket)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE paket SET id_subkategori = @idSubkategori, nama_paket = @namaPaket, durasi = @durasi, harga = @harga WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@idSubkategori", paket.id_subkategori);
                command.Parameters.AddWithValue("@namaPaket", paket.nama_paket);
                command.Parameters.AddWithValue("@durasi", paket.durasi);
                command.Parameters.AddWithValue("@harga", paket.harga);
                command.Parameters.AddWithValue("@Id", paket.id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // DELETE
    public int DeletePaket(int id)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "DELETE FROM paket WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // !===========================================================================================
    // !=================================Kategori==================================================

    // GET ALL
    public List<Kategori> GetAllKategoris()
    {
        List<Kategori> kategoriList = new List<Kategori>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM kategori_destinasi";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Kategori kategori = new Kategori
                        {
                            id = Convert.ToInt32(reader["id"]),
                            nama_kategori = reader["nama_kategori"].ToString(),
                            deskripsi = reader["deskripsi"].ToString(),
                            image = reader["image"].ToString(),
                        };
                        kategoriList.Add(kategori);
                    };
                };
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return kategoriList;
    }
    // CREATE
    public int CreateKategori(Kategori kategori)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO kategori_destinasi (nama_kategori, deskripsi, image) VALUES (@NamaKategori, @deskripsi, @image)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@NamaKategori", kategori.nama_kategori);
                command.Parameters.AddWithValue("@deskripsi", kategori.deskripsi);
                command.Parameters.AddWithValue("@image", kategori.image);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // UPDATE
    public int UpdateKategori(int id, Kategori kategori)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE kategori_destinasi SET nama_kategori = @NamaKategori, deskripsi = @Deskripsi, image = @image WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@NamaKategori", kategori.nama_kategori);
                command.Parameters.AddWithValue("@Deskripsi", kategori.deskripsi);
                command.Parameters.AddWithValue("@image", kategori.image);
                command.Parameters.AddWithValue("@Id", kategori.id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // DELETE
    public int DeleteKategori(int id)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "DELETE FROM kategori_destinasi WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // !==============================================================================================
    // !=================================Subkategori==================================================

    // GET ALL
    public List<Subkategori> GetAllSubkategoris()
    {
        List<Subkategori> subkategoriList = new List<Subkategori>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM subkategori_destinasi";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Subkategori subkategori = new Subkategori
                        {
                            id = Convert.ToInt32(reader["id"]),
                            id_kategori = Convert.ToInt32(reader["id_kategori"]),
                            image = reader["Image"].ToString(),
                            nama_subkategori = reader["nama_subkategori"].ToString(),
                            deskripsi = reader["Deskripsi"].ToString()
                        };
                        subkategoriList.Add(subkategori);
                    };
                };
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return subkategoriList;
    }
    // CREATE
    public int CreateSubkategori(Subkategori subkategori)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO subkategori_destinasi (id_kategori, nama_subkategori, image, deskripsi) VALUES (@IdKategori,  @namaSubkategori, @Image, @Deskripsi)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@IdKategori", subkategori.id_kategori);
                command.Parameters.AddWithValue("@namaSubkategori", subkategori.nama_subkategori);
                command.Parameters.AddWithValue("@Image", subkategori.image);
                command.Parameters.AddWithValue("@Deskripsi", subkategori.deskripsi);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // UPDATE
    public int UpdateSubkategori(int id, Subkategori subkategori)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE subkategori_destinasi SET id_kategori = @IdKategori, nama_subkategori = @NamaSubkategori, deskripsi = @Deskripsi, image = @Image WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@IdKategori", subkategori.id_kategori);
                command.Parameters.AddWithValue("@NamaSubkategori", subkategori.nama_subkategori);
                command.Parameters.AddWithValue("@Deskripsi", subkategori.deskripsi);
                command.Parameters.AddWithValue("@Image", subkategori.image);
                command.Parameters.AddWithValue("@Id", subkategori.id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // DELETE
    public int DeleteSubkategori(int id)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "DELETE FROM subkategori_destinasi WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // !==============================================================================================
    // !========================================User==================================================

    // GET ALL
    public List<User> GetAllUsers()
		{
				List<User> userList = new List<User>();
				try
				{
						using (MySqlConnection connection = new MySqlConnection(connectionString))
						{
								string query = "SELECT * FROM users";
								MySqlCommand command = new MySqlCommand(query, connection);
								connection.Open();
								using (MySqlDataReader reader = command.ExecuteReader())
								{
										while (reader.Read())
										{
												User user = new User
												{
														id = Convert.ToInt32(reader["id"]),
														username = reader["username"].ToString(),
														password = reader["password"].ToString(),
														role = reader["role"].ToString(),
														nama_pelanggan = reader["nama_pelanggan"].ToString(),
														alamat = reader["alamat"].ToString(),
														no_telp = reader["no_telp"].ToString(),
												};
												
												userList.Add(user);
										}
								}
						}
				}
				catch (Exception ex)
				{
						Console.WriteLine(ex.Message);
				}
				return userList;
		}

    // CREATE
		public int CreateUser(User user)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "INSERT INTO users (username, password, role, nama_pelanggan, alamat, no_telp) VALUES (@username, @password, @role, @nama_pelanggan, @alamat, @no_telp)";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@username", user.username);
                    command.Parameters.AddWithValue("@password", user.password);
                    command.Parameters.AddWithValue("@role", user.role);
                    command.Parameters.AddWithValue("@nama_pelanggan", user.nama_pelanggan);
                    command.Parameters.AddWithValue("@alamat", user.alamat);
                    command.Parameters.AddWithValue("@no_telp", user.no_telp);

                    connection.Open();
                    return command.ExecuteNonQuery();
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return 0; // or handle the error appropriately
        }
    }

    // UPDATE
    public int UpdateUser(int id, User user)
		{
				try
				{
						using (MySqlConnection connection = new MySqlConnection(connectionString))
						{
								string query = "UPDATE users SET username = @username, password = @password, role = @role, nama_pelanggan = @nama_pelanggan, alamat = @alamat, no_telp = @no_telp WHERE id = @Id";
								using (MySqlCommand command = new MySqlCommand(query, connection))
								{
										command.Parameters.AddWithValue("@username", user.username);
										command.Parameters.AddWithValue("@password", user.password);
										command.Parameters.AddWithValue("@role", user.role?.ToString());
										command.Parameters.AddWithValue("@nama_pelanggan", user.nama_pelanggan);
										command.Parameters.AddWithValue("@alamat", user.alamat);
										command.Parameters.AddWithValue("@no_telp", user.no_telp);
										command.Parameters.AddWithValue("@Id", id);

										connection.Open();
										return command.ExecuteNonQuery();
								}
						}
				}
				catch (Exception ex)
				{
						Console.WriteLine(ex.Message);
						return 0;
				}
		}


    // DELETE
    public int DeleteUser(int id)
		{
				try
				{
						using (MySqlConnection connection = new MySqlConnection(connectionString))
						{
								string query = "DELETE FROM users WHERE id = @Id";
								using (MySqlCommand command = new MySqlCommand(query, connection))
								{
										command.Parameters.AddWithValue("@Id", id);

										connection.Open();
										return command.ExecuteNonQuery();
								}
						}
				}
				catch (Exception ex)
				{
						Console.WriteLine(ex.Message);
						return 0;
				}
		}

}


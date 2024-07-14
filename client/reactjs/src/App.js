import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./component/menu/Menu";
import Home from "./component/home/Home";

import DataUser from "./component/master_data/user/User";
import DataUserAdd from './component/master_data/user/UserAdd';
import DataUserEdit from './component/master_data/user/UserEdit';

import DataKategori from "./component/master_data/kategori/Kategori";
import DataKategoriAdd from "./component/master_data/kategori/KategoriAdd";
import DataKategoriEdit from "./component/master_data/kategori/KategoriEdit";

import DataSubkategori from "./component/master_data/subkategori/Subkategori";
import DataSubkategoriAdd from "./component/master_data/subkategori/SubkategoriAdd";
import DataSubkategoriEdit from "./component/master_data/subkategori/SubkategoriEdit";

import DataPaket from "./component/master_data/paket/Paket";
import DataPaketAdd from "./component/master_data/paket/PaketAdd";
import DataPaketEdit from "./component/master_data/paket/PaketEdit";

import DataTransaksi from "./component/master_data/transaksi/Transaksi";

function App() {
  return (
    <Router basepath="./my-app">
      <div className="app-header">
        <Menu />
      </div>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/datakategori" element={<DataKategori />} />
          <Route path="/datakategori-add" element={<DataKategoriAdd />} />
          <Route path="/datakategori-edit/:id" element={<DataKategoriEdit />} />

          <Route path="/datasubkategori" element={<DataSubkategori />} />
          <Route path="/datasubkategori-add" element={<DataSubkategoriAdd />} />
          <Route
            path="/datasubkategori-edit/:id"
            element={<DataSubkategoriEdit />}
          />

          <Route path="/datapaket" element={<DataPaket />} />
          <Route path="/datapaket-add" element={<DataPaketAdd />} />
          <Route path="/datapaket-edit/:id" element={<DataPaketEdit />} />

          <Route path="/datauser" element={<DataUser />} />
          <Route path="/datauser_add" element={<DataUserAdd />} />
          <Route path="/datauser_edit/:id" element={<DataUserEdit />} />

          <Route path="/datatransaksi" element={<DataTransaksi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

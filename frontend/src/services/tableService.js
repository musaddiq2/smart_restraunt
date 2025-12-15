import axios from "axios";

const API = "/api/tables";

const token = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const getTables = async () => {
  const res = await axios.get(API, token());
  return res.data.tables;
};

const addTable = async (data) => {
  const res = await axios.post(API, data, token());
  return res.data.table;
};

const deleteTable = async (id) => {
  await axios.delete(`${API}/${id}`, token());
  return id;
};

export default { getTables, addTable, deleteTable };

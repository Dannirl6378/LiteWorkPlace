import { fetchData } from "./AxiosUtils";

export async function getUsers() {
  // Nyní použijte API klíč v hlavičce Axiosu
  const data = JSON.stringify({
    collection: "Test-users",
    database: "Users",
    dataSource: "Cluster0",
    projection: {
      _id: 1,
      user: "",
    },
  });
  const config = {
    method: "get",
    url: "http://localhost:3001/registerUser",
    data: data,
  };
  return (response = await fetchData(config));
}

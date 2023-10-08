import axios from "axios";

export async function fetchData() {
  try {
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
      url: "http://localhost:3001/getUsers",
      data: data,
    };
    const response = await axios(config);
    console.log(response.data);
    const data2 = JSON.stringify(response.data);
    console.log(data2);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

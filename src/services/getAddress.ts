import axios from "axios";

export async function getAddress(postal: string) {
  const response = await axios({
    method: "get",
    url: "https://developers.onemap.sg/commonapi/search",
    params: {
      searchVal: postal,
      returnGeom: "Y",
      getAddrDetails: "Y",
      pageNum: "1",
    },
  });
  return response.data.results[0];
}

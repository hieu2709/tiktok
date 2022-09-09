import * as request from "~/utils/request";
export const getSuggest = async () => {
  try {
    const res = await request.get("auth/me");
    return res.data;
    // setSearchResult(res.data);
    // setLoading(false);
  } catch (error) {
    // setLoading(false);
    console.log(error);
  }
};

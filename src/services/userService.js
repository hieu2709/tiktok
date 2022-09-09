import * as request from "~/utils/request";
export const getSuggest = async ({ page, perPage }) => {
  try {
    const res = await request.get("users/suggested", {
      params: { page, per_page: perPage },
    });
    return res.data;
    // setSearchResult(res.data);
    // setLoading(false);
  } catch (error) {
    // setLoading(false);
    console.log(error);
  }
};

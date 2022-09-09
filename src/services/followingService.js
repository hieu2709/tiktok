import * as request from "~/utils/request";
export const getFollowing = async ({ page }) => {
  try {
    const res = await request.get("me/followings", {
      params: { page },
    });
    return res.data;
    // setSearchResult(res.data);
    // setLoading(false);
  } catch (error) {
    // setLoading(false);
    console.log(error);
  }
};

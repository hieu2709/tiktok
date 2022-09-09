import * as request from "~/utils/request";
export const getVideo = async (type, page) => {
  try {
    const res = await request.get("videos", {
      params: { type, page },
    });
    return res.data;
    // setSearchResult(res.data);
    // setLoading(false);
  } catch (error) {
    // setLoading(false);
    console.log(error);
  }
};

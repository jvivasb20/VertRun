import createAxiosInstance from "./api";

interface FetchActivitiesParams {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
}

export const fetchActivities = async (
  token: string,
  params: FetchActivitiesParams,
) => {
  try {
    const axiosInstance = createAxiosInstance(token);

    console.log("fetching activities");
    console.log("params", params);

    const response = await axiosInstance.get("/athlete/activities", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);

    throw error;
  }
};

export const fetchActivity = async (token: string, id: number) => {
  try {
    const axiosInstance = createAxiosInstance(token);

    const response = await axiosInstance.get(`/activities/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }
};

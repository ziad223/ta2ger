import axios from "axios";
import { base_url } from "./config";

const apiServiceCall = async ({ url, method, body, headers }) => {
  console.log("api service call run");
  console.log("data we need to see", body);

  try {
    // 👇 نتحقق إذا كان الـ body عبارة عن FormData
    const isFormData = body instanceof FormData;

    const response = await axios({
      method: (method && method.toUpperCase()) || "GET",
      url: `${base_url}${url}`,
      data: body,
      headers: {
        ...(isFormData
          ? {} // axios هيضيف Content-Type المناسب تلقائيًا
          : { "Content-Type": "application/json" }),
        ...headers,
      },
    });

    console.log("xxxxxxxxxxxxxxx", response?.data, method);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export default apiServiceCall;

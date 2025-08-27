import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/image`;

// POST | upload a file | create
export const uploadMedia = (FormData, onProgressCallBack) => {
  return axiosApiCall({
    method: "post",
    url: USER_API_URL,
    data: FormData,
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      // Simulate smoother progress for small files
      if (onProgressCallBack) {
        if (percent === 100) {
          // fake gradual fill for UX
          let current = 90;
          const interval = setInterval(() => {
            current += 2;
            if (current >= 100) {
              clearInterval(interval);
              onProgressCallBack(100);
            } else {
              onProgressCallBack(current);
            }
          }, 50);
        } else {
          onProgressCallBack(percent);
        }
      }
    },
  });
};

/// DELETE | delete a file | delete
export const mediaDelete = (publicId) => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/delete/${publicId}`,
  });
};

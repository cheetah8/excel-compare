import axios from "axios";

export const fetcher = async (url: string) => {
  return axios.get(url).then((res) => res.data);
};

export const postFetcher = async (
  url: string,
  body?: any,
  headers?: any,
  onUploadProgress?: any,
) => {
  return axios
    .post(url, body, {
      onUploadProgress: onUploadProgress,
      headers: {
        ...headers,
      },
    })
    .then((res) => res.data);
};

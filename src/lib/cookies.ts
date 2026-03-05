import cookies from "js-cookie";

export const setAccessToken = (token: string) => {
  cookies.set("access_token", token, {
    expires: 1,
    secure: true,
    sameSite: "strict",
  });
};

export const getAccessToken = () => {
  return cookies.get("access_token");
};

export const removeAccessToken = () => {
  cookies.remove("access_token");
};

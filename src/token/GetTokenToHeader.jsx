import { getAccessCookie } from "../Cookie/cookie";

const GetTokenToHeader = () => {
  const getAccessToken = () => {
    return getAccessCookie();
  };

  const accessToken = getAccessToken();

  console.log(accessToken);
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export default GetTokenToHeader;

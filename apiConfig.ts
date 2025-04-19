// ------------------------------------------------ RUTAS DE LA API --------------------------------------------------

const BASE_URL = "https://spotify-backend-production-20df.up.railway.app";
const BASE_URL_DEV = "http://192.168.0.195:3000";

const API_ROUTES = {
  //----------------------------- GET -----------------------------//

  //----------------------------- POST -----------------------------//

  //USER
  LOGIN: `${BASE_URL}/user/login`,
  REGISTER: `${BASE_URL}/user/create`,

  LOGIN_DEV: `${BASE_URL_DEV}/user/login`,
  REGISTER_DEV: `${BASE_URL_DEV}/user/create`,
  //----------------------------- DELETE -----------------------------//

  //USER
  DELETE_USER: `${BASE_URL}/user`,
  DELETE_USER_DEV: `${BASE_URL_DEV}/user`,
};

export { BASE_URL, API_ROUTES };

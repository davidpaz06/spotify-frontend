// ------------------------------------------------ RUTAS DE LA API --------------------------------------------------

const BASE_URL = "https://spotify-backend-production-20df.up.railway.app";

const API_ROUTES = {
  //----------------------------- GET -----------------------------//

  //GROUPS
  GROUPS: `${BASE_URL}/groups`, //GRUPOS DEL USUARIO

  //----------------------------- POST -----------------------------//

  //USER
  LOGIN: `${BASE_URL}/user/login`,
  REGISTER: `${BASE_URL}/user/create`,

  //----------------------------- DELETE -----------------------------//

  //USER
  DELETE_USER: `${BASE_URL}/users`, //ELIMINAR USUARIO
};

export { BASE_URL, API_ROUTES };

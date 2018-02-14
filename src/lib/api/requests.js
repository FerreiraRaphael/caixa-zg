import axios from "axios";

/**
 * Wrapper function to add Authorization Bearer token to header.
 * @function headerWithAuth
 * @param {object} header Header options
 * @return {Function} Function that receives a token and returns a header object.
 */
const headerWithAuth = header => token => ({
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token || ""}` } : {}),
    ...header
  }
});

/**
 * HTTP method GET
 * @function GET
 * @param  {string} url Url to request.
 * @param  {object} options Request options.
 * @param  {object} options.params Request params.
 * @param  {string} options.token Authentication token.
 * @param  {header} options.header Request header. 
 * @param  {object} config All options possible in the axios.get mothod see: https://github.com/axios/axios
 * @return {Promise} Promise of the Request.
 */
export function GET(url, { params, token = "", header = {}, ...config }) {
  return axios.get(url, {
    params,
    ...headerWithAuth(header)(token),
    ...config
  });
}

/**
 * HTTP method POST
 * @function POST
 * @param  {string} url Url to request.
 * @param  {object} data Data to be send.
 * @param  {object} options Request options.
 * @param  {string} options.token Authentication token.
 * @param  {header} options.header Request header. 
 * @param  {object} config All options possible in the axios.post mothod see: https://github.com/axios/axios
 * @return {Promise} Promise of the Request.
 */
export function POST(url, data, { token = "", header = {}, ...config }) {
  return axios.post(url, data, { ...headerWithAuth(header)(token), ...config });
}

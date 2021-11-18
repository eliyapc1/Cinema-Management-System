import axios from "axios";
import Joi from 'joi-browser';

const fetchData = async (APIname, setAll, id) => {
  try {
    const API = `http://localhost:8001/api/${APIname}/${id}`;
    const { data } = await axios.get(API);
    // if (APIname === "subscriptions") console.log(data);
    setAll(data);
  } catch (err) {
    console.log(err);
  }
};
// prettier-ignore
const handleInput = (e, objToSet, setObj) => {
  const {target: { name, value } } = e;
  setObj({ ...objToSet, [name]: value });
};
// prettier-ignore
const handleCheck = (e, movie, setMovie) => {
  const {target: { name, checked } } = e;
  let { genres } = movie;
  if (checked) {
    if (!genres.includes(name)) genres.push(name);
  } else genres = genres.filter((gen) => gen !== name);
  setMovie({ ...movie, genres });
};

const sendData = async (
  e,
  API,
  action,
  objToSend,
  setSent,
  _id,
  renderParent
) => {

  e.preventDefault();
  const URL = `http://localhost:8001/api/${API}`;
  try {
    action === "post"
      ? await axios.post(URL, objToSend)
      : await axios.put(`${URL}/${_id}`, objToSend);
    setSent(true);

    if (renderParent) {
      let [render, setRender] = renderParent;
      setRender(++render);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async (domain, id, renderParent) => {
  const URL = `http://localhost:8001/${domain}`;
  try {
    await axios.delete(`${URL}/${id}`);
    if (renderParent) {
      let [render, setRender] = renderParent;
      setRender(++render);
    }
  } catch (err) {
    console.log(err);
  }
};

const joiValid = (obj, schema) => {
  console.log(obj);
  const result = Joi.validate(obj, schema, { abortEarly: false });
  if (!result.error) return null;
  const joiErrors = {};
  for (const error of result.error.details) {
    joiErrors[error.path[0]] = error.message;
  }
  return joiErrors;
};

export { fetchData, handleInput, handleCheck, sendData, deleteData, joiValid };

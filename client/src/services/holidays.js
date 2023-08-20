import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/'
// const baseUrl = '/api/users'

const getOrtho = (day, month) => {
  return (
    axios
      .get(`${baseUrl}goc?day=${day}&month=${month}`)
      .then(response => {
        // console.log(response.data);
        return response.data
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  )
}

const getCath = () => {
  return (
    axios
      .get(baseUrl + 'rcc')
      .then(response => {
        // console.log(response.data);
        return response.data
      })
  )
}

export default { getOrtho, getCath }
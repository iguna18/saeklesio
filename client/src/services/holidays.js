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

const getCath = (day, month) => {
  
  return (
    axios
      .get(`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/2015/${month}/${day}`)
      .then(response => {
        // console.log(response.data);
        return response.data
      })
  )
}

export default { getOrtho, getCath }
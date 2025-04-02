import axios from "axios"

const uri = `http://192.168.0.4:8080`
const api = axios.create({
  baseURL: uri,
  headers: {
    'Content-Type': 'application/json',
  },

})

const get = async (rec: string) => {
  try {
    const response = await api.get(rec)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error("Error fetching data: ", err)
    return []
  }
}

async function post(rec: string, content: {}) {
  try {
    const response = await api.post(rec, content, { headers: { 'Content-Type': 'application/json' } })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error("Error posting data: ", err)
    return null
  }
}

export default { get, post }
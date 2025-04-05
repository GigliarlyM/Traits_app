import axios, { AxiosBasicCredentials, AxiosError } from "axios"

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
    console.error("Ocorreu um erro com o a requisicao ao server ", uri)
    return []
  }
}

async function post(rec: string, content: {}) {
  try {
    const response = await api.post(rec, content,
      {
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      }
    )
    console.log(response.data)
    return response.data
  } catch (err) {
    // console.error("Error posting data: ", (err as AxiosError), uri)
    console.error((err as AxiosError))
    return null
  }
}

async function postWithAuth(rec: string, content: {}, auth: string) {
  try {
    const response = await api.post(rec, content,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        method: "POST",
      }
    )
    console.log(response.data)
    return response.data
  } catch (err) {
    // console.error("Error posting data: ", (err as AxiosError), uri)
    console.error((err as AxiosError))
    return null
  }
}

async function getWithAuth(rec: string, auth: string) {
  try {
    const response = await api.get(rec, {
      headers: {
        Authorization: `Bearer ${auth}`,
      }
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    if ((err as AxiosError).message.indexOf("404") != -1) {
      console.error("Recurso nao encontrado")
    } else {
      console.error((err as AxiosError).message)
    }
    return null
  }
}

export default { get, post, postWithAuth, getWithAuth }
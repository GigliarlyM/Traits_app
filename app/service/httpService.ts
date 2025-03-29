import axios from "axios"

const uri = `http://192.168.0.4:8080`

const get = async (rec: String) => {
    try {
        const response = await axios.get(uri + rec)
        return response.data
    } catch (err) {
        console.error("Error fetching data: ", err)
    }
}

export default { get }
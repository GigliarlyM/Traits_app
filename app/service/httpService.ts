import axios from "axios"

const uri = `http://localhost:8080`

const get = async (rec: String) => {
    try {
        const response = await axios.get(uri + rec)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.error("Error fetching data: ", err)
        return []
    }
}

export default { get }
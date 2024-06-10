import axios from "axios"

const callAPIOnButtonClick = async (type: string, url: string, parameters?: object, headers?: object, formData?: any, isFileThere?: boolean) => {
    try {
        if (type == "GET") {
            const response = await axios.get(url, { headers });
            const data = await response.data;
            return { statusFromBackend: response.status, dataFromBackend: data };
        } else if (type == "POST") {
            if (isFileThere) {
                const response = await axios({
                    method: "POST",
                    baseURL: url,
                    data: formData,
                    headers
                })
                const data = await response.data;
                return { statusFromBackend: response.status, dataFromBackend: data };
            } else {
                const response = await axios.post(url, parameters, { headers, data: formData });
                const data = await response.data;
                return { statusFromBackend: response.status, dataFromBackend: data };
            }
        } else if (type == "PUT") {
            if (isFileThere) {
                const response = await axios({
                    method: "PUT",
                    baseURL: url,
                    data: formData,
                    headers
                })
                const data = await response.data;
                return { statusFromBackend: response.status, dataFromBackend: data };
            } else {
                const response = await axios.put(url, parameters, { headers });
                const data = await response.data;
                return { statusFromBackend: response.status, dataFromBackend: data };
            }
        } else {
            const response = await axios.delete(url, parameters);
            const data = await response.data;
            return { statusFromBackend: response.status, dataFromBackend: data };
        }
    } catch (error) {
        console.log("Error in calling the api : " + error)
    }
}

export default callAPIOnButtonClick;
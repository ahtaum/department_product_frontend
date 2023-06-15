type API = {
    data_api: any,
    token?: string
}

const UrlApi: API = {
    // "data_api": `http://127.0.0.1:3333/v1/` // local
    "data_api": `https://departmentproductbackend-production.up.railway.app/v1/` // online
}

export default UrlApi
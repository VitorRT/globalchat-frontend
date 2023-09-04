import manifest from './manifest.json';
import axios from 'axios';

const client = axios.create({
    baseURL: manifest['base_url'],
    timeout: 50000
})

async function ping() {
    try {
        const res = await client.get("/ping");
    } catch (error) {
        throw new Error(error.message);
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}



const api = {
    registerUser: async (payload) => {
        try {
            await ping();
            const requestBody = {
                "username": payload.username,
                "formal_name": payload.formalName,
                "password": payload.password
            };
            const apiResponse = await client.post("/users", requestBody);
            let response = {
                status: apiResponse.status,
                body: apiResponse.status !== 201 ? apiResponse.data.error : apiResponse.data,
                error: apiResponse.status !== 201,
            };
            return response;
        } catch (error) {
            return {
                status: 400,
                body: {
                    error: "Username já em uso, tente outro.",
                },
                error: true,
            };
        }
    },
    login: async (payload) => {
        try {
            await ping();
            const requestBody = {
                "username": payload.username,
                "password": payload.password,
            };
            const apiResponse = await client.post("/auth", requestBody);
            let response = {
                status: apiResponse.status,
                body: apiResponse.status !== 200 ? apiResponse.data.error : apiResponse.data,
                error: apiResponse.status !== 200,
            };
            return response;
        } catch (error) {
            return {
                status: 400,
                body: "credenciais erradas.",
                error: true,
            };
        }
    },
    test: async () => {
        let count = 0;
        let success = false;
        let response = null;
        let chances = 5;
        while (count <= chances && !success) {
            try {
                const apiResponse = await client.get("/ping");
                response = {
                    status: apiResponse.status,
                    success: true,
                };
                success = true;
            } catch (error) {
                if (count === chances) {
                    response = {
                        status: 500,
                        success: false,
                        message: "O servidor está desligado temporariamente para manutenção.",
                    };
                }
                count++;
                await sleep(3000);
            }
        }

        return response;
    },
    listMessages: async () => {
        try {
            await ping();
            const apiResponse = await client.get("/messages");
            let response = {
                status: apiResponse.status,
                body: apiResponse.status !== 200 ? apiResponse.data.error : apiResponse.data.content,
                error: apiResponse.status !== 200,
            };
            return response;
        } catch (error) {
            return {
                status: 400,
                body: "erro ao requisitar as mensagens.",
                error: true,
            };
        }
    }
};

export default api;

import http from "./axios";
export interface APIData {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number,
        count: number
    }
}

interface Params {
    [key: string]: any;
}
export const getAPI = async (endpoint: string, params: Params = {}): Promise<APIData[]> => {
    try {
        const response = await http.get(endpoint, { params });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const postAPI = async (endpoint: string, data: any): Promise<APIData> => {
    try {
        const response = await http.post(endpoint, data);
        if (response.data.status === 400) {
           
        }
        return response.data as APIData;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const putAPI = async (endpoint: string, data: any): Promise<APIData> => {
    try {
        const response = await http.put(endpoint, data);

        return response.data as APIData;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteAPI = async (endpoint: string) => {
    try {
        const response = await http.delete(endpoint);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

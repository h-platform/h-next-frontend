import axios from 'axios';
import { CommandResponse } from './command-response';
export const BASE_URL = '/api';

function handleError (err: any) {
    if (err.isAxiosError) {
        return err.response.data
    } else {
        return err
    }
}

export async function command(module: string, command: string, payload: any): Promise<CommandResponse<any>> {
    try {
        const token = window?.localStorage.getItem('token') || '';
        const { data } = await axios.post<CommandResponse<any>>(`${BASE_URL}/${module}/commands/${command}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        return data as CommandResponse<any>;
    } catch (err) {
        throw handleError(err);
    }
}

export async function query(module: string, query: string, payload: any) {
    try {
        const token = window?.localStorage.getItem('token') || '';
        const { data } = await axios.post(`${BASE_URL}/${module}/queries/${query}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        return data;
    } catch (err) {
        throw handleError(err);
    }
}

export async function post<T>(url: string, payload: any) {
    const token = localStorage.getItem('token')
    const response = await axios.post<T>(`${BASE_URL}/${url}`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    return response.data
}

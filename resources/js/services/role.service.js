import axios from "axios";

const SERVICE_URI = "/api/admin/roles";
/**
 * @typedef {Object} Role
 * @property {number} id
 * @property {string} name
 */

/**
 * @returns {Promise<Role[]>}
 */
export async function listData() {
    const res =  await axios.get(SERVICE_URI);
    return res.data.data;
}

export async function getData(userId) {
    const res = await axios.get(`${SERVICE_URI}/${userId}`);
    return res.data.data;
}

export async function createData(payload) {
    try {
        return await axios.post(`${SERVICE_URI}`, payload?.value);
    } catch (err) {
        throw err
    }
}

export async function updateData(userId, payload) {
    try {
        return await axios.put(`${SERVICE_URI}/${userId}`, payload?.value);
    } catch (err) {
        throw err
    }
}

export function fetchPermissions() {
    return axios.get('/api/admin/permissions')
}

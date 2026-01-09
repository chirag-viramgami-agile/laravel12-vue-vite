import axios from "axios";

const SERVICE_URI = "/api/admin/users";
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @returns {Promise<User[]>}
 */
export async function fetchUsers(page = 1) {
    const res = await axios.get(`${SERVICE_URI}?page=${page}`);
    return res;

    return {
        items: res.data.data,
        meta: res.data.meta,
        links: res.data.links,
    };
}

export async function getUser(userId) {
    const res = await axios.get(`${SERVICE_URI}/${userId}`);
    return res.data.data;
}

export async function createUser(payload) {
    try {
        return await axios.post(`${SERVICE_URI}`, payload?.value);
    } catch (err) {
        throw err
    }
}

export async function updateUser(userId, payload) {
    try {
        return await axios.put(`${SERVICE_URI}/${userId}`, payload?.value);
    } catch (err) {
        throw err
    }
}


export async function userDelete(userId) {
    if(confirm("Are you sure want delete ?")){
        const res = await axios.delete(`${SERVICE_URI}/${userId}`);
        return res.data;
    }
    return false;
}

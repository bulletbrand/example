import API from '../services/api-service'

export const asyncRequest = async ({method = 'GET', url, data = {}}) => await API({method, url, data})
export const checkAuthAccess = async () => await API.post('auth/check')



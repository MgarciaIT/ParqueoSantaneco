/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 20/05/2023                                             *
 * @description Modulo Para URL de la Api                       *
****************************************************************/

import axios from 'axios'

export const makeRequest = axios.create({
    baseURL: "http://localhost:4000/api/",
    withCredentials: true
})
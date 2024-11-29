import request from "../utils/request.js";
export function getTotal(){
    return request.get(`api/power/getTotal`)
}
export function getTotalCount(){
    return request.get(`api/power/getTotalCount`)
}
export function getAll(){
    return request(`api/warn/getAll`)}
export function getTables(){
    return request(`api/prod/getTables`)}
export function totalAll(){
    return request(`api/sales/queryTotalUp`)
}
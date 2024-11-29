import request from "../utils/request.js";
export function getTotal(){
    return request.get(`api/power/getTotal`)
}
export function getTotalCount(){
    return request.get(`api/power/getTotalCount`)
}
//这个是第第一个饼图差的
// ：能耗占比图中需显示办公耗电量、
// 办公用水量、生产用水量、生产耗电量的数量及占能耗总数的比
// 例。有比例了差数量
export function getTotalValues(){
    return request.get(`api/power/getTotalValues`)
}
export function getAll(){
    return request(`api/warn/getAll`)}
export function getTables(){
    return request(`api/prod/getTables`)}
export function totalAll(){
    return request(`api/sales/queryTotalUp`)
}export function getTotalValues(){
    return request.get(`api/power/getTotalValues`)
}
export function getCarbonTotal(){
    return request.get(`api/prod/queryCarbons`)
}
export function getTwoSales(){
    return request.get(`api/sales/queryOver`)
}
export function queryPlan(){
    return request.get(`api/sales/queryPlan`)
}
export function queryTotal(){
    return request.get(`api/sales/queryTotal`)
}
export function salesRank(){
    return request.get(`api/sales/queryEightSales`)
}
import  axios from "./mainApi";

class reports {
    static getResturants() {
        return axios().get("resturants")
    }
    static getDriver() {
        return axios().get("driver")
    }
    static getOrders() {
        return axios().get("orders-all")
    }

}
export default reports
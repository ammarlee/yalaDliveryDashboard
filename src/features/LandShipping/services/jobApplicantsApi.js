import  axios from "./mainApi";

class applicants {
    static statusChange (status) {
        return axios().put("request", status)
    }
    static deleteRequest (requestId) {
        return axios().delete(`request/${requestId}`)
    }
    static getRequest () {
        return axios().get("request/all")
    }
    
}
export default applicants
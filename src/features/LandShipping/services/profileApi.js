import  axios from "./mainApi";

class profile {
    static AddImgProfile(profileData) {
        return axios().put("employee-img", profileData)
    }
    static editInfo(info) {
        return axios().put("employee", info)
    }
    static changePassword(newPassword) {
        return axios().put("Employee/change-password", newPassword)
    }
    static getProfile(profiletId) {
        return axios().get(`user/${profiletId}`)
    }
    
}
export default profile
import  axios from "./mainApi";

class resturant {
    static getresturants() {
        return axios().get("resturants")
    }
    static editResturant(resturant) {
        return axios().put("user/edit-profile", resturant)
    }
    static createResturant(resturant) {
        return axios().post("user/signup", resturant)
    }
    static imgResturant(imgResturant) {
        return axios().put("user/update-img", imgResturant)
    }
    static deleteResturant(esturantId) {
        return axios().delete(`user/${esturantId}`)
    }
}
export default resturant

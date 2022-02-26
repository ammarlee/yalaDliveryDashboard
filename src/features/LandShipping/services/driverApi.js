import  axios from "./mainApi";

class divers {
  static editDriver (diver) {
    return axios().put("driver", diver)
  }
  static createDriver (diver) {
    return axios().post("driver", diver)
  }
  static addDriverImg (diverImg) {
    return axios().put("driver-img", diverImg)
  }
  static deleteDriver (diverId) {
    return axios().delete(`driver/${diverId}`)
  }
  static getDriver () {
    return axios().get("driver")
  }
  
}

export default divers
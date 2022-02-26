import  axios from "./mainApi";

class categories {
    static createCategory(category) {
        return axios().post("add-category", category)
    }
    static editCategory(category) {
        return axios().post("category-edit", category)
    }
    static deleteCategory(categoryId) {
        return axios().delete(`user/${categoryId}`)
    }
    static getCategory(resturantId) {
        return axios().get(`resturant/categories/${resturantId}`)
    }
}
export default categories

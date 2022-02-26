import  axios from "./mainApi";

class products {
    static CreateProducts(product) {
        return axios().post("file-upload", product)
    }
    static editProducts(productId, product) {
        return axios().put(`file/edit/${productId}`, product)
    }
    static deleteProductImg(productImgId, imgSrc ) {
        return axios().post(`img/delete/${productImgId}`, imgSrc)
    }
    static deleteProduct(productId ) {
        return axios().delete(`${productId}`)
    }
    static getProducts(products ) {
        return axios().get(`resturant/products/${products}`)
    }
    static getCategories(products ) {
        return axios().get(`resturant/categories/${products}`)
    }
    
}
export default products
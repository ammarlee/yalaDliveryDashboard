<template>
  <div>
      <AddImg
        @closeAddImg="$emit('colseDialogAddImg')"
        @AddImgs="addImg"
        :loading="loading"
        :content="user.img ? 'تأكيد تغير صورة الموظف' : 'تأكيد وضع صورة جديدة للموظف'"
      ></AddImg>
  </div>
</template>

<script>
import employeesApi from "../../services/employeesApi";

export default {
  props: ["user","images"],
  data() {
    return {
      // openAddImg: false,
      loading: false,
   
    };
  },
  methods: {
    async addImg() {
      try {
        console.log(this.images[0]);
        console.log(this.user._id);
        const formData = new FormData();
        formData.append("files", this.images[0]);
        formData.append("_id", this.user._id);
        this.loading = true;
        const res = await employeesApi.addEmployeesImg(formData);
        console.log(res);
        this.loading = false;
        // this.openAddImg = false;
        this.$emit("colseDialogAddImg")

        let imgInfo = res.data.user;
        this.$emit("imgInfo", imgInfo)
        this.ToasteSuccessMsg("تم اضافة صورة للموظف بنجاح");
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.toastErrorMsg("يوجد خطأ اثناء اضافة صورة للموظف");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

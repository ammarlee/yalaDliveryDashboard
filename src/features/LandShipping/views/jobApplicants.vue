<template>
  <div>
    <v-dialog v-model="openSingleReq" width="500" persistent>
      <jobApplocantsData
        @closeDilogJobApllicants="openSingleReq = false"
        :singleRequest="singleRequest"
      ></jobApplocantsData>
    </v-dialog>

    <template>
      <h3 class="text-center mb-7 mt-5">المتقدمين للوظيفة</h3>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="بحث"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :loading="loadingMainData" :headers="headersRequest" :items="request" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="info" class="ml-2" medium @click="openSingleRequest(item)"
              >mdi-eye</v-icon
            >
            <v-icon color="error" medium @click="opendelRequest(item)">mdi-delete</v-icon>
          </template>

          <template v-slot:[`item.accept`]="{ item }">
            <v-btn v-if="item.status === 'accepted'" :loading="loading" color="success"
              ><v-icon>mdi-check-decagram</v-icon></v-btn
            >
            <v-btn v-else color="success" @click="confirmStatus(item, 'accepted')">
              قبول
            </v-btn>
          </template>
          <template v-slot:[`item.refused`]="{ item }">
            <v-btn v-if="item.status === 'refused'" color="error" :loading="loading"
              ><v-icon>mdi-check-decagram</v-icon></v-btn
            >
            <v-btn v-else color="error" @click="confirmStatus(item, 'refused')">
              رفض
            </v-btn>
          </template>
        </v-data-table>
        <v-dialog v-model="openDeleteRequest" width="500">
          <deleteItemsConfirmMsg
            :loading="loading"
            @submit="sureDelRequest"
            @closeDeleteDilog="openDeleteRequest = false"
            content="هذا المتقدم"
          ></deleteItemsConfirmMsg>
        </v-dialog>
      </v-card>
    </template>
  </div>
</template>

<script>
import jobApplicantsApi from "../services/jobApplicantsApi";
import jobApplocantsData from "./components/JobApplicantsData.vue";
export default {
  components: {
    jobApplocantsData
  },
  data() {
    return {
      search: "",
      loading: false,
      request: [],
      openSingleReq: false,
      singleRequest: {},
      requestId: null,
      openDeleteRequest: false,
      headersRequest: [
        {
          text: "الاسم",
          align: "center",
          value: "username"
        },

        {
          text: "العمر",
          align: "center",
          value: "age"
        },
        {
          text: "العنوان",
          align: "center",
          value: "address"
        },
        {
          text: "نوع الموتوسيكل",
          align: "center",
          value: "motoType"
        },
        {
          text: "رقم الهاتف",
          align: "center",
          value: "phone"
        },
        {
          text: "الحالة",
          align: "center",
          value: "status"
        },

        {
          text: "قبول",
          align: "center",
          value: "accept"
        },
        {
          text: "رفض",
          align: "center",
          value: "refused"
        },
        {
          text: "رؤية او حذف",
          align: "center",
          value: "actions"
        }
      ]
    };
  },
  methods: {
    async confirmStatus(item, status) {
      if (status === "accepted") {
        item.status = "accepted";
      } else {
        item.status = "refused";
      }
      try {
        this.loading = true;
        const res = await jobApplicantsApi.statusChange(item);
        console.log(res);
        console.log(res.data.request.status);
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    openSingleRequest(item) {
      this.openSingleReq = true;
      this.singleRequest = { ...item };
    },
    opendelRequest(item) {
      this.requestId = item._id;
      this.openDeleteRequest = true;
    },
    async sureDelRequest() {
      try {
        this.loading = true;
        console.log(this.requestId);
        const res = await jobApplicantsApi.deleteRequest(this.requestId);
        console.log(res);
        this.loading = false;
        this.openDeleteRequest = false;
        this.ToasteSuccessMsg("تم مسح المتقدم بنجاح");
        this.request = this.request.filter(e => {
          return e._id !== this.requestId;
        });
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.toastErrorMsg("حدث خطأ اثناء مسح المتقدم");
      }
    }
  },
  async mounted() {
    try {
      this.loadingMainData = true
      const res = await jobApplicantsApi.getRequest();
      this.loadingMainData = false
      console.log(res);
      this.request = res.data.requests;
    } catch (err) {
      console.log(err);
      this.loadingMainData = false
    }
  }
};
</script>
<style lang="scss" scoped></style>
ٍ

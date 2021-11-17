<template>
  <div class="home container">
    <h2 class="mb-4">Customer Records App with Image Hosting System</h2>
    <hr />

    <form class="my-4 customer-records__form" @submit.prevent="submitForm">
      <h4 class="mb-3">Create Customer Record Form</h4>
      <div class="input-group mb-4">
        <input
          type="text"
          class="form-control"
          placeholder="Customer Name"
          v-model="recordForm.name"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Customer Email"
          v-model="recordForm.email"
        />
        <input
          type="number"
          class="form-control"
          placeholder="Customer Phone Number"
          v-model="recordForm.phone_number"
        />
      </div>
      <h4 class="text--align-left">Customer Image</h4>
      <p
        v-if="recordForm.image_url && isEditingRecord"
        class="text-success text--align-left"
      >
        Image URL: {{ recordForm.image_url }}
      </p>
      <div class="input-group mt-3">
        <input
          ref="customerImageInput"
          type="file"
          class="custom-file-input"
          id="customerImageInput"
          @change="uploadCustomerImage"
        />
      </div>

      <div class="d-flex justify-content-end">
        <button
          v-if="tempImageRef && !isEditingRecord"
          type="button"
          class="btn btn-outline-primary me-2"
          :class="{ 'is-disabled': isUploadingImage }"
          @click="clearFileUpload"
        >
          Clear Image
        </button>
        <button
          type="submit"
          class="btn btn-outline-success"
          :class="{ 'is-disabled': isUploadingImage }"
        >
          {{ submitButtonText }}
        </button>
        <button
          v-if="isEditingRecord"
          type="button"
          class="btn btn-dark ms-2"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </div>
    </form>

    <hr />

    <table class="table table-dark customer-records__table mt-4 mb-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Customer Image</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, index) in customerRecordsDatabase"
          :key="record.task"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ record.name }}</td>
          <td>{{ record.email }}</td>
          <td>{{ record.phone_number }}</td>
          <td>
            <img
              class="customer-image"
              :src="imageUrl(record.image_url)"
              :alt="record.name"
            />
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-warning me-3"
              @click="startEdit(record)"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteRecord(record.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  database,
  storageRef,
  createCustomerRecord,
  updateCustomerRecord,
  deleteCustomerRecord,
} from "../firebase/db";

export default {
  name: "CustomerRecords",
  data() {
    return {
      isUploadingImage: false,

      customerRecordsDatabase: [],
      tempImageRef: "",
      recordForm: {
        name: "",
        email: "",
        phone_number: "",
        image_url: "",
      },
      activeEditRecordId: -1,
    };
  },
  computed: {
    isEditingRecord() {
      return this.activeEditRecordId !== -1;
    },
    isEmptyForm() {
      const { name, email, phone_number, image_url } = this.recordForm;
      return !name && !email && !phone_number && !image_url;
    },
    submitButtonText() {
      return this.isEditingRecord ? "Edit Record" : "Add Record";
    },
  },
  methods: {
    imageUrl(image) {
      return image || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    },

    submitForm() {
      if (this.isEditingRecord) this.updateRecord();
      else this.createRecord();
    },
    async createRecord() {
      if (!this.isEmptyForm) {
        await createCustomerRecord(this.recordForm);
        this.resetForm();
      }
    },
    async updateRecord() {
      if (!this.isEmptyForm) {
        await updateCustomerRecord(this.activeEditRecordId, this.recordForm);
        this.resetForm();
      } else {
        this.resetForm({ withClearData: true });
      }
    },
    async deleteRecord(recordId) {
      await deleteCustomerRecord(recordId);
    },

    async uploadCustomerImage(event) {
      this.isUploadingImage = true;

      try {
        // reference: https://bitbucket.org/TheDiligentDev/firebase-image-upload/src/master/src/App.vue
        const imageFile = event.target.files[0];
        const imageName = imageFile.name;
        const metaData = {
          contentType: imageFile.type,
        };

        const imageRef = storageRef.child(`images/${imageName}`);
        this.tempImageRef = imageRef;
        await imageRef.put(imageFile, metaData);

        const downloadUrl = await imageRef.getDownloadURL();
        this.recordForm.image_url = downloadUrl;

        alert("Successfully Uploaded Customer Image.");
        this.isUploadingImage = false;
      } catch (error) {
        console.error(error);
        alert("Upload Image Failed, Please Try Again With Another Image.");
        this.isUploadingImage = false;
      }
    },
    startEdit(recordObj) {
      this.recordForm = {
        name: recordObj.name,
        email: recordObj.email,
        phone_number: recordObj.phone_number,
        image_url: recordObj.image_url || "",
      };
      this.activeEditRecordId = recordObj.id;
    },
    cancelEdit() {
      this.resetForm({ withClearData: true });
    },
    resetForm(command = {}) {
      this.recordForm = {
        name: "",
        email: "",
        phone_number: "",
        image_url: "",
      };

      this.activeEditRecordId = -1;
      this.resetFileInput();

      if (this.tempImageRef && command.withClearData) {
        this.clearUploadedImageInFirebase();
      }

      this.tempImageRef = "";
    },

    async clearFileUpload() {
      await this.clearUploadedImageInFirebase();
      await this.resetFileInput();
      alert("Successfully Cleared Uploaded Image.");
    },
    resetFileInput() {
      this.$refs.customerImageInput.value = "";
    },
    clearUploadedImageInFirebase() {
      // reference: https://firebase.google.com/docs/storage/web/delete-files?hl=id
      this.tempImageRef
        .delete()
        .then(() => {
          console.log("Cleared Unused/Cancelled Image File in Firebase.");
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  firestore: {
    customerRecordsDatabase: database.collection("customer-records"),
  },
};
</script>

<style lang="scss">
.customer-records__table {
  tr {
    vertical-align: middle;
  }

  th {
    height: 70px;
  }

  td {
    height: 120px;
  }

  .customer-image {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
  }
}

.customer-records__form {
  .text--align-left {
    text-align: left;
  }

  .is-disabled {
    pointer-events: none;
    color: grey;
    border-color: grey;
  }
}
</style>

<template>
  <main>
  <v-btn v-show="!selectedData" color="success" @click="getSelectedData">Click to send data</v-btn>

  <template v-if="selectedData">
    <v-flex >
      <v-select
        :items="dataTable.headers"
        v-model="e2"
        label="Check columns"
        class="input-group--focused"
        item-value="text"
      ></v-select>
    </v-flex>
    <v-form v-model="valid">
      <v-text-field
        label="Document Title"
        v-model="title"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>
      <v-text-field
        label="Description"
        v-model="description"
      ></v-text-field>
      <v-btn
        color="success"
        @click="sendData"
        :disabled="!valid"
      >
        submit
      </v-btn>
      <v-btn
        color="warning"
        @click="reset"
      >
        Back
      </v-btn>
    </v-form>

  </template>
  </main>
</template>

<script>
import { db } from "../../config/firebase";
import { post, get, put } from "axios";
import { success, error } from "toastr";
export default {
  name: "SelectData",
  data() {
    return {
      selectedData: false,
      dataTable: {},
      description: '',
      title:''
    };
  },
  methods: {
    getSelectedData() {
      let self = this

      Office.context.document.getSelectedDataAsync(
        Office.CoercionType.Table,
        function(asyncResult) {
          if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            error("Action failed. Error: " + asyncResult.error.message);
          } else {
            success('Action completed, check the columns and submit')
            console.log(asyncResult.value);
            self.dataTable = {
              headers: asyncResult.value.headers[0],
              rows: asyncResult.value.rows
            };
            self.selectedData = true
          }
        }
      );
    },
    sendData(){
      let self = this

      post("http://127.0.0.1:8000/importXls/load-data", this.dataTable).then(
        response => {
          let data = response.data
          data.description = self.description
          data.title = self.title
          console.log(data);
          db
            .collection("docs")
            .add(data)
            .then(function(docRef) {
              success("Document written with ID: " + docRef.id);
              console.log("Document written with ID: ", docRef.id);
              self.reset()
            })
            .catch(function(error) {
              error("Error adding document, see the console");
              console.error("Error adding document: ", error);
            });

        }
      );
    },
    reset(){
      this.selectedData = false
      this.dataTable = {}
      this.description = ''
      this.title = ''

    }

  }
};
</script>

<style scoped>
</style>

<template>
         <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in reportItems" :key="item.id">
          <td>{{ item.tran_list.COMPANY_NAME }}</td>
          <td>{{ item.tran_list.PARTNER_NAME }}</td>
          <td>{{ item.tran_list.PARTNER_TYPE }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>


import { mapState } from 'vuex';

export default {
    name: 'Report',

    data() {

        return {
            
            tran_list: [
               {
                COMPANY_NAME : '',
                PARTNER_NAME : '',
                PARTNER_TYPE : '',
               } 
            ]
        }

    },

    mounted() {
        this.$store.dispatch('loadReportList');
    },
    computed: { 
        ...mapState(['reportItems']),
    },


}
</script>
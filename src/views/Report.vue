<template>
     
    <v-data-table
      :headers="headers"
      :items="reportItems"
      class="elevation-1"
    >
   
    <template v-slot:items="props">
      <td>{{ props.item.COMPANY_NAME }}</td>
      <td>{{ props.item.PARTNER_NAME }}</td>
       <td>{{ props.item.PARTNER_TYPE }}</td>
       <td>{{ props.item.Total }}</td>
      <td>{{ props.item.Satış }}</td>
       <td>{{ props.item.Tahsilat }}</td>
       <td>{{ props.item.Alış }}</td>
       <td>{{ props.item.Ödeme }}</td>
     </template>
    </v-data-table>
</template>
<script>


import { mapState } from 'vuex';

export default {
    name: 'Report',

    data() {
        return {
           headers: [
            {
                text: 'Şirket',
                align: 'start',
                sortable: false,
                value: 'COMPANY_NAME',
            },
            { text: 'Partner', value: 'PARTNER_NAME' },
            { text: 'Partner Tipi', value: 'PARTNER_TYPE' },
            { text: 'Total', value: 'Total' },
            { text: 'Satış', value: 'Satış' },
            { text: 'Tahsilat', value: 'Tahsilat' },
            { text: 'Alış', value: 'Alış' },
            { text: 'Ödeme', value: 'Ödeme' },
            ],
           
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
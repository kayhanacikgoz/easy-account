<template>
        <v-container>
            <v-card class="mt-5">
                <v-card-title class="indigo lighten-5">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                ></v-data-table>
            </v-card>
        </v-container>
</template>
<script>
export default {
name: 'Rapor',
}
</script>
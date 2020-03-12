<template>
    <div id="wrapper">
        <Table></Table>
        <Map></Map>
    </div>
</template>

<script>
import Map from "@/components/Map.vue";
import Table from "@/components/Table.vue";

export default {
    components: {
        Map,
        Table
    },
    data() {
        return {
            time: null
        }
    },
    computed: {
        current: function() {
            return new Date()
        }
    }
    
    
}
</script>

<style>

</style>
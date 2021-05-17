<template>
    <div>
        <Sidebar />
        <div id="content">
            <h2> project {{ $route.params.projectId }}</h2>
            <router-view id="view"></router-view>
        </div>
    </div>
</template>


<script>
import Sidebar from '../components/Sidebar.vue';

export default {
    components: {
        Sidebar,
    },
}

</script>


<style scoped>
#content {
    margin-left: 180px;
    background-color: azure;
}
#view {
    background-color: cadetblue;
}
</style>

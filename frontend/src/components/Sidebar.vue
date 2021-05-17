<template>
    <div id="left-sidebar">
        <div id="project_name">{{ this.project_name }}</div>
        <ul>
            <li>회의LOG 관리</li>
            <li>ISSUE 관리</li>
            <li>참여자 관리</li>
        </ul>
    </div>
</template>

<script>
import { getProjectName } from '../api/axios';
export default {
    name: 'left_sidebar',
    data() {
        return {
            project_name="testPj",

        };
    },

    method: {
        async getPjName() {
            const res = await getProjectName();
            res.data.name=this.project_name;
        },
    },

    created () {
        //getPjName();
    }
}
</script>

<style scoped>

</style>

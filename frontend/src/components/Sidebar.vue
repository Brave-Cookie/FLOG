<template>
    <div id="left-sidebar">
        <div id="title">{{ this.project_name }}</div>
        <hr color="#D8D5EB" noshade="noshade" size="1">
        <ul id="menu">
            <li><router-link to="log">회의LOG 관리</router-link></li><br>
            <li><router-link to="issue">ISSUE 관리</router-link></li><br>
            <li><router-link to="participant">참여자 관리</router-link></li>
        </ul>
    </div>
</template>

<script>
import { getProjectName } from '../api/axios';
export default {
    name: 'left_sidebar',
    data() {
        return {
            project_name: "test Project",

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
#left-sidebar {
    position: absolute;
    width: 180px;
    height: 100%;
    border-right: 1px solid #D8D5EB;
    
}

#title {
    font-weight: bold;
    font-size: 20px;
}

#menu {
    text-align: left;
}

#menu a.router-link-exact-active {
  font-weight: bold;
  color: #6D42F8;
}

#menu a {
    color: #293046;
}

</style>

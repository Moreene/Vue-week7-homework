<template>
    <div v-if="isShow">
        <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div class="container-fluid">
                <router-link to="/admin" class="navbar-brand">LOGO</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <router-link to="/admin/products" class="nav-link">產品列表</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/orders" class="nav-link">訂單列表</router-link>
                        </li>
                    </ul>
                </div>
                <a href="#" class="btn btn-light" @click.prevent="logout">登出</a>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
@import '../assets/all.scss';
</style>


<script>
import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
    data() {
        return {
            isShow: false,
        };
    },
    methods: {
        checkLogin() {
            axios.post(`${VITE_URL}/api/user/check`)
                .then(res => {
                    this.isShow = true;
                })
                .catch(err => {
                    this.$swal({
                        icon: "error",
                        title: "您沒有權限進入!",
                        showConfirmButton: true,
                    });
                    this.$router.push('/');
                });
        },
        logout() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger me-3"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "即將登出後台!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "不要登出",
                confirmButtonText: "是，我要登出",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "即將登出!",
                        icon: "success",
                        timer: 2000
                    });
                    axios.post(`${VITE_URL}/logout`)
                        .then(res => {
                            document.cookie = `myToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
                            this.$router.push('/');
                        })
                        .catch(err => {
                            this.$swal({
                                icon: "error",
                                title: err.response.data.message,
                                showConfirmButton: true,
                            });
                        });
                };
            });
        },
    },
    mounted() {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    },
}
</script>
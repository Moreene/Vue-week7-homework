<template>
    <div id="editOrderModal" ref="editOrderModal" class="modal fade" tabindex="-1" aria-labelledby="editOrderModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content border-0">
                <div class="modal-header bg-info text-white">
                    <h5 id="editOrderModalLabel" class="modal-title">
                        <span>{{ tempOrder.id }}</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h2 class="h5 fw-bold">訂單編號：{{ tempOrder.id }}</h2>
                    <h2 class="h5 fw-bold">訂單日期：{{ new Date(tempOrder.create_at * 1000).toLocaleDateString() }}</h2>
                    <div class="row py-4">
                        <div class="col-lg-6">
                            <div class="row gy-3">
                                <div class="col-md-6">
                                    <label for="people" class="form-label">訂購人</label>
                                    <input id="people" type="text" class="form-control" v-model="user.name" disabled>
                                </div>
                                <div class="col-md-6">
                                    <label for="phone" class="form-label">手機</label>
                                    <input id="phone" type="tel" class="form-control" v-model="user.tel" disabled>
                                </div>
                                <div class="col-md-6">
                                    <label for="mail" class="form-label">信箱</label>
                                    <input id="mail" type="email" class="form-control" v-model="user.email" disabled>
                                </div>
                                <div class="col-md-6">
                                    <label for="address" class="form-label">地址</label>
                                    <input id="address" type="text" class="form-control" v-model="user.address">
                                </div>
                                <div class="col-12">
                                    <label for="extarea">留言</label>
                                    <textarea class="form-control" id="extarea" style="height: 100px;"
                                        v-model="tempOrder.message"></textarea>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" v-model="tempOrder.is_paid" id="check">
                                        <label class="form-check-label" for="check">
                                            已付款
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div v-if="tempOrder && tempOrder.products">
                                訂購內容 ({{ Object.keys(tempOrder.products).length }})
                            </div>
                            <hr class="my-2">
                            <ol class="ps-3 py-2">
                                <li v-for="item in tempOrder.products" :key="item.id">
                                    {{ item.product.title }} x {{ item.qty }}
                                </li>
                            </ol>
                            <hr class="my-2">
                            <p>總金額：{{ tempOrder.total }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="updateOrder">
                            確認
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
textarea {
    resize: none;
}
</style>

<script>
import axios from 'axios';
const { VITE_URL, VITE_PATH } = import.meta.env;

import Modal from 'bootstrap/js/dist/modal';

export default {
    props: ["tempOrder"],
    data() {
        return {
            user: {},
            editOrderModal: null,
        };
    },
    methods: {
        updateOrder() {
            axios.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`, { "data": this.tempOrder })
                .then(res => {
                    this.$swal({
                        icon: "success",
                        title: res.data.message,
                        showConfirmButton: true,
                    });
                    this.$emit('updateOrder');
                    this.editOrderModal.hide();
                })
                .catch(err => {
                    this.$swal({
                        icon: "error",
                        title: err.response.data.message,
                        showConfirmButton: true,
                    });
                });
        },
    },
    watch: {
        tempOrder() {
            this.user = this.tempOrder.user;
        },
    },
    mounted() {
        this.editOrderModal = new Modal(this.$refs.editOrderModal, {
            keyboard: false,
            backdrop: 'static'
        });
    },
};
</script>
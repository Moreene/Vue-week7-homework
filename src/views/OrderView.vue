<template>
    <VueLoading v-model:active="isLoading">
        <img src="/loading.gif" alt="">
    </VueLoading>
    <h1 class="h3 fw-bold text-center my-5">訂單列表</h1>
    <div class="container">
        <div class="table-responsive">
            <table class="table mt-4">
                <thead>
                    <tr class="text-nowrap">
                        <th>
                            成立時間
                        </th>
                        <th width="300">
                            訂單編號
                        </th>
                        <th>
                            訂購人
                        </th>
                        <th>
                            手機
                        </th>
                        <th>
                            訂單內容
                        </th>
                        <th>
                            合計
                        </th>
                        <th>
                            付款
                        </th>
                        <th>
                            編輯
                        </th>
                    </tr>
                </thead>
                <tbody class="text-nowrap">
                    <tr v-for="item in orders" :key="item.id">
                        <td>{{ new Date(item.create_at * 1000).toLocaleDateString() }}</td>
                        <td>{{ item.id }}</td>
                        <td>{{ item.user.name }}</td>
                        <td>{{ item.user.tel }}</td>
                        <td>
                        <td>
                            <ul class="ps-0 mb-0">
                                <li v-for="product in item.products" :key="product.product_id">
                                    {{ product.product.title }} * {{ product.qty }}
                                </li>
                            </ul>
                        </td>
                        </td>
                        <td>{{ item.total }}</td>
                        <td>{{ item.is_paid ? '已付款' : '未付款' }}</td>
                        <td>
                            <div class="btn-group">
                                <button type="button" class="btn btn-outline-primary btn-sm"
                                    @click="openModal('edit', item)">
                                    編輯
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm"
                                    @click="openModal('delete', item)">
                                    刪除
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 分頁 -->
        <PaginationComponent :pagination="pagination" @emit-pages="getOrders"></PaginationComponent>
        <!-- 編輯訂單 -->
        <OrderEditComponent ref="editOrderModal" :temp-order="tempOrder" @update-order="getOrders"></OrderEditComponent>
        <!-- 刪除訂單 -->
        <OrderDelComponent ref="delOrderModal" :temp-order="tempOrder" @update="getOrders"></OrderDelComponent>
    </div>
</template>

<script>
import axios from 'axios';
import OrderEditComponent from '@/components/OrderEditComponent.vue';
import OrderDelComponent from '@/components/OrderDelComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
    components: {
        OrderEditComponent,
        OrderDelComponent,
        PaginationComponent
    },
    data() {
        return {
            isLoading: true,
            orders: [],
            tempOrder: {},
            pagination: {},
        }
    },
    methods: {
        // 確認使用者權限
        checkLogin() {
            axios.post(`${VITE_URL}/api/user/check`)
                .then(res => {
                    this.getOrders();
                    this.isShow = true;
                })
                .catch(err => {
                    this.$swal({
                        icon: "error",
                        title: '您沒有權限進入!',
                        showConfirmButton: true,
                    });
                    this.$router.push('/');
                });
        },
        // 取得所有訂單資訊
        getOrders(page = 1) {
            axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`)
                .then(res => {
                    this.orders = res.data.orders;
                    this.pagination = res.data.pagination;
                    this.isLoading = false;
                })
                .catch(err => {
                    this.$swal({
                        icon: "error",
                        title: err.response.data.message,
                        showConfirmButton: true,
                    });
                });
        },
        // 打開modal
        openModal(status, item) {
            if (status === 'edit') {
                this.tempOrder = { ...item };
                this.$refs.editOrderModal.editOrderModal.show();
            } else if (status === 'delete') {
                this.tempOrder = { ...item };
                this.$refs.delOrderModal.delOrderModal.show();
            };
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
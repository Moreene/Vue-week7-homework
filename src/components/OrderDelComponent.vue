<template>
    <div id="delOrderModal" ref="delOrderModal" class="modal fade" tabindex="-1" aria-labelledby="delOrderModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delOrderModalLabel" class="modal-title">
                        <span>{{ tempOrder.id }}</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    是否要刪除
                    <strong class="text-danger">{{ tempOrder.id }}</strong> 訂單?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="delProduct">
                        確認刪除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const { VITE_URL, VITE_PATH } = import.meta.env;

import Modal from 'bootstrap/js/dist/modal';

export default {
    props: ['tempOrder'],
    data() {
        return {
            delOrderModal: null,
        }
    },
    methods: {
        delProduct() {
            const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`;
            axios.delete(url).then((res) => {
                this.$swal({
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: true,
                });
                this.$emit('update');
                this.delOrderModal.hide();
            }).catch((err) => {
                this.$swal({
                    icon: "error",
                    title: err.response.data.message,
                    showConfirmButton: true,
                });
            });
        },
    },
    mounted() {
        this.delOrderModal = new Modal(this.$refs.delOrderModal, {
            keyboard: false,
            backdrop: 'static'
        });
    }
}
</script>
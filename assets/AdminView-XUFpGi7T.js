import{a as r}from"./axios-G2rPRu76.js";import{_ as p,b as u,c as v,a as t,d as s,e as i,f,g as b,o as g,h as c}from"./index-xY0d-O7O.js";var w={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"moreene",BASE_URL:"/Vue-week7-homework/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:d,VITE_PATH:A}=w,k={data(){return{isShow:!1}},methods:{checkLogin(){r.post(`${d}/api/user/check`).then(e=>{this.isShow=!0}).catch(e=>{this.$swal({icon:"error",title:"您沒有權限進入!",showConfirmButton:!0}),this.$router.push("/")})},logout(){const e=this.$swal.mixin({customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger me-3"},buttonsStyling:!1});e.fire({title:"即將登出後台!",icon:"warning",showCancelButton:!0,cancelButtonText:"不要登出",confirmButtonText:"是，我要登出",reverseButtons:!0}).then(o=>{o.isConfirmed&&(e.fire({title:"即將登出!",icon:"success",timer:2e3}),r.post(`${d}/logout`).then(a=>{document.cookie="myToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;",this.$router.push("/")}).catch(a=>{this.$swal({icon:"error",title:a.response.data.message,showConfirmButton:!0})}))})}},mounted(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");r.defaults.headers.common.Authorization=e,this.checkLogin()}},x={key:0},B={class:"navbar navbar-expand-lg bg-dark","data-bs-theme":"dark"},T={class:"container-fluid"},V=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavDropdown","aria-controls":"navbarNavDropdown","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),$={class:"collapse navbar-collapse",id:"navbarNavDropdown"},C={class:"navbar-nav mx-auto"},E={class:"nav-item"},N={class:"nav-item"};function S(e,o,a,D,h,l){const n=u("router-link"),m=u("router-view");return h.isShow?(g(),v("div",x,[t("nav",B,[t("div",T,[s(n,{to:"/admin",class:"navbar-brand"},{default:i(()=>[c("LOGO")]),_:1}),V,t("div",$,[t("ul",C,[t("li",E,[s(n,{to:"/admin/products",class:"nav-link"},{default:i(()=>[c("產品列表")]),_:1})]),t("li",N,[s(n,{to:"/admin/orders",class:"nav-link"},{default:i(()=>[c("訂單列表")]),_:1})])])]),t("a",{href:"#",class:"btn btn-light",onClick:o[0]||(o[0]=f((..._)=>l.logout&&l.logout(..._),["prevent"]))},"登出")])]),s(m)])):b("",!0)}const R=p(k,[["render",S]]);export{R as default};

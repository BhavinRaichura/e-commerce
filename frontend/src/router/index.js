import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductGallery from '../views/ProductGalleryView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signin',
      name:'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/products',
      name:'productGallery',
      component:ProductGallery,
    },
    {
      path: '/products/:productId',
      name:'product',
      component: ()=>import('../views/ProductView.vue')
    },
    {
      path: '/user',
      name:'user',
      component: ()=>import('../views/user/UserView.vue'),
      children: [
        {
          path:'/cart',
          name:'userCart',
          component: ()=>import('../views/user/CartView.vue')
        },
        {
          path:'/order',
          name:'userOrder',
          component: ()=>import('../views/user/OrdersView.vue')
        },
        {
          path:'/payment',
          name:'userPayment',
          component: ()=>import('../views/user/PaymentView.vue')
        },
        {
          path:'/details',
          name:'userDetails',
          component: ()=>import('../views/user/DetailsView.vue')
        }
      ]
    },
    {
      path:'/admin',
      name:'admin',
      component: ()=>import('../views/admin/AdminView.vue'),
      children: [
        {
          path:'/orders',
          name:"adminOrders",
          component: ()=>import('../views/admin/NewOrdersView.vue'),
          children: [
            {
              path:'/history',
              name:"adminOrdersHistory",
              component: ()=>import('../views/admin/OrderHistoryView.vue')
            }
          ]
        },{
          path:'/add-product',
          name:"adminNewProductForm",
          component: ()=>import('../views/admin/NewProductFormView.vue')
        },{
          path:'/update-product/:productId',
          name:"adminUpdateProduct",
          component: ()=>import('../views/admin/UpdateProductView.vue')
        },
      ]

    }
  ]
})

export default router

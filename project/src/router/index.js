import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import Home from '@/components/home'
import MyUpload from '@/components/home/myUpload'
import Homepage from '@/components/home/homepage'
import AlbumPage from '@/components/home/albumpage'
import ShowPhoto from '@/components/home/ShowPhoto'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/homepage',
          name: 'homepage',
          component: Homepage
        },
        {
          path: '/myupload',
          name: 'myupload',
          component: MyUpload
        },
        {
          path: '/albumpage',
          name: 'albumpage',
          component: AlbumPage
        },
        {
          path: '/showphoto',
          name: 'showphoto',
          component: ShowPhoto
        }
      ]
    }
  ]
})

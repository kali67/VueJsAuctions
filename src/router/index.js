import Vue from 'vue'
import Router from 'vue-router'
import Users from '../components/Users';
import Login from '../components/Login';
import Auctions from '../components/BuyerAuctions';
import ViewAuction from '../components/ViewAuction';
import CreateAuction from '../components/CreateAuction';
import SellerAuctions from '../components/SellerAuctions';
import CreatedAuctions from '../components/Auctions/CreatedAuctions';
import WonAuctions from '../components/Auctions/WonAuctions';
import CurrentBidAuctions from '../components/Auctions/CurrentBidAuctions';
import UnsoldAuctions from '../components/Auctions/UnsoldAuctions';
import SoldAuctions from '../components/Auctions/SoldAuctions';
import UserAccount from '../components/UserAccount';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/auctions',
      name: 'Auctions',
      component: Auctions
    },
    {
      path:'/auctions/:id',
      name: 'ViewAuction',
      component: ViewAuction
    },
    {
      path:'/auctions/create',
      name:'CreateAuction',
      component: CreateAuction
    },
    {
      path:'/user/auctions/won',
      name: 'WonAuctions',
      component: WonAuctions
    },
    {
      path:'/user/auctions/current',
      name: 'CurrentAuctions',
      component: CurrentBidAuctions
    },
    {
      path:'/user/auctions/created',
      name: 'CreatedAuctions',
      component: CreatedAuctions
    },
    {
      path:'/auctions/:id/edit',
      name: 'EditAuction',
      component: CreateAuction
    },
    {
      path:'/user/auctions/unsold',
      name: 'UnsoldAuctions',
      component: UnsoldAuctions
    },
    {
      path:'/user/auctions/sold',
      name: 'SoldAuctions',
      component: SoldAuctions
    },
    {
      path:'/user/account',
      name: 'Account',
      component: UserAccount
    }

  ],
  mode: 'history'
})

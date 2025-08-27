// src/router/index.ts

import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import DashboardOverviewPage from '../modules/backOffice/pages/DashboardOverviewPage.vue';
import AnalyticsPage from '../modules/backOffice/pages/AnalyticsPage.vue';
import SettingsPage from '../modules/backOffice/pages/SettingsPage.vue';
import LandingPage from '../modules/backOffice/pages/LandingPage.vue';
import LoginPage from '../modules/backOffice/pages/LoginPage.vue';
import SignupPage from '../modules/backOffice/pages/SignupPage.vue';
import NotFoundPage from '../modules/backOffice/pages/NotFoundPage.vue';
import UsersPage from '../modules/backOffice/pages/UsersPage.vue';

import AppConfigPage from '../modules/backOffice/pages/AppConfigPage.vue';
import OverviewTalentPage from '../modules/backOffice/pages/OverviewTalentPage.vue';
import AddTalentpageBackoffice from '../modules/backOffice/pages/AddTalentpage.vue';
import OverviewCompaniesPage from '../modules/backOffice/pages/OverviewCompaniesPage.vue';
import AddCompaniesPage from '../modules/backOffice/pages/AddCompaniesPage.vue';
import BackOfficePage from '../modules/backOffice/pages/BackOfficePage.vue';
import CreateUser from '../modules/backOffice/pages/createUser.vue';
import Users from '../modules/candidate/pages/Users.vue';
import Dashboardcandidate from '../modules/candidate/pages/Dashboard.vue';
import CreateResumePage from '../modules/candidate/pages/CreateResumePage.vue'; // New component
import Jobspage from '../modules/candidate/pages/Jobspage.vue';
import JobDetailPage from '../modules/candidate/pages/JobDetailPage.vue';
import TalentProfile from '../modules/candidate/pages/TalentProfile.vue';
import ResumePage from '../modules/candidate/pages/ResumePage.vue'; // The old ResumePage for template gallery

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
    meta: { title: 'Welcome' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { title: 'Login' }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
    meta: { title: 'Sign Up' }
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'DashboardOverview',
        component: DashboardOverviewPage,
        meta: { title: 'Overview' }
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: AnalyticsPage,
        meta: { title: 'Analytics' }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsPage,
        meta: { title: 'Settings' }
      },
      {
        path: 'users',
        name: 'Users',
        component: UsersPage,
        meta: { title: 'Users' }
      },
      {
        path: 'app-config',
        name: 'Application Confiq',
        component: AppConfigPage,
        meta: { title: 'Application Config' }
      },
      {
        path: 'addtalent',
        name: 'Add Talent',
        component: AddTalentpageBackoffice,
        meta: { title: 'Add Talent' }
      },
      {
        path: 'talentoverview',
        name: 'Talent Overview',
        component: OverviewTalentPage,
        meta: { title: 'Talent Overview' }
      },
      {
        path: 'companies',
        name: 'Companies Overview',
        component: OverviewCompaniesPage,
        meta: { title: 'Companies Overview' }
      },
      {
        path: 'addcompanies',
        name: 'Add Companies',
        component: AddCompaniesPage,
        meta: { title: 'Add Companies' }
      },
      {
        path: 'dummyUsers',
        name: 'total Users',
        component: Users,
        meta: { title: 'Total' }
      },
    ],
  },
  {
    path: '/backoffice',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Back Office',
        component: BackOfficePage,
        meta: { title: 'Back Office' }
      },
      {
        path: 'createUser',
        name: 'Create Back Office',
        component: CreateUser,
        meta: { title: 'create user' }
      },
    ],
  },
  {
    path: '/candidate',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Candidate Dashboard',
        component: Dashboardcandidate,
        meta: { title: 'Back Office' }
      },
      {
        path: 'create-resume',
        name: 'CreateResume',
        component: CreateResumePage, // Use the new single component
        meta: { title: 'Create Resume' }
      },
      {
        path: 'talentprofile',
        name: 'Talent Profile',
        component: TalentProfile,
        meta: { title: 'create resume' }
      },
      {
        path: 'resume',
        name: 'Resume',
        component: ResumePage,
        meta: { title: 'Resume' }
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: Jobspage,
        meta: { title: 'Users' }
      },
      {
        path: '/jobs/:id',
        name: 'Jobs-Details',
        component: JobDetailPage,
        meta: { title: 'jobs details' },
        props: route => ({ jobId: parseInt(route.params.id) })
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: { title: 'Page Not Found' }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.afterEach((to) => {
  document.title = to.meta.title ? `Click-HR - ${to.meta.title}` : 'Click-HR';
});

export default router;
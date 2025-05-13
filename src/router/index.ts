import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import('@/ui/layouts/home/HomeView.vue'),
  },
  {
    path: "/about",
    name: "about",
    component: () => import('@/ui/layouts/about/AboutView.vue'),
  },
  {
    path: "/experience",
    name: "experience",
    component: () => import('@/ui/layouts/experience/ExperienceView.vue'),
  },
  {
    path: "/education",
    name: "education",
    component: () => import('@/ui/layouts/education/EducationView.vue'),
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import('@/ui/layouts/projects/ProjectView.vue'),
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import('@/ui/layouts/blog/BlogView.vue'),
  },
  {
    path: "/contacts",
    name: "contact",
    component: () => import('@/ui/layouts/contact/ContactView.vue'),
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import('@/ui/layouts/login/LoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/ui/layouts/dashboard/DashboardView.vue'),
    children: [
      {
        path: '/', redirect: { name: 'principal' }
      },
      {
        path: '/principal',
        name: 'principal',
        component: () => import('@/ui/pages/principal/PrincipalView.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/ui/pages/user/views/user-list/UserListView.vue')
      },
      {
        path: '/job',
        name: 'job',
        component: () => import('@/ui/pages/job/views/job-list/JobListView.vue')
      },
      {
        path: '/study',
        name: 'study',
        component: () => import('@/ui/pages/study/views/study-list/StudyListView.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/ui/pages/courses/views/course-list/CourseListView.vue')
      },
      {
        path: '/project',
        name: 'project',
        component: () => import('@/ui/pages/projects/views/project-list/ProjectListView.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;

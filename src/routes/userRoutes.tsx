import Intro from "../pages/user/Intro";
import SinglePageLayout from "../pages/user/merge/SinglePageLayout";
import "../assets/user/styles/user.css"

const userRoutes = [
  { path: '/', component: Intro },
  { path: '/main', component: SinglePageLayout },
];

export default userRoutes;

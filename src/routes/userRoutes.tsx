import Intro from "../pages/user/Intro";
import SinglePageLayout from "../pages/user/merge/SinglePageLayout";
import Rsvp from "../pages/user/Rsvp";
import Thanks from "../pages/user/Thanks";
import "../assets/user/styles/user.css"

const userRoutes = [
  { path: '/', component: Intro },
  { path: '/intro/:guestName', component: Intro },
  { path: '/main', component: SinglePageLayout },
  { path: '/main/:guestName', component: SinglePageLayout },
  { path: '/rsvp', component: Rsvp },
  { path: '/rsvp/:guestName', component: Rsvp },
  { path: '/thanks', component: Thanks },
  { path: '/thanks/:guestName', component: Thanks },
  // Guest name route should be last to avoid conflicts
  { path: '/guest/:guestName', component: Intro },
];

export default userRoutes;

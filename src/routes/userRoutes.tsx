import Bride from "../pages/user/Bride";
import Gallery from "../pages/user/Gallery";
import Groom from "../pages/user/Groom";  
import Intro from "../pages/user/Intro";
import Invited from "../pages/user/Invited";
import Opening from "../pages/user/Opening";
import Quotes from "../pages/user/Quotes";
import Rsvp from "../pages/user/Rsvp";
import Story from "../pages/user/Story";
import Thanks from "../pages/user/Thanks";

// User Routes
const userRoutes = [
  { path: "/", component: Intro },
  { path: "/gallery", component: Gallery },
  { path: "/rsvp", component: Rsvp },
  { path: "/bride", component: Bride },
  { path: "/groom", component: Groom },
  { path: "/invited", component: Invited },
  { path: "/opening", component: Opening },
  { path: "/quotes", component: Quotes },
  { path: "/story", component: Story },
  { path: "/thanks", component: Thanks },
];

export default userRoutes;

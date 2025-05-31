
import Gallery from "./Gallery";
import Rsvp from "./Rsvp";
import Bride from "./Bride";
import Groom from "./Groom";
import Invited from "./Invited";
import Opening from "./Opening";
import Quotes from "./Quotes";
import Story from "./Story";
import Thanks from "./Thanks";
import "../../assets/user/styles/user.css";

const SinglePageLayout = () => {
  return (
    <div className="single-page-layout">
      <section id="opening">
        <Opening />
      </section>
      <section id="quotes">
        <Quotes />
      </section>
      <section id="groom">
        <Groom />
      </section>
      <section id="bride">
        <Bride />
      </section>
      <section id="story">
        <Story />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="rsvp">
        <Rsvp />
      </section>
      <section id="invited">
        <Invited />
      </section>
      <section id="thanks">
        <Thanks />
      </section>
    </div>
  );
};

export default SinglePageLayout;

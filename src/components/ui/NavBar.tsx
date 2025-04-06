import { NavLink } from "react-router-dom";
import {
  Home,
  Gem,
  Heart,
  AlignJustify,
  Image,
  Mail,
  MapPin,
  PartyPopper,
} from "lucide-react";
import "../../index.css";

const NavBar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `min-w-[64px] md:min-h-[80px] h-full flex flex-col items-center justify-center text-xs md:text-sm gap-1 px-2 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-[#AB916C] text-white"
        : "text-[#644F44] hover:bg-[#f1e7dd]"
    }`;

  const iconClass = (isActive: boolean) =>
    `md:size-6 size-5 transition-all duration-300 stroke-[1.8] ${
      isActive ? "stroke-white" : "stroke-[#AB916C]"
    }`;

  return (
    <div
      style={{ fontFamily: "Afacad" }}
     className="fixed bottom-0 left-0 w-screen h-[90px] bg-white border-[3px] border-[#BAA485] overflow-hidden md:static md:w-[90px] md:h-[700px]"

    >
      <div className="overflow-x-auto md:overflow-y-auto md:overflow-x-hidden w-full h-full scrollbar-none">
        <div className="flex flex-row md:flex-col justify-PartyPoppert items-stretch w-max md:w-full md:h-max gap-3 h-full p-2">
          <NavLink to="/opening" className={linkClass}>
            {({ isActive }) => (
              <>
                <Home className={iconClass(isActive)} />
                <span>Opening</span>
              </>
            )}
          </NavLink>

          <NavLink to="/quotes" className={linkClass}>
            {({ isActive }) => (
              <>
                <Gem className={iconClass(isActive)} />
                <span>Quotes</span>
              </>
            )}
          </NavLink>

          <NavLink to="/bride" className={linkClass}>
            {({ isActive }) => (
              <>
                <Heart className={iconClass(isActive)} />
                <span>Bride</span>
              </>
            )}
          </NavLink>

          <NavLink to="/groom" className={linkClass}>
            {({ isActive }) => (
              <>
                <Heart className={iconClass(isActive)} />
                <span>Groom</span>
              </>
            )}
          </NavLink>

          <NavLink to="/story" className={linkClass}>
            {({ isActive }) => (
              <>
                <AlignJustify className={iconClass(isActive)} />
                <span>Story</span>
              </>
            )}
          </NavLink>

          <NavLink to="/gallery" className={linkClass}>
            {({ isActive }) => (
              <>
                <Image className={iconClass(isActive)} />
                <span>Gallery</span>
              </>
            )}
          </NavLink>

          <NavLink to="/rsvp" className={linkClass}>
            {({ isActive }) => (
              <>
                <Mail className={iconClass(isActive)} />
                <span>RSVP</span>
              </>
            )}
          </NavLink>

          <NavLink to="/invited" className={linkClass}>
            {({ isActive }) => (
              <>
                <MapPin className={iconClass(isActive)} />
                <span>Invited</span>
              </>
            )}
          </NavLink>

          <NavLink to="/thanks" className={linkClass}>
            {({ isActive }) => (
              <>
                <PartyPopper className={iconClass(isActive)} />
                <span>Thanks</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

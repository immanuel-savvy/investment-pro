import {
  ADMINSTRATORS,
  ADMIN_HASH,
  GLOBALS,
  USERS,
  USERS_HASH,
} from "../ds/conn";
import { GLOBAL_alumni_overview } from "./reviews";
import {
  GLOBALS_about_statement,
  GLOBALS_mission_statement,
  GLOBALS_recent_investments,
  GLOBALS_vision_statement,
  GLOBAL_logo,
} from "./settings";

let default_admin = "adminstrators~123seminar~1234567890123",
  default_user = "users~123seminar~1234567890123";

const create_default_admin = () => {
  if (!ADMINSTRATORS.readone(default_admin)) {
    ADMINSTRATORS.write({
      firstname: "Investment",
      lastname: "Pro",
      image: "logo_single.png",
      email: "admin@investment_pro.com".toLowerCase(),
      _id: default_admin,
    });
    ADMIN_HASH.write({ admin: default_admin, key: "adminstrator#1" });
  }

  let user_ = USERS.readone(default_user);
  if (!user_) {
    USERS.write({
      _id: default_user,
      firstname: "Investment",
      lastname: "Pro",
      verified: true,
      email: "investmentpro@gmail.com",
    });
    USERS_HASH.write({ user: default_user, key: "adminstrator#1" });
  }

  !GLOBALS.readone({ global: GLOBALS_mission_statement }) &&
    GLOBALS.write({ global: GLOBALS_mission_statement });

  !GLOBALS.readone({ global: GLOBALS_vision_statement }) &&
    GLOBALS.write({ global: GLOBALS_vision_statement });

  !GLOBALS.readone({ global: GLOBALS_about_statement }) &&
    GLOBALS.write({ global: GLOBALS_about_statement });

  !GLOBALS.readone({ global: GLOBAL_alumni_overview }) &&
    GLOBALS.write({ global: GLOBAL_alumni_overview });

  !GLOBALS.readone({ global: GLOBALS_recent_investments }) &&
    GLOBALS.write({ global: GLOBALS_recent_investments, investments: [] });

  !GLOBALS.readone({ global: GLOBAL_logo }) &&
    GLOBALS.write({ global: GLOBAL_logo });
};

export { create_default_admin, default_user };

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.css";
import "./assets/css/custom.css";
import { Loggeduser, Logged_admin, Nav_context } from "./Contexts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Emitter from "semitter";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Forgot_password from "./pages/Forgot_password";
import Signup from "./pages/Signup";
import Page_not_found from "./pages/404";
import Adminstrator from "./pages/Adminstrator";
import { client_domain, organisation_name } from "./assets/js/utils/constants";
import { get_request, post_request } from "./assets/js/utils/services";
import { get_session } from "./sections/footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Verify_email from "./pages/Verify_email";
import Reset_password from "./pages/Reset_password";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import Plans from "./pages/Plans";
import Testimonials from "./pages/Testimonials";

const emitter = new Emitter();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submenus: new Object({}),
      subnavs: new Object(),
      navs: new Array(
        {
          title: "home",
          path: "/",
        },
        {
          title: "plans",
          path: "/plans",
        },
        {
          title: "about",
          path: "/about",
        },
        {
          title: "blog",
          path: "/blog",
        },
        {
          title: "contact",
          path: "/contact",
        },
        {
          title: "register",
          path: "/signup",
        }
      ),
    };
  }

  componentDidMount = async () => {
    let loggeduser = get_session("loggeduser");
    loggeduser && this.setState({ loggeduser });

    document.title = organisation_name;

    emitter.single_listener("is_logged_in", this.is_logged_in);

    let entry = await get_request("entry");

    this.setState({ entry });
  };

  componentWillUnmount = () => {};

  set_subnav = async (nav) => {
    let { subnavs } = this.state;
    if (subnavs[nav._id]) return;

    let navs = await post_request("get_courses", { courses: nav.submenu });
    subnavs[nav._id] = navs.map((nav) => ({
      ...nav,
      path: "/course",
      on_click: () => this.handle_course(nav),
    }));
    this.setState({ subnavs });
  };

  load_subnavs = async (current_subnav) => {
    let { submenus } = this.state;

    let courses = await post_request("get_courses", {
      courses: current_subnav.submenu,
    });
    submenus[current_subnav._id] = courses;

    this.setState({
      submenus,
    });
  };

  logout = () =>
    this.setState({ loggeduser: null }, () => {
      window.sessionStorage.removeItem("loggeduser");
      window.location.assign(client_domain);

      delete this.log_timestamp;
    });

  restore_loggeduser = (loggeduser, cb) =>
    this.setState({ loggeduser }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
      cb && cb();
    });

  login = (user, no_redirect) =>
    this.setState({ loggeduser: user }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(user));

      if (!this.log_timestamp) this.log_timestamp = Date.now();

      if (no_redirect) return;

      let red = window.sessionStorage.getItem("redirect");

      window.sessionStorage.removeItem("redirect");
      window.location.assign(red || client_domain);
    });

  log_admin = (admin) =>
    this.setState({ admin_logged: admin }, () => {
      window.sessionStorage.setItem("logged_admin", JSON.stringify(admin));
    });

  render = () => {
    let { loggeduser, entry, navs, subnavs, submenus, admin_logged } =
      this.state;

    return (
      <Loggeduser.Provider
        value={{
          loggeduser,
          logout: this.logout,
          set_loggeduser: this.restore_loggeduser,
          login: this.login,
          is_logged_in: this.is_logged_in,
          entry,
        }}
      >
        <Logged_admin.Provider
          value={{ admin_logged, log_admin: this.log_admin }}
        >
          <Nav_context.Provider
            value={{
              navs,
              subnavs,
              set_subnav: this.set_subnav,
              load_subnavs: this.load_subnavs,
              submenus,
              logo: entry?.logo,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route index element={<Home entry={entry} />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="profile" element={<Profile />} />
                <Route path="article" element={<Article />} />
                <Route path="plans" element={<Plans />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="blog" element={<Blog />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verify_email" element={<Verify_email />} />
                <Route path="reset_password" element={<Reset_password />} />
                <Route path="forgot_password" element={<Forgot_password />} />
                <Route path="adminstrator" element={<Adminstrator />} />
                <Route path="*" element={<Page_not_found />} />
              </Routes>
            </BrowserRouter>
          </Nav_context.Provider>
        </Logged_admin.Provider>
      </Loggeduser.Provider>
    );
  };
}

export default App;
export { emitter };

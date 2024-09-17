import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import {
  client_domain,
  domain,
  organisation_name,
} from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import Loadindicator from "../components/loadindicator";
import Login from "../components/login";
import Modal from "../components/modal";
import { Loggeduser, Nav_context } from "../Contexts";
import { scroll_to_top } from "./footer";
import Small_btn from "../components/small_btn";

class Custom_nav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      subnavs: new Object(),
      search_param: "",
    };
  }

  login = () => this.login_modal?.toggle();

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  quick_paths = new Object({});

  componentDidMount = () => {};

  search = () => {
    let { search_param } = this.state;
    if (!search_param.trim()) return;

    window.location.assign(
      `${client_domain}/search_result?search_param=${search_param || ""}`
    );
    scroll_to_top();
  };

  render() {
    let { current_subnav, current_nav, show_search, search_param } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, logout }) => {
          this.logout = logout;

          return (
            <Nav_context.Consumer>
              {({ navs, logo, set_subnav }) => {
                this.navs = navs;
                this.set_subnav = set_subnav;

                return (
                  <div>
                    <div
                      className="header"
                      style={{
                        backgroundColor: "#fff",
                        color: "#000",
                        position: "fixed",
                        width: "100vw",
                      }}
                    >
                      <div className="container">
                        <div
                          id="navigation"
                          className="navigation navigation-landscape"
                        >
                          <div
                            style={{
                              textAlign: "right",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <span id="google_translate_element"></span>
                          </div>
                          <Navbar light expand="lg">
                            <NavbarBrand href="/" className="nav-brand">
                              {false ? (
                                <img
                                  src={`${domain}/images/${logo.logo}`}
                                  className="logo"
                                  id="logo_white"
                                  style={{ maxHeight: 75 }}
                                  alt=""
                                />
                              ) : (
                                <h2 className="text-dark">
                                  {organisation_name}
                                </h2>
                              )}
                            </NavbarBrand>
                            <NavbarToggler
                              style={{ color: "#000" }}
                              onClick={this.toggle}
                            />
                            <Collapse isOpen={this.state.isOpen} navbar>
                              <Nav
                                className="ml-auto"
                                navbar
                                style={{ alignItems: "center" }}
                              >
                                {navs.map((nav, index) => {
                                  nav = { ...nav };

                                  if (nav.title === "login" && loggeduser)
                                    nav.title = "logout";

                                  return nav.submenu && nav.submenu.length ? (
                                    <UncontrolledDropdown
                                      key={index}
                                      nav
                                      inNavbar
                                    >
                                      <DropdownToggle
                                        style={{
                                          backgroundColor: "transparent",
                                        }}
                                        nav
                                        caret
                                        ref={(dropdown) =>
                                          (this[`main_dropdown_${index}`] =
                                            dropdown)
                                        }
                                        onMouseOver={() => {
                                          let comp =
                                            this[`main_dropdown_${index}`];
                                          !comp.context.isOpen &&
                                            comp.context.toggle();
                                          this.setState({
                                            current_nav: nav.title,
                                          });
                                        }}
                                      >
                                        <span>
                                          {to_title(
                                            nav.title.replace(/_/g, " ")
                                          )}
                                        </span>
                                      </DropdownToggle>
                                      {current_nav === nav.title ? (
                                        <DropdownMenu
                                          className="nav-dropdown nav-submenu"
                                          end
                                        >
                                          {nav.submenu.map((subnav, index) => {
                                            subnav = { ...subnav };

                                            subnav.path =
                                              this.quick_paths[subnav.title];

                                            return (
                                              <li
                                                key={index}
                                                onMouseOver={() => {
                                                  this.setState({
                                                    current_subnav:
                                                      subnav.title,
                                                  });
                                                }}
                                              >
                                                <Link
                                                  onClick={this[subnav.title]}
                                                  to={subnav.path || ""}
                                                >
                                                  {subnav.view_all
                                                    ? "View all courses..."
                                                    : to_title(
                                                        subnav.title.replace(
                                                          /_/g,
                                                          " "
                                                        )
                                                      )}
                                                </Link>
                                                {subnav.submenu &&
                                                subnav.submenu.length &&
                                                current_subnav ===
                                                  subnav.title ? (
                                                  <UncontrolledDropdown
                                                    key={index}
                                                    nav
                                                    inNavbar
                                                    onClick={subnav.on_click}
                                                  >
                                                    <DropdownToggle
                                                      style={{
                                                        backgroundColor:
                                                          "transparent",
                                                      }}
                                                      nav
                                                      caret
                                                      ref={(dropdown) =>
                                                        (this[
                                                          `dropdown_${index}`
                                                        ] = dropdown)
                                                      }
                                                      onMouseOver={
                                                        subnav.view_all
                                                          ? null
                                                          : () => {
                                                              let comp =
                                                                this[
                                                                  `dropdown_${index}`
                                                                ];
                                                              !comp.context
                                                                .isOpen &&
                                                                comp.context.toggle();
                                                            }
                                                      }
                                                    ></DropdownToggle>
                                                    <DropdownMenu
                                                      className="nav-dropdown nav-submenu"
                                                      end
                                                    >
                                                      {subnav.submenu ? (
                                                        subnav.submenu
                                                          .length ? (
                                                          subnav.submenu.map(
                                                            (sub_nav) => {
                                                              return (
                                                                <li
                                                                  onClick={
                                                                    this[
                                                                      sub_nav
                                                                        .title
                                                                    ]
                                                                  }
                                                                  style={{
                                                                    backgroundColor:
                                                                      "transparent",
                                                                  }}
                                                                  key={
                                                                    sub_nav._id
                                                                  }
                                                                >
                                                                  <Link
                                                                    to={
                                                                      sub_nav.path ||
                                                                      ""
                                                                    }
                                                                  >
                                                                    {to_title(
                                                                      sub_nav.title.replace(
                                                                        /_/g,
                                                                        " "
                                                                      )
                                                                    )}
                                                                  </Link>
                                                                </li>
                                                              );
                                                            }
                                                          )
                                                        ) : null
                                                      ) : (
                                                        <Loadindicator />
                                                      )}
                                                    </DropdownMenu>
                                                  </UncontrolledDropdown>
                                                ) : null}
                                              </li>
                                            );
                                          })}
                                        </DropdownMenu>
                                      ) : null}
                                    </UncontrolledDropdown>
                                  ) : nav.title ===
                                    "search" ? null : nav.title === "logout" ? ( // </li> //   </Link> //     <i className="ti-search"></i> //   > //     className="btn btn-action" //     style={{ border: "none" }} //     to="#" //   <Link // > //   } //     }) //       show_search: !this.state.show_search, //     this.setState({ //   onClick={() => // <li
                                    <li>
                                      <Link
                                        onClick={
                                          loggeduser
                                            ? () => {
                                                logout();
                                              }
                                            : this.login
                                        }
                                        to={nav.path}
                                      >
                                        <i className="fas fa-sign-in-alt mr-1 text-dark"></i>
                                        <span className="dn-lg text-dark">
                                          {loggeduser ? "Logout" : "Log In"}
                                        </span>
                                      </Link>
                                    </li>
                                  ) : nav.title === "register" ? (
                                    <ul
                                      className="nav-menu nav-menu-social align-to-right mb-3"
                                      style={{ width: 150 || "100%" }}
                                    >
                                      <li className="add-listing theme-bg">
                                        <Link
                                          to={
                                            loggeduser
                                              ? `/profile?u=${loggeduser._id}`
                                              : "/signup"
                                          }
                                          className="text-white"
                                        >
                                          {loggeduser
                                            ? `${loggeduser.firstname} ${loggeduser.lastname}`
                                            : "Get Started"}
                                        </Link>
                                      </li>
                                    </ul>
                                  ) : (
                                    <NavItem
                                      onMouseOver={() =>
                                        this.setState({
                                          current_nav: nav.title,
                                        })
                                      }
                                    >
                                      <NavLink
                                        style={{
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Link
                                          onClick={this[nav.title]}
                                          style={{
                                            textDecorationColor: "none",
                                          }}
                                          to={nav.path || ""}
                                        >
                                          <span>
                                            {to_title(
                                              nav.title.replace(/_/g, " ")
                                            )}
                                          </span>
                                        </Link>
                                      </NavLink>
                                    </NavItem>
                                  );
                                })}
                              </Nav>
                            </Collapse>
                          </Navbar>
                          {show_search ? (
                            <div className="row align-items-center">
                              <div className="form-group mr-0 pr-0 col-md-6 col-lg-4">
                                <div className="input-with-icon">
                                  <input
                                    type="text"
                                    className="form-control"
                                    autoFocus
                                    placeholder={`Search ${organisation_name}`}
                                    value={search_param}
                                    onChange={({ target }) =>
                                      this.setState({
                                        search_param: target.value,
                                      })
                                    }
                                  />
                                  <i className="ti-search"></i>
                                </div>
                              </div>
                              <div className="form-group col-4">
                                <Small_btn
                                  title="Search"
                                  action={this.search}
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <Modal
                      ref={(login_modal) => (this.login_modal = login_modal)}
                    >
                      <Login toggle={() => this.login_modal?.toggle()} />
                    </Modal>
                  </div>
                );
              }}
            </Nav_context.Consumer>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Custom_nav;

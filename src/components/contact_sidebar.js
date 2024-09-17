import React from "react";

class Contact_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
        <div className="lmp_caption pl-lg-5">
          <ol className="list-unstyled p-0">
            <li className="d-flex align-items-start my-3 my-md-4">
              <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                <div className="position-absolute theme-cl h5 mb-0">
                  <i className="fas fa-at"></i>
                </div>
              </div>
              <div className="ml-3 ml-md-4">
                <h4>Drop A Mail</h4>
                <p>
                  <a href="mailto://info@ultracapitals.org">
                    info@ultracapitals.org
                  </a>
                  {/* <br />
                  <a href="mailto://admissions@voucherafrica.com">
                    admin@voucherafrica.com
                  </a> */}
                </p>
              </div>
            </li>
            <li className="d-flex align-items-start my-3 my-md-4">
              <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                <div className="position-absolute theme-cl h5 mb-0">
                  <i className="fas fa-phone-alt"></i>
                </div>
              </div>
              <div className="ml-3 ml-md-4">
                <h4>Make a Call</h4>
                <p>+1(610)922-1612</p>
              </div>
            </li>
            <li className="d-flex align-items-start my-3 my-md-4">
              <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                <div className="position-absolute theme-cl h5 mb-0">
                  <i className="fas fa-map-marker"></i>
                </div>
              </div>
              <div className="ml-3 ml-md-4">
                <h4>Physical Address</h4>
                <p>
                  2400 Market Street, Suite 302, Philadelphia, PA 19103
                  Pennsylvania.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default Contact_sidebar;

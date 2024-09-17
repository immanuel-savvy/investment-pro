import React from "react";
import { domain } from "../assets/js/utils/constants";
import Small_btn from "./small_btn";

class Investment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { investment, index } = this.props;
    if (!investment) return;

    let { image, title, details, percentage_return, duration } = investment;

    return (
      <>
        <section className="imageblock pt-m-0">
          {/* <div className={`imageblock__content ${index % 2 ? "left" : ""}`}>
            <div
              className="background-image-holder"
              style={{ background: `url(${domain}/images/${image})` }}
            >
              <img
                alt="image"
                className="rounded img-fluid"
                src={`${domain}/images/${image}`}
              />
            </div>
          </div> */}
          <div className="container">
            <div
              className={`row align-items-center justify-content-${
                index % 2 ? "end" : "between"
              }`}
            >
              <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                <div className="lmp_caption">
                  <h2 className="mb-3">{title}</h2>
                  {details.split("\n").map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
                <div className="crs_lt_103">
                  <div className="crs_info_detail">
                    <ul>
                      <li>
                        <i className="fa fa-shopping-cart"></i>
                        <span>
                          Percentage Return: <b>{percentage_return}%</b>
                        </span>
                      </li>
                    </ul>
                    <br />
                    <ul>
                      <li>
                        <i className="fa fa-calendar"></i>
                        <span>
                          Duration: <b>{duration} mins</b>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Small_btn title="Invest Now" />
              </div>
            </div>
          </div>
        </section>
        <div className="clearfix"></div>
      </>
    );
  }
}

export default Investment;

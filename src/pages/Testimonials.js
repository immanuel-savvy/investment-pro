import React from "react";
import Loadindicator from "../components/loadindicator";
import Listempty from "../components/listempty";
import Review from "../components/review";
import { post_request } from "../assets/js/utils/services";
import Custom_nav from "../sections/nav";
import Footer, { scroll_to_top } from "../sections/footer";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import { organisation_name } from "../assets/js/utils/constants";
import Section_header from "../components/section_headers";
import Padder from "../components/padder";
import Testimonials_header from "../components/testimonials_header";

class Testimonials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      page_size: 24,
    };
  }

  componentDidMount = async () => {
    scroll_to_top();

    document.title = `Testimonials | ${organisation_name}`;

    let { page_size, page } = this.state;

    let reviews = await post_request("reviews", {
      verified: true,
      skip: page_size * page,
      limit: page_size,
    });

    this.setState({ reviews });
  };

  toggle_form = () => this.setState({ show_form: !this.state.show_form });

  render() {
    let { reviews, show_form, review_submitted } = this.state;

    return (
      <div id="main-wrapper">
        <Custom_nav page="Testimonials" refs="header" />
        <Padder />
        <Breadcrumb_banner title="What we did?" no_gray page="Testimonials" />

        <section className="gray">
          <Section_header
            title="Real Stories,"
            color_title="Genuine Impact"
            description="From life-changing transformations to memorable moments of success, these stories serve as a testament to the quality and effectiveness of our offerings."
          />
        </section>
        <div className="container py-5">
          <Testimonials_header />
        </div>
        <section className="gray">
          <div style={{ paddingTop: 20 }}>
            <div className="container">
              <div className="row justify-content-center">
                {reviews ? (
                  reviews.length ? (
                    reviews.map((review) => (
                      <Review testimonials review={review} />
                    ))
                  ) : (
                    <Listempty />
                  )
                ) : (
                  <Loadindicator contained />
                )}
              </div>
              <div
                className={
                  "d-flex align-items-center justify-content-center py-5"
                }
              >
                {review_submitted ? (
                  <span>
                    <Review review={review_submitted} />

                    <div className="alert alert-success" role="alert">
                      Thanks for sending us a review &nbsp;
                      <span>
                        <i className="fa fa-star"></i>
                      </span>
                    </div>
                  </span>
                ) : (
                  <span class="elkios" onClick={this.toggle_form}>
                    <a
                      href="#"
                      class="add_new_btn"
                      data-toggle="modal"
                      data-target="#catModal"
                    >
                      <i class="fas fa-plus-circle mr-1"></i>
                      Add a review
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Testimonials;

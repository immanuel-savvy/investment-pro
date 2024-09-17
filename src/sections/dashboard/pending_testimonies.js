import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Loadindicator from "../../components/loadindicator";
import Review from "../../components/review";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Pending_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let reviews = await post_request("reviews", {});

    this.setState({ reviews });
  };

  remove_review = async (review_id) => {
    let { reviews } = this.state;

    reviews = reviews.filter((review) => review._id !== review_id);
    this.setState({ reviews });

    await post_request(`remove_review/${review_id}`);
  };

  approve_review = async (review) => {
    let { reviews } = this.state;
    reviews = reviews.filter((revw) => revw._id !== review._id);
    this.setState({ reviews });

    await post_request(`approve_review/${review._id}`);
  };

  render() {
    let { reviews, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage reviews"
          on_click={this.toggle_form}
          hide={show_form || !reviews || (reviews && !reviews.length)}
          title="add review"
        />

        <div className="row">
          {reviews ? (
            reviews.length ? (
              reviews.map((review) => (
                <Review
                  review={review}
                  approve_review={() => this.approve_review(review)}
                  remove={() => this.remove_review(review._id)}
                />
              ))
            ) : (
              <div className="my-5 d-flex justify-content-center">
                <p className="h4">No Pending Reviews.</p>
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Pending_reviews;

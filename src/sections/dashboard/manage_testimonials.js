import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Add_student_review from "../../components/add_review_form";
import Loadindicator from "../../components/loadindicator";
import Review from "../../components/review";
import { emitter } from "../../App";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_testimonials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let reviews = await post_request("reviews", { verified: true });

    if (!Array.isArray(reviews)) reviews = new Array();

    this.setState({ reviews });

    this.new_alumni_review = (review) => {
      let { reviews } = this.state;
      reviews = new Array(review, ...reviews);
      this.setState({ reviews, review_to_update: false });
    };

    this.review_updated = (review) => {
      let { reviews } = this.state;
      reviews = reviews.map((rev) => (rev._id === review._id ? review : rev));
      this.setState({ reviews, review_to_update: false });
    };
    emitter.listen("new_alumni_review", this.new_alumni_review);
    emitter.listen("review_updated", this.review_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_alumni_review", this.new_alumni_review);
    emitter.remove_listener("review_updated", this.review_updated);
  };

  remove_review = async (review_id) => {
    let { reviews } = this.state;

    reviews = reviews.filter((review) => review._id !== review_id);
    this.setState({ reviews });

    await post_request(`remove_review/${review_id}`);
  };

  toggle_form = () =>
    this.setState({
      show_form: !this.state.show_form,
    });

  add_new_review_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add Review
          </a>
        </div>
      </div>
    );

  edit_review = (review) =>
    this.setState({ review_to_update: review }, this.toggle_form);

  render() {
    let { reviews, show_form, review_to_update } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage reviews"
          on_click={this.toggle_form}
          hide={show_form || !reviews || (reviews && !reviews.length)}
          title="add review"
        />

        <div className="row">
          {show_form ? (
            <div>
              <Add_student_review
                review={review_to_update}
                toggle={this.toggle_form}
                admin
              />
              <hr />
            </div>
          ) : null}

          {reviews ? (
            reviews.length ? (
              reviews.map((review) => (
                <Review
                  review={review}
                  edit={() => this.edit_review(review)}
                  remove={() => this.remove_review(review._id)}
                />
              ))
            ) : (
              <div className="my-5 d-flex justify-content-center">
                <div>
                  <p className="h4">No Reviews yet.</p>
                  <br />
                  {this.add_new_review_btn()}
                </div>
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

export default Manage_testimonials;

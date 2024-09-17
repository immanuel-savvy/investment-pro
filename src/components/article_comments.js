import React from "react";
import { get_request } from "../assets/js/utils/services";
import Comment from "./comment";
import Loadindicator from "./loadindicator";
import Submit_review from "./submit_review";

class Article_comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { skip: 0 };
  }

  componentDidMount = async () => {
    let { article } = this.props;

    let comments = await get_request(
      `comments/${article._id}/${this.state.skip}`
    );
    if (!Array.isArray(comments)) comments = new Array();

    this.setState({ comments });
  };

  new_comment = (comment) => {
    let { article } = this.props;

    if (comment.item !== article._id) return;

    let { comments } = this.state;
    comments = new Array(...comments, comment);
    this.setState({ comments });
  };

  render() {
    let { article } = this.props;
    let { comments } = this.state;

    return (
      <div
        id="article_comments"
        class="mt-5 article_detail_wrapss single_article_wrap format-standard"
      >
        <div class="comment-area">
          <div class="all-comments">
            {comments && comments.length ? (
              <h3 class="comments-title">
                {`${comments.length.toString().padStart(2, "0")} Comments`}
              </h3>
            ) : null}
            <div class="comment-list">
              <ul>
                {comments ? (
                  comments.length ? (
                    comments.map((comment) => (
                      <Comment comment={comment} key={comment._id} />
                    ))
                  ) : null
                ) : (
                  <Loadindicator contained />
                )}
              </ul>
            </div>
          </div>
          <Submit_review on_comment={this.new_comment} item={article} />
        </div>
      </div>
    );
  }
}

export default Article_comments;

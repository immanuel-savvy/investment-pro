import React from "react";
import { to_title } from "../assets/js/utils/functions";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";

class Currency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { currency, edit, remove } = this.props;
    if (!currency) return;

    let { name, image, image_file_hash, short_name } = currency;

    return (
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div class="crs_trt_grid">
          <div class="crs_trt_thumb circle">
            <Preview_image
              image_hash={image_file_hash}
              style={{ height: 100, width: 100 }}
              image={
                image || require("../assets/img/user_image_placeholder.png")
              }
              class_name="img-fluid circle"
            />
          </div>
          <div class="crs_trt_caption">
            <div class="instructor_title">
              <h4>{to_title(name)}</h4>
            </div>
            <div class="trt_rate_inf">
              <span class="alt_rates">({short_name})</span>
            </div>
          </div>

          {edit || remove ? (
            <div class="crs_trt_footer">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {edit && <Text_btn text="Edit" action={() => edit(currency)} />}
                {remove && (
                  <Text_btn text="Remove" action={() => remove(currency)} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Currency;

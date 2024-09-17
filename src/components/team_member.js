import React from "react";
import { to_title } from "../assets/js/utils/functions";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";

class Team_member extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { member, edit, remove } = this.props;

    if (!member) return;

    let { fullname, linkedin, role, image, image_file_hash } = member;

    return (
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div class="crs_trt_grid">
          <div class="crs_trt_thumb circle">
            <a href={linkedin} target="_blank" class="crs_trt_thum_link">
              <Preview_image
                image_hash={image_file_hash}
                style={{ height: 100, width: 100 }}
                image={
                  image || require("../assets/img/user_image_placeholder.png")
                }
                class_name="img-fluid circle"
              />
            </a>
          </div>
          <div class="crs_trt_caption">
            <div class="instructor_tag dark">
              <span>{to_title(role || "Any")}</span>
            </div>
            <div class="instructor_title">
              <h4>
                <a href={linkedin} target="_blank">
                  {to_title(fullname)}
                </a>
              </h4>
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
                {edit && <Text_btn text="Edit" action={() => edit(member)} />}
                {remove && (
                  <Text_btn text="Remove" action={() => remove(member)} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Team_member;

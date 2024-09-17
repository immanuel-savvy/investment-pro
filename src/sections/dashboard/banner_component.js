import React from "react";
import Preview_image from "../../components/preview_image";
import Text_btn from "../../components/text_btn";

class Banner_component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { banner, edit, remove } = this.props;

    if (!banner) return;

    let { image, image_hash, title, sub_text } = banner;

    return (
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="crs_partn ed_view_box">
          <div class="p-3">
            <Preview_image
              image={image}
              image_hash={image_hash}
              class_name="img-fluid"
            />
          </div>
          <h6>{title}</h6>
          <p>{sub_text}</p>

          {edit || remove ? (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {edit ? (
                <Text_btn text="Edit" icon="fa-edit" action={edit} />
              ) : null}
              {remove ? (
                <Text_btn text="Remove" icon="fa-cancel" action={remove} />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Banner_component;

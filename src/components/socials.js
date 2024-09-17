import React from "react";

class Socials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="fixed_on_page_box" id="fixed_socials">
        <div className="icon_linkedin pl3 mb-3">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://wa.me/+16604140871/?text=Hello,%20I%20like%20to%20enquire%20about%20investments%20with%20Ultra%20Capital?"
          >
            <img src="https://giit.com.ng/assets/images/icon_whatsapp.png?1666193786" />
          </a>
        </div>
      </div>
    );
  }
}

export default Socials;

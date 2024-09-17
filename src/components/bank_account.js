import React from "react";

class Bank_account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { address, action } = this.props;
    if (!address) return;
    let { currency, wallet_address } = address;

    return (
      <div class="col-lg-6 col-md-6 col-sm-12">
        <a href="#" onClick={() => action && action(address)}>
          <div class="edu_cat_2 cat-1">
            {/* <div class="edu_cat_icons">
            <a class="pic-main" href="#">
              <img src="assets/img/content.png" class="img-fluid" alt="" />
            </a>
          </div> */}
            <div class="edu_cat_data">
              <h4 class="title">
                <a href="#">{currency?.short_name || "BTC"}</a>
              </h4>
              <ul class="meta">
                <li class="video">
                  <i class="-wallet"></i>
                  {wallet_address}
                </li>
              </ul>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default Bank_account;

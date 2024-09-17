import React from "react";

class Divs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { d } = this.props;

    return (
      <section>
        <div className="container">
          {d === 3 ? (
            <div
              style={{
                width: 250,
                height: 335,
                backgroundColor: "#FAFAFA",
                overflow: "hidden",
                boxSizing: "border-box",
                border: "1px solid #56667F",
                borderRadius: 4,
                textAlign: "right",
                lineHeight: 14,
                blockSize: 335,
                fontSize: 12,
                fontFeatureSettings: "normal",
                textSizeAdjust: "100%",
                boxShadow: "inset 0 -20px 0 0 #56667F",
                margin: 0,
                width: 250,
                padding: 1,
                padding: 0,
                margin: 0,
              }}
            >
              <div
                style={{ height: 315, padding: 0, margin: 0, width: "100%" }}
              >
                <iframe
                  src="https://widget.coinlib.io/widget?type=converter&theme=light"
                  width="250"
                  height="310px"
                  scrolling="auto"
                  marginwidth="0"
                  marginheight="0"
                  frameborder="0"
                  border="0"
                  style={{ border: 0, margin: 0, padding: 0 }}
                ></iframe>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  lineHeight: 14,
                  fontWeight: 400,
                  fontSize: 11,
                  boxSizing: "border-box",
                  padding: "2px 6px",
                  width: "100%",
                  fontFamily: "Verdana, Tahoma, Arial, sans-serif",
                }}
              >
                <a
                  href="https://coinlib.io"
                  target="_blank"
                  style={{
                    fontWeight: 500,
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: 11,
                  }}
                >
                  Cryptocurrency Prices
                </a>
                &nbsp;by Coinlib
              </div>
            </div>
          ) : d === 2 ? (
            <div
              style={{
                height: 560,
                backgroundColor: "#FFFFFF",
                overflow: "hidden",
                boxSizing: "border-box",
                border: "1px solid #56667F",
                borderRadius: 4,
                textAlign: "right",
                lineHeight: 14,
                fontSize: 12,
                fontFeatureSettings: "normal",
                textSizeAdjust: "100%",
                boxShadow: "inset 0 -20px 0 0 #56667F",
                padding: 1,
                padding: 0,
                margin: 0,
                width: "100%",
              }}
            >
              <div
                style={{ height: 540, padding: 0, margin: 0, width: "100%" }}
              >
                <iframe
                  src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505"
                  width="100%"
                  height="536px"
                  scrolling="auto"
                  marginwidth="0"
                  marginheight="0"
                  frameborder="0"
                  border="0"
                  style={{ border: 0, margin: 0, padding: 0, lineHeight: 14 }}
                ></iframe>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  lineHeight: 14,
                  fontWeight: 400,
                  fontSize: 11,
                  boxSizing: "border-box",
                  padding: "2px 6px",
                  width: "100%",
                  fontFamily: "Verdana, Tahoma, Arial, sans-serif",
                }}
              >
                <a
                  href="https://coinlib.io"
                  target="_blank"
                  style={{
                    fontWeight: 500,
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: 11,
                  }}
                >
                  Cryptocurrency Prices
                </a>
                &nbsp;by Coinlib
              </div>
            </div>
          ) : (
            <div
              style={{
                height: 433,
                backgroundColor: "#FFFFFF",
                overflow: "hidden",
                boxSizing: "border-box",
                border: "1px solid #56667F",
                borderRadius: 4,
                textAlign: "right",
                lineHeight: 14,
                fontSize: 12,
                fontFeatureSettings: "normal",
                textSizeAdjust: "100%",
                boxShadow: "inset 0 -20px 0 0 #56667F",
                padding: 0,
                margin: 0,
                width: "100%",
              }}
            >
              <div
                style={{ height: 413, padding: 0, margin: 0, width: "100%" }}
              >
                <iframe
                  src="https://widget.coinlib.io/widget?type=full_v2&theme=light&cnt=6&pref_coin_id=1505&graph=yes"
                  width="100%"
                  height="409px"
                  scrolling="auto"
                  marginwidth="0"
                  marginheight="0"
                  frameborder="0"
                  border="0"
                  style={{ border: 0, margin: 0, padding: 0 }}
                ></iframe>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  lineHeight: 14,
                  fontWeight: 400,
                  fontSize: 11,
                  boxSizing: "border-box",
                  padding: "2px 6px",
                  width: "100%",
                  fontFamily: "Verdana, Tahoma, Arial, sans-serif",
                }}
              >
                <a
                  href="https://coinlib.io"
                  target="_blank"
                  style={{
                    fontWeight: 500,
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: 11,
                  }}
                >
                  Cryptocurrency Prices
                </a>
                &nbsp;by Coinlib
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default Divs;

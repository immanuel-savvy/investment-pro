"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify_email = exports.users = exports.user_by_email = exports.user = exports.update_user = exports.to_title = exports.signup = exports.send_mail = exports.request_password_otp = exports.login = void 0;
var _conn = require("../ds/conn");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _functions = require("generalised-datastore/utils/functions");
var _emails = require("./emails");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var email_verification_codes = new Object();
var reset_id = function reset_id(_id, folder) {
  _id = _id.split("$");
  _id = [folder || "users", _id[1], "".concat(_id[2]).concat(_id[0])];
  return _id.join("~");
};
var unmask_id = function unmask_id(_id, folder) {
  return _id && reset_id(_id, folder);
};
var to_title = function to_title(string) {
  if (!string) return string;
  var str = "";
  string.split(" ").map(function (s) {
    if (s) str += " " + s[0].toUpperCase() + s.slice(1);
  });
  return str.trim();
};
exports.to_title = to_title;
var send_mail = function send_mail(_ref) {
  var recipient = _ref.recipient,
    recipient_name = _ref.recipient_name,
    sender_name = _ref.sender_name,
    subject = _ref.subject,
    text = _ref.text,
    html = _ref.html,
    cc = _ref.cc,
    to = _ref.to;
  var transporter;
  text = text || "";
  html = html || "";
  var sender = "info@ultracapitals.org";
  sender_name = sender_name || "Ultra Capitals";
  try {
    transporter = _nodemailer.default.createTransport({
      host: "ultracapitals.org",
      port: 465,
      secure: true,
      auth: {
        user: sender,
        pass: "infoultracapitals"
      }
    });
    console.log("in here with", recipient || to);
  } catch (e) {}
  try {
    transporter.sendMail({
      from: "".concat(sender_name, " <").concat(sender, ">"),
      to: to || "".concat(recipient_name, " <").concat(recipient, ">"),
      subject: subject,
      text: text,
      cc: cc,
      html: html
    }).then(function () {}).catch(function (e) {
      return console.log(e);
    });
    console.log("Email sent", recipient);
  } catch (e) {}
};
exports.send_mail = send_mail;
var users = function users(req, res) {
  var _req$body = req.body,
    query = _req$body.query,
    limit = _req$body.limit,
    skip = _req$body.skip;
  res.json({
    ok: true,
    message: "users",
    data: _conn.USERS.read(query, {
      limit: limit,
      skip: skip
    })
  });
};
exports.users = users;
var signup = function signup(req, res) {
  var user = req.body;
  var key = user.password;
  delete user.password;
  user.email = user.email.toLowerCase().trim();
  var ref = user.referral && _conn.USERS.readone(unmask_id(user.referral));
  if (ref) user.referral = ref._id;
  var user_exists = _conn.USERS.readone({
    email: user.email
  });
  if (user_exists) return res.json({
    ok: false,
    message: "user exists",
    data: "email already used."
  });
  if (user_exists) {
    user._id = user_exists._id;
    _conn.USERS.update(user._id, {
      firstname: user.firstname,
      lastname: user.lastname,
      referral: ref && ref._id
    });
    _conn.USERS_HASH.update({
      user: user._id
    }, {
      key: key
    });
  } else {
    user.image = (0, _utils.save_image)(user.image);
    var result = _conn.USERS.write(user);
    user._id = result._id;
    user.created = result.created;
    _conn.USERS_HASH.write({
      user: user._id,
      key: key
    });
  }
  var code = (0, _functions.generate_random_string)(6);
  email_verification_codes[user.email] = code;
  var fullname = to_title("".concat(user.firstname, " ").concat(user.lastname));
  send_mail({
    recipient: user.email,
    recipient_name: fullname,
    subject: "[Ultra Capitals] Please verify your email",
    sender_name: "Ultra Capitals",
    html: (0, _emails.verification)(code, fullname)
  });
  send_mail({
    recipient: "admin@ultracapitals.org",
    recipient_name: "Ultra Capitals",
    subject: "[Ultra Capitals] New User Alert",
    sender_name: "Ultra Capitals",
    html: (0, _emails.new_user)(user)
  });
  if (ref) _conn.USERS.update(ref._id, {
    referrals: {
      $inc: 1
    }
  });
  res.json({
    ok: true,
    message: "user signup",
    data: {
      email: user.email,
      _id: user._id,
      referral: ref && ref._id
    }
  });
};
exports.signup = signup;
var user_by_email = function user_by_email(req, res) {
  var email = req.body.email;
  res.json({
    ok: true,
    message: "user by email",
    data: _conn.USERS.readone({
      email: email
    }) || "User not found"
  });
};
exports.user_by_email = user_by_email;
var update_user = function update_user(req, res) {
  var user = req.params.user;
  var user_obj = req.body;
  var prior_user = _conn.USERS.readone(user);
  if (prior_user.image && user_obj.image && !user_obj.image.endsWith(".jpg")) (0, _utils.remove_image)(prior_user.image);
  user_obj.image = (0, _utils.save_image)(user_obj.image);
  user = _conn.USERS.update(user, _objectSpread({}, user_obj));
  res.json({
    ok: true,
    message: "user updated",
    data: _objectSpread(_objectSpread({}, user), {}, {
      image: user_obj.image
    })
  });
};
exports.update_user = update_user;
var user = function user(req, res) {
  var user_id = req.params.user_id;
  res.json({
    ok: true,
    message: "user fetched",
    data: _conn.USERS.readone(user_id)
  });
};
exports.user = user;
var verify_email = function verify_email(req, res) {
  var _req$body2 = req.body,
    email = _req$body2.email,
    verification_code = _req$body2.verification_code,
    password = _req$body2.password;
  email = email && email.trim().toLowerCase();
  verification_code = verification_code && verification_code.trim();
  var code = email_verification_codes[email];
  if (!code || code !== verification_code) return res.json({
    ok: false,
    message: "",
    data: {
      message: "Email verification failed."
    }
  });
  var user = _conn.USERS.readone({
    email: email
  });
  if (!user) return res.json({
    ok: false,
    data: {
      message: "User not found!"
    }
  });
  if (password) _conn.USERS_HASH.update({
    user: user._id
  }, {
    key: password
  });else {
    var w = _conn.WALLETS.write({
      user: user._id,
      balance: 0,
      investments: 0,
      pending_withdrawal: 0,
      earnings: 0
    });
    _conn.USERS.update(user._id, {
      verified: true,
      wallet: w._id
    });
    user.wallet = w._id;
  }
  res.json({
    ok: true,
    message: "user email verified",
    data: user
  });
};
exports.verify_email = verify_email;
var login = function login(req, res) {
  var _req$body3 = req.body,
    email = _req$body3.email,
    password = _req$body3.password;
  var user = _conn.USERS.readone({
    email: email.toLowerCase()
  });
  if (!user) return res.json({
    ok: false,
    message: "user not found",
    data: "User not found"
  });
  var user_hash = _conn.USERS_HASH.readone({
    user: user._id
  });
  if (!user_hash || user_hash && user_hash.key !== password) return res.json({
    ok: false,
    message: "invalid password",
    data: "Invalid password"
  });
  res.json({
    ok: true,
    message: "user logged-in",
    data: user
  });
};
exports.login = login;
var request_password_otp = function request_password_otp(req, res) {
  var email = req.body.email;
  if (!email) return res.json({
    ok: false,
    data: {
      message: "Invalid data"
    }
  });
  email = email.trim().toLowerCase();
  var user = _conn.USERS.readone({
    email: email
  });
  if (!user) return res.json({
    ok: false,
    data: {
      message: "User not found"
    }
  });
  var otp = (0, _functions.generate_random_string)(6, "num");
  email_verification_codes[email] = otp;
  send_mail({
    recipient: email,
    subject: "[Investment Pro] Please verify your email",
    html: (0, _emails.forgot_password_email)(otp)
  });
  res.json({
    ok: true,
    message: "",
    data: {
      _id: user._id
    }
  });
};
exports.request_password_otp = request_password_otp;
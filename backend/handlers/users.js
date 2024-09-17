import { USERS, USERS_HASH, WALLETS } from "../ds/conn";
import nodemailer from "nodemailer";
import { generate_random_string } from "generalised-datastore/utils/functions";
import { new_user, verification } from "./emails";
import { remove_image, save_image } from "./utils";
import { forgot_password_email } from "./emails";

let email_verification_codes = new Object();

const reset_id = (_id, folder) => {
  _id = _id.split("$");
  _id = [folder || "users", _id[1], `${_id[2]}${_id[0]}`];

  return _id.join("~");
};

const unmask_id = (_id, folder) => _id && reset_id(_id, folder);

const to_title = (string) => {
  if (!string) return string;

  let str = "";
  string.split(" ").map((s) => {
    if (s) str += " " + s[0].toUpperCase() + s.slice(1);
  });
  return str.trim();
};

const send_mail = ({
  recipient,
  recipient_name,
  sender_name,
  subject,
  text,
  html,
  cc,
  to,
}) => {
  let transporter;

  text = text || "";
  html = html || "";
  let sender = "info@ultracapitals.org";
  sender_name = sender_name || "Ultra Capitals";

  try {
    transporter = nodemailer.createTransport({
      host: "ultracapitals.org",
      port: 465,
      secure: true,
      auth: {
        user: sender,
        pass: "infoultracapitals",
      },
    });

    console.log("in here with", recipient || to);
  } catch (e) {}

  try {
    transporter
      .sendMail({
        from: `${sender_name} <${sender}>`,
        to: to || `${recipient_name} <${recipient}>`,
        subject,
        text,
        cc,
        html,
      })
      .then(() => {})
      .catch((e) => console.log(e));
    console.log("Email sent", recipient);
  } catch (e) {}
};

const users = (req, res) => {
  let { query, limit, skip } = req.body;

  res.json({
    ok: true,
    message: "users",
    data: USERS.read(query, { limit, skip }),
  });
};

const signup = (req, res) => {
  let user = req.body;

  let key = user.password;
  delete user.password;
  user.email = user.email.toLowerCase().trim();
  let ref = user.referral && USERS.readone(unmask_id(user.referral));

  if (ref) user.referral = ref._id;

  let user_exists = USERS.readone({ email: user.email });

  if (user_exists)
    return res.json({
      ok: false,
      message: "user exists",
      data: "email already used.",
    });

  if (user_exists) {
    user._id = user_exists._id;
    USERS.update(user._id, {
      firstname: user.firstname,
      lastname: user.lastname,
      referral: ref && ref._id,
    });

    USERS_HASH.update({ user: user._id }, { key });
  } else {
    user.image = save_image(user.image);
    let result = USERS.write(user);
    user._id = result._id;
    user.created = result.created;

    USERS_HASH.write({ user: user._id, key });
  }

  let code = generate_random_string(6);
  email_verification_codes[user.email] = code;

  let fullname = to_title(`${user.firstname} ${user.lastname}`);

  send_mail({
    recipient: user.email,
    recipient_name: fullname,
    subject: "[Ultra Capitals] Please verify your email",
    sender_name: "Ultra Capitals",
    html: verification(code, fullname),
  });

  send_mail({
    recipient: "admin@ultracapitals.org",
    recipient_name: "Ultra Capitals",
    subject: "[Ultra Capitals] New User Alert",
    sender_name: "Ultra Capitals",
    html: new_user(user),
  });

  if (ref) USERS.update(ref._id, { referrals: { $inc: 1 } });

  res.json({
    ok: true,
    message: "user signup",
    data: { email: user.email, _id: user._id, referral: ref && ref._id },
  });
};

const user_by_email = (req, res) => {
  let { email } = req.body;

  res.json({
    ok: true,
    message: "user by email",
    data: USERS.readone({ email }) || "User not found",
  });
};

const update_user = (req, res) => {
  let { user } = req.params;

  let user_obj = req.body;

  let prior_user = USERS.readone(user);
  if (prior_user.image && user_obj.image && !user_obj.image.endsWith(".jpg"))
    remove_image(prior_user.image);

  user_obj.image = save_image(user_obj.image);

  user = USERS.update(user, { ...user_obj });

  res.json({
    ok: true,
    message: "user updated",
    data: { ...user, image: user_obj.image },
  });
};

const user = (req, res) => {
  let { user_id } = req.params;

  res.json({ ok: true, message: "user fetched", data: USERS.readone(user_id) });
};

const verify_email = (req, res) => {
  let { email, verification_code, password } = req.body;
  email = email && email.trim().toLowerCase();
  verification_code = verification_code && verification_code.trim();

  let code = email_verification_codes[email];

  if (!code || code !== verification_code)
    return res.json({
      ok: false,
      message: "",
      data: { message: "Email verification failed." },
    });

  let user = USERS.readone({ email });
  if (!user)
    return res.json({ ok: false, data: { message: "User not found!" } });

  if (password) USERS_HASH.update({ user: user._id }, { key: password });
  else {
    let w = WALLETS.write({
      user: user._id,
      balance: 0,
      investments: 0,
      pending_withdrawal: 0,
      earnings: 0,
    });
    USERS.update(user._id, { verified: true, wallet: w._id });
    user.wallet = w._id;
  }

  res.json({ ok: true, message: "user email verified", data: user });
};

const login = (req, res) => {
  let { email, password } = req.body;

  let user = USERS.readone({ email: email.toLowerCase() });
  if (!user)
    return res.json({
      ok: false,
      message: "user not found",
      data: "User not found",
    });

  let user_hash = USERS_HASH.readone({ user: user._id });
  if (!user_hash || (user_hash && user_hash.key !== password))
    return res.json({
      ok: false,
      message: "invalid password",
      data: "Invalid password",
    });

  res.json({ ok: true, message: "user logged-in", data: user });
};

const request_password_otp = (req, res) => {
  let { email } = req.body;

  if (!email) return res.json({ ok: false, data: { message: "Invalid data" } });

  email = email.trim().toLowerCase();

  let user = USERS.readone({ email });
  if (!user)
    return res.json({ ok: false, data: { message: "User not found" } });

  let otp = generate_random_string(6, "num");
  email_verification_codes[email] = otp;

  send_mail({
    recipient: email,
    subject: "[Investment Pro] Please verify your email",
    html: forgot_password_email(otp),
  });

  res.json({ ok: true, message: "", data: { _id: user._id } });
};

export {
  signup,
  login,
  user_by_email,
  user,
  send_mail,
  verify_email,
  to_title,
  update_user,
  users,
  request_password_otp,
};

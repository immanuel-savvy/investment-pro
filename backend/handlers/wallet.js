import {
  TOPUP_REQUESTS,
  USERS,
  USER_REQUESTS,
  WALLETS,
  WALLET_ADDRESSES,
  WITHDRAWAL_REQUESTS,
} from "../ds/conn";
import { save_image } from "./utils";

const topup = (req, res) => {
  let { value, currency, wallet, user, approve, request } = req.body;
  value = Number(value);
  if (value < 0) value = 0;

  if (!wallet || !value || !currency || !request) return res.end();
  let request_body = TOPUP_REQUESTS.readone(request);
  if (request_body.state !== "pending") return res.end();

  if (!approve) {
    TOPUP_REQUESTS.update(request, { state: "declined" });
    USER_REQUESTS.update({ user, request }, { state: "declined" });
    return res.end();
  }

  let val = WALLETS.update(wallet, {
    /* balance: { $inc: value }  */
  });
  TOPUP_REQUESTS.update(request, { state: "approved" });
  USER_REQUESTS.update({ user, request }, { state: "approved" });

  res.json({ ok: true, data: { wallet: val } });
};

const topup_request = (req, res) => {
  let { value, currency, image, user, wallet } = req.body;

  value = Number(value);
  if (value < 0) value = 0;

  if (!wallet || !value || !image || !currency) return res.end();

  image = save_image(image);

  let result = TOPUP_REQUESTS.write({
    value,
    currency,
    image,
    wallet,
    user,
    state: "pending",
  });
  USER_REQUESTS.write({
    user,
    credit: true,
    state: "pending",
    request: result._id,
  });

  res.json({ ok: true, data: { _id: result._id, created: result.created } });
};

const withdrawal_request = (req, res) => {
  let { value, currency, address, user, wallet } = req.body;

  value = Number(value);
  if (value < 0) value = 0;

  if (!wallet || !value || !address) return res.end();

  let result = WITHDRAWAL_REQUESTS.write({
    value,

    wallet,
    address,
    user,
    state: "pending",
  });
  USER_REQUESTS.write({
    user,
    credit: false,
    state: "pending",
    request: result._id,
  });
  // WALLETS.update(wallet, {
  //   balance: { $dec: value },
  //   pending_withdrawal: { $inc: value },
  // });

  res.json({ ok: true, data: { _id: result._id, created: result.created } });
};

const withdraw = (req, res) => {
  let { value, wallet, image, user, approve, request } = req.body;
  value = Number(value);
  if (value < 0) value = 0;

  if (!wallet || !value || (!image && approve) || !request) return res.end();
  let request_body = WITHDRAWAL_REQUESTS.readone(request);
  if (request_body.state !== "pending") return res.end();

  if (!approve) {
    WITHDRAWAL_REQUESTS.update(request, { state: "declined" });
    USER_REQUESTS.update({ user, request }, { state: "declined" });
    // WALLETS.update(wallet, {
    //   pending_withdrawal: { $dec: value },
    //   balance: { $inc: value },
    // });
    return res.end();
  }

  let val = WALLETS.update(wallet, {
    // pending_withdrawal: { $dec: value },
  });
  WITHDRAWAL_REQUESTS.update(request, {
    state: "approved",
    image: save_image(image),
  });
  USER_REQUESTS.update({ user, request }, { state: "approved" });

  res.json({ ok: true, data: { wallet: val } });
};

const topup_requests = (req, res) => {
  let { state, limit, user, skip } = req.body;

  res.json({
    ok: true,
    data: (user ? USER_REQUESTS : TOPUP_REQUESTS).read(
      user ? { credit: true, user, state } : { state },
      { skip, limit }
    ),
  });
};

const withdrawal_requests = (req, res) => {
  let { state, limit, user, skip } = req.body;

  res.json({
    ok: true,
    data: (user ? USER_REQUESTS : WITHDRAWAL_REQUESTS).read(
      user ? { credit: false, user, state } : { state },
      { skip, limit }
    ),
  });
};

const wallet = (req, res) => {
  let { wallet, user } = req.body;
  if (!wallet) {
    user = USERS.readone(user);
    wallet = user.wallet;
    if (!wallet) {
      let w = WALLETS.write({
        user: user._id,
        balance: 0,
        investments: 0,
        pending_withdrawal: 0,
        earnings: 0,
      });
      wallet = w._id;
      USERS.update(user._id, { verified: true, wallet: w._id });
    }
  }

  res.json({ ok: true, data: WALLETS.readone(wallet) });
};

const wallet_addresses = (req, res) => {
  let { wallet } = req.params;

  res.json({ ok: true, data: WALLET_ADDRESSES.read({ wallet }) });
};

const add_address = (req, res) => {
  let address = req.body;

  let result = WALLET_ADDRESSES.write(address);

  res.json({ ok: true, data: { _id: result._id, created: result.created } });
};

const credit_wallet = (req, res) => {
  let { wallet, value } = req.body;
  if (!wallet || !value || Number(value) <= 0)
    return res.json({ ok: false, data: { message: "Invalid request" } });

  let result = WALLETS.update(wallet, { balance: { $inc: value } });
  res.json({
    ok: true,
    data: {
      ok: result ? true : false,
      message: result ? null : "Wallet not found.",
    },
  });
};

const debit_wallet = (req, res) => {
  let { wallet, value } = req.body;
  if (!wallet || !value || Number(value) <= 0)
    return res.json({ ok: false, data: { message: "Invalid request" } });

  let result = WALLETS.update(wallet, { balance: { $dec: value } });
  res.json({
    ok: true,
    data: {
      ok: result ? true : false,
      message: result ? null : "Wallet not found.",
    },
  });
};

const update_earning = (req, res) => {
  let { wallet, amount } = req.body;

  WALLETS.update(wallet, { earnings: { $inc: amount } });

  res.json({ ok: true, data: { ok: true } });
};

const update_withdrawal = (req, res) => {
  let { wallet, amount } = req.body;

  WALLETS.update(wallet, { pending_withdrawal: { $inc: amount } });

  res.json({ ok: true, data: { ok: true } });
};

export {
  topup,
  topup_request,
  add_address,
  update_earning,
  update_withdrawal,
  credit_wallet,
  withdrawal_request,
  wallet_addresses,
  withdraw,
  withdrawal_requests,
  debit_wallet,
  wallet,
  topup_requests,
};

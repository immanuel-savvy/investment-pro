"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withdrawal_requests = exports.withdrawal_request = exports.withdraw = exports.wallet_addresses = exports.wallet = exports.update_withdrawal = exports.update_earning = exports.topup_requests = exports.topup_request = exports.topup = exports.debit_wallet = exports.credit_wallet = exports.add_address = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
var topup = function topup(req, res) {
  var _req$body = req.body,
    value = _req$body.value,
    currency = _req$body.currency,
    wallet = _req$body.wallet,
    user = _req$body.user,
    approve = _req$body.approve,
    request = _req$body.request;
  value = Number(value);
  if (value < 0) value = 0;
  if (!wallet || !value || !currency || !request) return res.end();
  var request_body = _conn.TOPUP_REQUESTS.readone(request);
  if (request_body.state !== "pending") return res.end();
  if (!approve) {
    _conn.TOPUP_REQUESTS.update(request, {
      state: "declined"
    });
    _conn.USER_REQUESTS.update({
      user: user,
      request: request
    }, {
      state: "declined"
    });
    return res.end();
  }
  var val = _conn.WALLETS.update(wallet, {
    /* balance: { $inc: value }  */
  });
  _conn.TOPUP_REQUESTS.update(request, {
    state: "approved"
  });
  _conn.USER_REQUESTS.update({
    user: user,
    request: request
  }, {
    state: "approved"
  });
  res.json({
    ok: true,
    data: {
      wallet: val
    }
  });
};
exports.topup = topup;
var topup_request = function topup_request(req, res) {
  var _req$body2 = req.body,
    value = _req$body2.value,
    currency = _req$body2.currency,
    image = _req$body2.image,
    user = _req$body2.user,
    wallet = _req$body2.wallet;
  value = Number(value);
  if (value < 0) value = 0;
  if (!wallet || !value || !image || !currency) return res.end();
  image = (0, _utils.save_image)(image);
  var result = _conn.TOPUP_REQUESTS.write({
    value: value,
    currency: currency,
    image: image,
    wallet: wallet,
    user: user,
    state: "pending"
  });
  _conn.USER_REQUESTS.write({
    user: user,
    credit: true,
    state: "pending",
    request: result._id
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      created: result.created
    }
  });
};
exports.topup_request = topup_request;
var withdrawal_request = function withdrawal_request(req, res) {
  var _req$body3 = req.body,
    value = _req$body3.value,
    currency = _req$body3.currency,
    address = _req$body3.address,
    user = _req$body3.user,
    wallet = _req$body3.wallet;
  value = Number(value);
  if (value < 0) value = 0;
  if (!wallet || !value || !address) return res.end();
  var result = _conn.WITHDRAWAL_REQUESTS.write({
    value: value,
    wallet: wallet,
    address: address,
    user: user,
    state: "pending"
  });
  _conn.USER_REQUESTS.write({
    user: user,
    credit: false,
    state: "pending",
    request: result._id
  });
  // WALLETS.update(wallet, {
  //   balance: { $dec: value },
  //   pending_withdrawal: { $inc: value },
  // });

  res.json({
    ok: true,
    data: {
      _id: result._id,
      created: result.created
    }
  });
};
exports.withdrawal_request = withdrawal_request;
var withdraw = function withdraw(req, res) {
  var _req$body4 = req.body,
    value = _req$body4.value,
    wallet = _req$body4.wallet,
    image = _req$body4.image,
    user = _req$body4.user,
    approve = _req$body4.approve,
    request = _req$body4.request;
  value = Number(value);
  if (value < 0) value = 0;
  if (!wallet || !value || !image && approve || !request) return res.end();
  var request_body = _conn.WITHDRAWAL_REQUESTS.readone(request);
  if (request_body.state !== "pending") return res.end();
  if (!approve) {
    _conn.WITHDRAWAL_REQUESTS.update(request, {
      state: "declined"
    });
    _conn.USER_REQUESTS.update({
      user: user,
      request: request
    }, {
      state: "declined"
    });
    // WALLETS.update(wallet, {
    //   pending_withdrawal: { $dec: value },
    //   balance: { $inc: value },
    // });
    return res.end();
  }
  var val = _conn.WALLETS.update(wallet, {
    // pending_withdrawal: { $dec: value },
  });
  _conn.WITHDRAWAL_REQUESTS.update(request, {
    state: "approved",
    image: (0, _utils.save_image)(image)
  });
  _conn.USER_REQUESTS.update({
    user: user,
    request: request
  }, {
    state: "approved"
  });
  res.json({
    ok: true,
    data: {
      wallet: val
    }
  });
};
exports.withdraw = withdraw;
var topup_requests = function topup_requests(req, res) {
  var _req$body5 = req.body,
    state = _req$body5.state,
    limit = _req$body5.limit,
    user = _req$body5.user,
    skip = _req$body5.skip;
  res.json({
    ok: true,
    data: (user ? _conn.USER_REQUESTS : _conn.TOPUP_REQUESTS).read(user ? {
      credit: true,
      user: user,
      state: state
    } : {
      state: state
    }, {
      skip: skip,
      limit: limit
    })
  });
};
exports.topup_requests = topup_requests;
var withdrawal_requests = function withdrawal_requests(req, res) {
  var _req$body6 = req.body,
    state = _req$body6.state,
    limit = _req$body6.limit,
    user = _req$body6.user,
    skip = _req$body6.skip;
  res.json({
    ok: true,
    data: (user ? _conn.USER_REQUESTS : _conn.WITHDRAWAL_REQUESTS).read(user ? {
      credit: false,
      user: user,
      state: state
    } : {
      state: state
    }, {
      skip: skip,
      limit: limit
    })
  });
};
exports.withdrawal_requests = withdrawal_requests;
var wallet = function wallet(req, res) {
  var _req$body7 = req.body,
    wallet = _req$body7.wallet,
    user = _req$body7.user;
  if (!wallet) {
    user = _conn.USERS.readone(user);
    wallet = user.wallet;
    if (!wallet) {
      var w = _conn.WALLETS.write({
        user: user._id,
        balance: 0,
        investments: 0,
        pending_withdrawal: 0,
        earnings: 0
      });
      wallet = w._id;
      _conn.USERS.update(user._id, {
        verified: true,
        wallet: w._id
      });
    }
  }
  res.json({
    ok: true,
    data: _conn.WALLETS.readone(wallet)
  });
};
exports.wallet = wallet;
var wallet_addresses = function wallet_addresses(req, res) {
  var wallet = req.params.wallet;
  res.json({
    ok: true,
    data: _conn.WALLET_ADDRESSES.read({
      wallet: wallet
    })
  });
};
exports.wallet_addresses = wallet_addresses;
var add_address = function add_address(req, res) {
  var address = req.body;
  var result = _conn.WALLET_ADDRESSES.write(address);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      created: result.created
    }
  });
};
exports.add_address = add_address;
var credit_wallet = function credit_wallet(req, res) {
  var _req$body8 = req.body,
    wallet = _req$body8.wallet,
    value = _req$body8.value;
  if (!wallet || !value || Number(value) <= 0) return res.json({
    ok: false,
    data: {
      message: "Invalid request"
    }
  });
  var result = _conn.WALLETS.update(wallet, {
    balance: {
      $inc: value
    }
  });
  res.json({
    ok: true,
    data: {
      ok: result ? true : false,
      message: result ? null : "Wallet not found."
    }
  });
};
exports.credit_wallet = credit_wallet;
var debit_wallet = function debit_wallet(req, res) {
  var _req$body9 = req.body,
    wallet = _req$body9.wallet,
    value = _req$body9.value;
  if (!wallet || !value || Number(value) <= 0) return res.json({
    ok: false,
    data: {
      message: "Invalid request"
    }
  });
  var result = _conn.WALLETS.update(wallet, {
    balance: {
      $dec: value
    }
  });
  res.json({
    ok: true,
    data: {
      ok: result ? true : false,
      message: result ? null : "Wallet not found."
    }
  });
};
exports.debit_wallet = debit_wallet;
var update_earning = function update_earning(req, res) {
  var _req$body10 = req.body,
    wallet = _req$body10.wallet,
    amount = _req$body10.amount;
  _conn.WALLETS.update(wallet, {
    earnings: {
      $inc: amount
    }
  });
  res.json({
    ok: true,
    data: {
      ok: true
    }
  });
};
exports.update_earning = update_earning;
var update_withdrawal = function update_withdrawal(req, res) {
  var _req$body11 = req.body,
    wallet = _req$body11.wallet,
    amount = _req$body11.amount;
  _conn.WALLETS.update(wallet, {
    pending_withdrawal: {
      $inc: amount
    }
  });
  res.json({
    ok: true,
    data: {
      ok: true
    }
  });
};
exports.update_withdrawal = update_withdrawal;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user_invests = exports.update_investment = exports.remove_investment = exports.recent_investments = exports.investments = exports.investment_invests = exports.invest = exports.fulfil_investment = exports.cancel_investment = exports.add_investment = void 0;
var _conn = require("../ds/conn");
var _emails = require("./emails");
var _settings = require("./settings");
var _users = require("./users");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var add_investment = function add_investment(req, res) {
  var data = req.body;
  var result = _conn.INVESTMENTS.write(data);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.add_investment = add_investment;
var update_investment = function update_investment(req, res) {
  var data = req.body;
  var result = _conn.INVESTMENTS.update(data._id, _objectSpread({}, data));
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.update_investment = update_investment;
var investments = function investments(req, res) {
  res.json({
    ok: true,
    data: _conn.INVESTMENTS.read()
  });
};
exports.investments = investments;
var remove_investment = function remove_investment(req, res) {
  var investment = req.params.investment;
  _conn.INVESTMENTS.remove(investment);
  res.end();
};
exports.remove_investment = remove_investment;
var invest = function invest(req, res) {
  var _req$body = req.body,
    investment = _req$body.investment,
    currency = _req$body.currency,
    user = _req$body.user,
    amount = _req$body.amount,
    wallet = _req$body.wallet;
  amount = Math.abs(Number(amount));
  if (!wallet || !user || !amount || !investment) return res.json({
    ok: false,
    data: {
      message: "Incomplete request data"
    }
  });
  wallet = _conn.WALLETS.readone(wallet);
  if (wallet.balance < amount) return res.json({
    ok: false,
    data: {
      message: "Insufficient funds"
    }
  });
  var q = {};
  wallet.balance -= amount;
  wallet.investments += amount;
  q.balance = wallet.balance;
  // q.investments = (wallet.investments || 0) + amount;

  _conn.WALLETS.update(wallet._id, q);
  _conn.WALLETS.update(wallet._id, {
    investments: {
      $inc: amount
    }
  });
  investment = _conn.INVESTMENTS.readone(investment);
  var result = _conn.INVESTS.write({
    investment: investment._id,
    currency: currency,
    user: user,
    amount: amount,
    state: "running",
    wallet: wallet,
    timestamp: Date.now() + investment.duration * 60 * 60 * 1000
  });
  _conn.RUNNING_INVESTMENTS.write({
    invest: result._id
  });
  _conn.INVESTMENTS.update(investment._id, {
    investments: {
      $inc: 1
    }
  });
  _conn.USERS_INVESTS.write({
    invest: result._id,
    user: user
  });
  _conn.INVESTMENTS_INVESTS.write({
    invest: result._id,
    investment: investment._id
  });
  var ivs = _conn.GLOBALS.readone({
    global: _settings.GLOBALS_recent_investments
  });
  if (ivs && ivs.investments) {
    if (ivs.investments.length === 10) {
      ivs.investments.unshift(result._id);
      ivs.investments.pop();
    } else {
      ivs.investments.unshift(result._id);
    }
    _conn.GLOBALS.update({
      global: _settings.GLOBALS_recent_investments,
      _id: ivs._id
    }, {
      investments: ivs.investments
    });
  }
  res.json({
    ok: true,
    data: {
      _id: result._id,
      created: result.created
    }
  });
};
exports.invest = invest;
var recent_investments = function recent_investments(req, res) {
  var invs = _conn.GLOBALS.readone({
    global: _settings.GLOBALS_recent_investments
  });
  var ments = _conn.INVESTS.read(invs.investments);
  ments = ments.map(function (m) {
    m.user = _conn.USERS.readone(m.user);
    return m;
  });
  res.json({
    ok: true,
    data: ments
  });
};
exports.recent_investments = recent_investments;
var user_invests = function user_invests(req, res) {
  var user = req.params.user;
  res.json({
    ok: true,
    data: _conn.USERS_INVESTS.read({
      user: user
    })
  });
};
exports.user_invests = user_invests;
var investment_invests = function investment_invests(req, res) {
  var investment = req.params.investment;
  res.json({
    ok: true,
    data: _conn.INVESTMENTS_INVESTS.read({
      investment: investment
    })
  });
};
exports.investment_invests = investment_invests;
var fulfil_investment = function fulfil_investment(req, res) {
  var running;
  if (!res) running = req;else {
    var _invest = req.body.invest;
    running = _conn.RUNNING_INVESTMENTS.readone({
      invest: _invest
    });
  }
  var _running = running,
    invest = _running.invest,
    _id = _running._id;
  if (invest.timestamp >= Date.now()) return;
  var user = invest.user,
    amount = invest.amount,
    investment = invest.investment;
  var percentage_return = investment.percentage_return,
    title = investment.title,
    referral_bonus = investment.referral_bonus;
  user = _conn.USERS.readone(user);
  var _user = user,
    wallet = _user.wallet,
    email = _user.email,
    referral = _user.referral,
    referral_settled = _user.referral_settled,
    firstname = _user.firstname,
    lastname = _user.lastname;
  wallet = _conn.WALLETS.readone(wallet);
  var earning = amount * (Number(percentage_return) / 100);
  wallet.balance += earning + amount;
  var q = {};
  // q.earnings = (wallet.earnings || 0) + earning;
  q.balance = wallet.balance;
  _conn.WALLETS.update(wallet._id, q);
  _conn.INVESTS.update(invest._id, {
    state: "fulfilled"
  });
  _conn.RUNNING_INVESTMENTS.remove(_id);
  (0, _users.send_mail)({
    recipient: email,
    recipient_name: "".concat(firstname, " ").concat(lastname),
    subject: "Fulfilled - ".concat(title),
    html: (0, _emails.investment_fulfilled)(invest)
  });
  if (referral && !referral_settled) {
    var ref = _conn.USERS.readone(referral);
    _conn.WALLETS.update(ref.wallet, {
      balance: {
        $inc: amount * ((Number(referral_bonus) || 5) / 100)
      }
    });
    (0, _users.send_mail)({
      recipient: ref.email,
      recipient_name: "".concat(ref.firstname, " ").concat(ref.lastname),
      subject: "Referral Bonus - ".concat(title),
      html: (0, _emails.referral_bonus_email)(invest)
    });
  }
  res && res.end();
};
exports.fulfil_investment = fulfil_investment;
var cancel_investment = function cancel_investment(req, res) {
  var _req$body2 = req.body,
    user = _req$body2.user,
    invest = _req$body2.invest;
  _conn.RUNNING_INVESTMENTS.remove({
    invest: invest
  });
  invest = _conn.INVESTS.readone(invest);
  user = _conn.USERS.readone(user || invest.user);
  var wallet = _conn.WALLETS.readone(user.wallet);
  var q = {};
  q.balance = wallet.balance + invest.amount;
  q.investments -= invest.amount;
  _conn.WALLETS.update(wallet._id, q);
  _conn.INVESTS.update(invest._id, {
    state: "cancelled"
  });
  res.end();
};
exports.cancel_investment = cancel_investment;
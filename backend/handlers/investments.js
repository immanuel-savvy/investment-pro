import {
  GLOBALS,
  INVESTMENTS,
  INVESTMENTS_INVESTS,
  INVESTS,
  RUNNING_INVESTMENTS,
  USERS,
  USERS_INVESTS,
  WALLETS,
} from "../ds/conn";
import { investment_fulfilled, referral_bonus_email } from "./emails";
import { GLOBALS_recent_investments } from "./settings";
import { send_mail } from "./users";

const add_investment = (req, res) => {
  let data = req.body;

  let result = INVESTMENTS.write(data);

  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created,
    },
  });
};

const update_investment = (req, res) => {
  let data = req.body;

  let result = INVESTMENTS.update(data._id, { ...data });

  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created,
    },
  });
};

const investments = (req, res) => {
  res.json({ ok: true, data: INVESTMENTS.read() });
};

const remove_investment = (req, res) => {
  let { investment } = req.params;

  INVESTMENTS.remove(investment);

  res.end();
};

const invest = (req, res) => {
  let { investment, currency, user, amount, wallet } = req.body;

  amount = Math.abs(Number(amount));

  if (!wallet || !user || !amount || !investment)
    return res.json({
      ok: false,
      data: { message: "Incomplete request data" },
    });
  wallet = WALLETS.readone(wallet);

  if (wallet.balance < amount)
    return res.json({ ok: false, data: { message: "Insufficient funds" } });

  let q = {};

  wallet.balance -= amount;
  wallet.investments += amount;
  q.balance = wallet.balance;
  // q.investments = (wallet.investments || 0) + amount;

  WALLETS.update(wallet._id, q);
  WALLETS.update(wallet._id, { investments: { $inc: amount } });

  investment = INVESTMENTS.readone(investment);
  let result = INVESTS.write({
    investment: investment._id,
    currency,
    user,
    amount,
    state: "running",
    wallet,
    timestamp: Date.now() + investment.duration * 60 * 60 * 1000,
  });
  RUNNING_INVESTMENTS.write({ invest: result._id });

  INVESTMENTS.update(investment._id, { investments: { $inc: 1 } });
  USERS_INVESTS.write({ invest: result._id, user });
  INVESTMENTS_INVESTS.write({ invest: result._id, investment: investment._id });

  let ivs = GLOBALS.readone({ global: GLOBALS_recent_investments });
  if (ivs && ivs.investments) {
    if (ivs.investments.length === 10) {
      ivs.investments.unshift(result._id);
      ivs.investments.pop();
    } else {
      ivs.investments.unshift(result._id);
    }

    GLOBALS.update(
      { global: GLOBALS_recent_investments, _id: ivs._id },
      { investments: ivs.investments }
    );
  }

  res.json({ ok: true, data: { _id: result._id, created: result.created } });
};

const recent_investments = (req, res) => {
  let invs = GLOBALS.readone({ global: GLOBALS_recent_investments });
  let ments = INVESTS.read(invs.investments);

  ments = ments.map((m) => {
    m.user = USERS.readone(m.user);

    return m;
  });

  res.json({ ok: true, data: ments });
};

const user_invests = (req, res) => {
  let { user } = req.params;

  res.json({ ok: true, data: USERS_INVESTS.read({ user }) });
};

const investment_invests = (req, res) => {
  let { investment } = req.params;

  res.json({ ok: true, data: INVESTMENTS_INVESTS.read({ investment }) });
};

const fulfil_investment = (req, res) => {
  let running;

  if (!res) running = req;
  else {
    let { invest } = req.body;

    running = RUNNING_INVESTMENTS.readone({ invest });
  }

  let { invest, _id } = running;

  if (invest.timestamp >= Date.now()) return;

  let { user, amount, investment } = invest;
  let { percentage_return, title, referral_bonus } = investment;

  user = USERS.readone(user);
  let { wallet, email, referral, referral_settled, firstname, lastname } = user;

  wallet = WALLETS.readone(wallet);

  let earning = amount * (Number(percentage_return) / 100);
  wallet.balance += earning + amount;
  let q = {};
  // q.earnings = (wallet.earnings || 0) + earning;
  q.balance = wallet.balance;
  WALLETS.update(wallet._id, q);
  INVESTS.update(invest._id, { state: "fulfilled" });
  RUNNING_INVESTMENTS.remove(_id);

  send_mail({
    recipient: email,
    recipient_name: `${firstname} ${lastname}`,
    subject: `Fulfilled - ${title}`,
    html: investment_fulfilled(invest),
  });

  if (referral && !referral_settled) {
    let ref = USERS.readone(referral);
    WALLETS.update(ref.wallet, {
      balance: { $inc: amount * ((Number(referral_bonus) || 5) / 100) },
    });

    send_mail({
      recipient: ref.email,
      recipient_name: `${ref.firstname} ${ref.lastname}`,
      subject: `Referral Bonus - ${title}`,
      html: referral_bonus_email(invest),
    });
  }

  res && res.end();
};

const cancel_investment = (req, res) => {
  let { user, invest } = req.body;

  RUNNING_INVESTMENTS.remove({ invest });
  invest = INVESTS.readone(invest);

  user = USERS.readone(user || invest.user);
  let wallet = WALLETS.readone(user.wallet);

  let q = {};
  q.balance = wallet.balance + invest.amount;
  q.investments -= invest.amount;
  WALLETS.update(wallet._id, q);

  INVESTS.update(invest._id, { state: "cancelled" });

  res.end();
};

export {
  invest,
  fulfil_investment,
  remove_investment,
  add_investment,
  user_invests,
  cancel_investment,
  investment_invests,
  update_investment,
  investments,
  recent_investments,
};

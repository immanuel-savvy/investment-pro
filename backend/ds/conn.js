import GDS from "generalised-datastore";

let gds;

let USERS,
  ADMINSTRATORS,
  ADMIN_HASH,
  ARTICLES,
  ARTICLE_CATEGORIES,
  TRENDING_ARTICLES,
  USERS_HASH,
  GLOBALS,
  COMMENTS,
  INVESTMENTS,
  REVIEWS,
  WITHDRAWAL_REQUESTS,
  TOPUP_REQUESTS,
  RUNNING_INVESTMENTS,
  WALLETS,
  CURRENCIES,
  INVESTS,
  TEAM_MEMBER,
  USERS_INVESTS,
  INVESTMENTS_INVESTS,
  USER_REQUESTS,
  WALLET_ADDRESSES,
  REPLIES;

const ds_conn = () => {
  gds = new GDS("investment_pro").sync();

  REVIEWS = gds.folder("reviews");
  ADMINSTRATORS = gds.folder("adminstrators");
  USERS = gds.folder("users");
  RUNNING_INVESTMENTS = gds.folder("running_investments", null, "invest");
  USERS_INVESTS = gds.folder("user_invests", "user", "invest");
  TEAM_MEMBER = gds.folder("team_members");
  INVESTMENTS_INVESTS = gds.folder(
    "investment_invests",
    "investment",
    "invest"
  );
  INVESTS = gds.folder("invests", null, "investment");
  ARTICLES = gds.folder("articles", null, "categories");
  ARTICLE_CATEGORIES = gds.folder("article_categories");
  TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
  WALLET_ADDRESSES = gds.folder("wallet_addresses", "wallet");
  WALLETS = gds.folder("wallets");
  USER_REQUESTS = gds.folder("user_requests", "user", "request");
  INVESTMENTS = gds.folder("investments", null, "currency");
  TOPUP_REQUESTS = gds.folder(
    "topup_requests",
    null,
    new Array("user", "currency")
  );
  WITHDRAWAL_REQUESTS = gds.folder(
    "withdrawal_requests",
    null,
    new Array("user", "currency")
  );
  CURRENCIES = gds.folder("currencies");
  COMMENTS = gds.folder("comments", "item");
  REPLIES = gds.folder("replies", "comment");
  ADMIN_HASH = gds.folder("admin_hash", "admin");
  GLOBALS = gds.folder("globals", "global");
  USERS_HASH = gds.folder("user_hash", "user");
};

export {
  gds,
  TOPUP_REQUESTS,
  USER_REQUESTS,
  WALLET_ADDRESSES,
  WITHDRAWAL_REQUESTS,
  WALLETS,
  INVESTS,
  USERS_INVESTS,
  INVESTMENTS_INVESTS,
  USERS,
  ARTICLES,
  ARTICLE_CATEGORIES,
  TRENDING_ARTICLES,
  RUNNING_INVESTMENTS,
  CURRENCIES,
  ADMIN_HASH,
  ADMINSTRATORS,
  TEAM_MEMBER,
  GLOBALS,
  INVESTMENTS,
  USERS_HASH,
  REVIEWS,
  COMMENTS,
  REPLIES,
};
export default ds_conn;

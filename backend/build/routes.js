"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _users = require("./handlers/users");
var _admin = require("./handlers/admin");
var _settings = require("./handlers/settings");
var _articles = require("./handlers/articles");
var _reviews = require("./handlers/reviews");
var _investments = require("./handlers/investments");
var _wallet = require("./handlers/wallet");
var _team_members = require("./handlers/team_members");
var router = function router(app) {
  app.get("/user/:user_id", _users.user);
  app.get("/get_admins", _admin.get_admins);
  app.get("/stats", _admin.stats);
  app.get("/about_statement", _settings.about_statement);
  app.get("/mission_vision_statement", _settings.mission_vision_statement);
  app.get("/team_members", _team_members.team_members);
  app.get("/entry", _settings.entry);
  app.get("/comments/:article/:skip", _articles.comments);
  app.get("/testimonials", _reviews.alumni_overview);
  app.get("/currencies", _settings.currencies);
  app.get("/investments", _investments.investments);
  app.get("/banners_et_logo", _settings.banners_et_logo);
  app.get("/wallet_addresses/:wallet", _wallet.wallet_addresses);
  app.get("/trending_articles/:limit", _articles.trending_articles);
  app.get("/article/:article", _articles.article);
  app.get("/article_categories", _articles.article_categories);
  app.get("/user_invests/:user", _investments.user_invests);
  app.get("/recent_investments", _investments.recent_investments);
  app.get("/investment_invests/:investment", _investments.investment_invests);
  app.post("/signup", _users.signup);
  app.post("/login", _users.login);
  app.post("/users", _users.users);
  app.post("/user_by_email", _users.user_by_email);
  app.post("/create_admin", _admin.create_admin);
  app.post("/update_user/:user", _users.update_user);
  app.post("/verify_email", _users.verify_email);
  app.post("/admin_login", _admin.admin_login);
  app.post("/update_testimonial_overview", _reviews.update_alumni_overview);
  app.post("/new_reply", _articles.new_reply);
  app.post("/new_comment", _articles.new_comment);
  app.post("/approve_review/:review", _reviews.approve_review);
  app.post("/new_review", _reviews.new_review);
  app.post("/remove_review/:review", _reviews.remove_review);
  app.post("/reviews", _reviews.reviews);
  app.post("/comment_like", _articles.comment_like);
  app.post("/comment_dislike", _articles.comment_dislike);
  app.post("/comment_heart", _articles.comment_heart);
  app.post("/comment_rating", _articles.comment_rating);
  app.post("/update_vision", _settings.update_vision);
  app.post("/update_mission", _settings.update_mission);
  app.post("/update_about_statement", _settings.update_about_statement);
  app.post("/add_banner", _settings.add_banner);
  app.post("/update_banner", _settings.update_banner);
  app.post("/logo_update", _settings.logo_update);
  app.post("/remove_banner/:banner", _settings.remove_banner);
  app.post("/add_team_member", _team_members.add_team_member);
  app.post("/update_team_member", _team_members.update_team_member);
  app.post("/remove_team_member/:member", _team_members.remove_team_member);
  app.post("/add_currency", _settings.add_currency);
  app.post("/update_currency", _settings.update_currency);
  app.post("/remove_currency/:currency", _settings.remove_currency);
  app.post("/remove_trending_article/:trending", _articles.remove_trending_article);
  app.post("/articles", _articles.articles);
  app.post("/article_viewed/:article", _articles.article_viewed);
  app.post("/search_articles", _articles.search_articles);
  app.post("/remove_article_category/:category", _articles.remove_article_category);
  app.post("/add_article_category", _articles.add_article_category);
  app.post("/update_article_category", _articles.update_article_category);
  app.post("/update_article", _articles.update_article);
  app.post("/remove_article/:article", _articles.remove_article);
  app.post("/get_replies", _articles.get_replies);
  app.post("/new_article", _articles.new_article);
  app.post("/credit_wallet", _wallet.credit_wallet);
  app.post("/debit_wallet", _wallet.debit_wallet);
  app.post("/topup", _wallet.topup);
  app.post("/withdraw", _wallet.withdraw);
  app.post("/withdrawal_request", _wallet.withdrawal_request);
  app.post("/topup_request", _wallet.topup_request);
  app.post("/topup_requests", _wallet.topup_requests);
  app.post("/withdrawal_requests", _wallet.withdrawal_requests);
  app.post("/wallet", _wallet.wallet);
  app.post("/update_earning", _wallet.update_earning);
  app.post("/update_withdrawal", _wallet.update_withdrawal);
  app.post("/add_address", _wallet.add_address);
  app.post("/add_investment", _investments.add_investment);
  app.post("/invest", _investments.invest);
  app.post("/cancel_investment", _investments.cancel_investment);
  app.post("/update_investment", _investments.update_investment);
  app.post("/remove_investment/:investment", _investments.remove_investment);
};
var _default = router;
exports.default = _default;
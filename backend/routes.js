import {
  login,
  signup,
  update_user,
  user,
  users,
  user_by_email,
  verify_email,
} from "./handlers/users";
import { admin_login, create_admin, get_admins, stats } from "./handlers/admin";
import {
  about_statement,
  entry,
  mission_vision_statement,
  update_about_statement,
  update_mission,
  update_vision,
  remove_banner,
  add_banner,
  update_banner,
  logo_update,
  banners_et_logo,
  add_currency,
  update_currency,
  remove_currency,
  currencies,
} from "./handlers/settings";
import {
  add_article_category,
  article,
  articles,
  article_categories,
  article_viewed,
  comments,
  comment_dislike,
  comment_heart,
  comment_like,
  comment_rating,
  get_replies,
  new_article,
  new_comment,
  new_reply,
  remove_article,
  remove_article_category,
  remove_trending_article,
  search_articles,
  trending_articles,
  update_article,
  update_article_category,
} from "./handlers/articles";
import {
  alumni_overview,
  approve_review,
  new_review,
  remove_review,
  reviews,
  update_alumni_overview,
} from "./handlers/reviews";
import {
  add_investment,
  cancel_investment,
  invest,
  investment_invests,
  investments,
  recent_investments,
  remove_investment,
  update_investment,
  user_invests,
} from "./handlers/investments";
import {
  add_address,
  credit_wallet,
  debit_wallet,
  topup,
  topup_request,
  topup_requests,
  update_earning,
  update_withdrawal,
  wallet,
  wallet_addresses,
  withdraw,
  withdrawal_request,
  withdrawal_requests,
} from "./handlers/wallet";
import {
  add_team_member,
  remove_team_member,
  team_members,
  update_team_member,
} from "./handlers/team_members";

const router = (app) => {
  app.get("/user/:user_id", user);
  app.get("/get_admins", get_admins);
  app.get("/stats", stats);
  app.get("/about_statement", about_statement);
  app.get("/mission_vision_statement", mission_vision_statement);
  app.get("/team_members", team_members);
  app.get("/entry", entry);
  app.get("/comments/:article/:skip", comments);
  app.get("/testimonials", alumni_overview);
  app.get("/currencies", currencies);
  app.get("/investments", investments);
  app.get("/banners_et_logo", banners_et_logo);
  app.get("/wallet_addresses/:wallet", wallet_addresses);
  app.get("/trending_articles/:limit", trending_articles);
  app.get("/article/:article", article);
  app.get("/article_categories", article_categories);
  app.get("/user_invests/:user", user_invests);
  app.get("/recent_investments", recent_investments);
  app.get("/investment_invests/:investment", investment_invests);

  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/users", users);
  app.post("/user_by_email", user_by_email);
  app.post("/create_admin", create_admin);
  app.post("/update_user/:user", update_user);
  app.post("/verify_email", verify_email);
  app.post("/admin_login", admin_login);
  app.post("/update_testimonial_overview", update_alumni_overview);
  app.post("/new_reply", new_reply);
  app.post("/new_comment", new_comment);
  app.post("/approve_review/:review", approve_review);
  app.post("/new_review", new_review);
  app.post("/remove_review/:review", remove_review);
  app.post("/reviews", reviews);
  app.post("/comment_like", comment_like);
  app.post("/comment_dislike", comment_dislike);
  app.post("/comment_heart", comment_heart);
  app.post("/comment_rating", comment_rating);

  app.post("/update_vision", update_vision);
  app.post("/update_mission", update_mission);
  app.post("/update_about_statement", update_about_statement);

  app.post("/add_banner", add_banner);
  app.post("/update_banner", update_banner);
  app.post("/logo_update", logo_update);
  app.post("/remove_banner/:banner", remove_banner);

  app.post("/add_team_member", add_team_member);
  app.post("/update_team_member", update_team_member);
  app.post("/remove_team_member/:member", remove_team_member);

  app.post("/add_currency", add_currency);
  app.post("/update_currency", update_currency);
  app.post("/remove_currency/:currency", remove_currency);

  app.post("/remove_trending_article/:trending", remove_trending_article);
  app.post("/articles", articles);
  app.post("/article_viewed/:article", article_viewed);
  app.post("/search_articles", search_articles);
  app.post("/remove_article_category/:category", remove_article_category);
  app.post("/add_article_category", add_article_category);
  app.post("/update_article_category", update_article_category);
  app.post("/update_article", update_article);
  app.post("/remove_article/:article", remove_article);
  app.post("/get_replies", get_replies);
  app.post("/new_article", new_article);

  app.post("/credit_wallet", credit_wallet);
  app.post("/debit_wallet", debit_wallet);
  app.post("/topup", topup);
  app.post("/withdraw", withdraw);
  app.post("/withdrawal_request", withdrawal_request);
  app.post("/topup_request", topup_request);
  app.post("/topup_requests", topup_requests);
  app.post("/withdrawal_requests", withdrawal_requests);
  app.post("/wallet", wallet);
  app.post("/update_earning", update_earning);
  app.post("/update_withdrawal", update_withdrawal);
  app.post("/add_address", add_address);

  app.post("/add_investment", add_investment);
  app.post("/invest", invest);
  app.post("/cancel_investment", cancel_investment);
  app.post("/update_investment", update_investment);
  app.post("/remove_investment/:investment", remove_investment);
};

export default router;

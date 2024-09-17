"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_vision = exports.update_mission = exports.update_currency = exports.update_banner = exports.update_about_statement = exports.remove_currency = exports.remove_banner = exports.mission_vision_statement = exports.logo_update = exports.entry = exports.currencies = exports.banners_et_logo = exports.add_currency = exports.add_banner = exports.about_statement = exports.GLOBAL_logo = exports.GLOBALS_vision_statement = exports.GLOBALS_recent_investments = exports.GLOBALS_mission_statement = exports.GLOBALS_about_statement = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var GLOBALS_mission_statement = "mission_statement",
  GLOBALS_vision_statement = "vision_statement",
  GLOBALS_recent_investments = "recent_investments",
  GLOBALS_about_statement = "about_statement";
exports.GLOBALS_about_statement = GLOBALS_about_statement;
exports.GLOBALS_recent_investments = GLOBALS_recent_investments;
exports.GLOBALS_vision_statement = GLOBALS_vision_statement;
exports.GLOBALS_mission_statement = GLOBALS_mission_statement;
var mission_vision_statement = function mission_vision_statement(req, res) {
  var vision = _conn.GLOBALS.readone({
      global: GLOBALS_vision_statement
    }),
    mission = _conn.GLOBALS.readone({
      global: GLOBALS_mission_statement
    });
  res.json({
    ok: true,
    data: {
      vision: vision,
      mission: mission
    }
  });
};
exports.mission_vision_statement = mission_vision_statement;
var update_mission = function update_mission(req, res) {
  var _req$body = req.body,
    mission_statement = _req$body.mission_statement,
    mission_title = _req$body.mission_title,
    mission = _req$body.mission,
    mission_file_hash = _req$body.mission_file_hash;
  if (!mission || !mission_file_hash || !mission_statement) return res.end();
  mission = (0, _utils.save_image)(mission);
  _conn.GLOBALS.update({
    global: GLOBALS_mission_statement
  }, {
    mission_statement: mission_statement,
    mission_title: mission_title,
    mission: mission,
    mission_file_hash: mission_file_hash
  });
  res.json({
    ok: true,
    data: {
      mission: mission
    }
  });
};
exports.update_mission = update_mission;
var update_vision = function update_vision(req, res) {
  var _req$body2 = req.body,
    vision_statement = _req$body2.vision_statement,
    vision_title = _req$body2.vision_title,
    vision = _req$body2.vision,
    vision_file_hash = _req$body2.vision_file_hash;
  if (!vision || !vision_file_hash || !vision_statement) return res.end();
  vision = (0, _utils.save_image)(vision);
  _conn.GLOBALS.update({
    global: GLOBALS_vision_statement
  }, {
    vision_statement: vision_statement,
    vision_title: vision_title,
    vision: vision,
    vision_file_hash: vision_file_hash
  });
  res.json({
    ok: true,
    data: {
      vision: vision
    }
  });
};
exports.update_vision = update_vision;
var update_about_statement = function update_about_statement(req, res) {
  var _req$body3 = req.body,
    about_statement = _req$body3.about_statement,
    bullets = _req$body3.bullets,
    more_details = _req$body3.more_details,
    image = _req$body3.image,
    image_file_hash = _req$body3.image_file_hash;
  if (!image || !image_file_hash || !about_statement) return res.end();
  image = (0, _utils.save_image)(image);
  _conn.GLOBALS.update({
    global: GLOBALS_about_statement
  }, {
    about_statement: about_statement,
    image: image,
    bullets: bullets,
    more_details: more_details,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image
    }
  });
};
exports.update_about_statement = update_about_statement;
var about_statement = function about_statement(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBALS_about_statement
    })
  });
};
exports.about_statement = about_statement;
var entry = function entry(req, res) {
  res.json({
    ok: true,
    data: {
      about: _conn.GLOBALS.readone({
        global: GLOBALS_about_statement
      }),
      vision: _conn.GLOBALS.readone({
        global: GLOBALS_vision_statement
      }),
      mission: _conn.GLOBALS.readone({
        global: GLOBALS_mission_statement
      }),
      banners: _conn.GLOBALS.read({
        global: GLOBAL_banner_stuff
      }),
      logo: _conn.GLOBALS.readone({
        global: GLOBAL_logo
      }),
      currencies: _conn.CURRENCIES.read()
    }
  });
};
exports.entry = entry;
var GLOBAL_banner_stuff = "banner_stuff";
var add_banner = function add_banner(req, res) {
  var _req$body4 = req.body,
    image = _req$body4.image,
    title = _req$body4.title,
    sub_text = _req$body4.sub_text;
  image = (0, _utils.save_image)(image);
  var result = _conn.GLOBALS.write({
    global: GLOBAL_banner_stuff,
    image: image,
    title: title,
    sub_text: sub_text
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: image,
      created: result.created
    }
  });
};
exports.add_banner = add_banner;
var update_banner = function update_banner(req, res) {
  var _req$body5 = req.body,
    image = _req$body5.image,
    title = _req$body5.title,
    _id = _req$body5._id,
    sub_text = _req$body5.sub_text;
  image = (0, _utils.save_image)(image);
  var result = _conn.GLOBALS.update({
    _id: _id,
    global: GLOBAL_banner_stuff
  }, {
    image: image,
    title: title,
    sub_text: sub_text
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: image,
      created: result.created
    }
  });
};
exports.update_banner = update_banner;
var remove_banner = function remove_banner(req, res) {
  var banner = req.params.banner;
  console.log(banner);
  _conn.GLOBALS.remove({
    global: GLOBAL_banner_stuff,
    _id: banner
  });
  res.end();
};
exports.remove_banner = remove_banner;
var GLOBAL_logo = "logo";
exports.GLOBAL_logo = GLOBAL_logo;
var logo_update = function logo_update(req, res) {
  var logo = req.body.logo;
  if (logo && logo.startsWith("data")) {
    var prev_logo = _conn.GLOBALS.readone({
      global: GLOBAL_logo
    });
    (0, _utils.remove_image)(prev_logo.logo);
  }
  logo = (0, _utils.save_image)(logo);
  _conn.GLOBALS.update({
    global: GLOBAL_logo
  }, {
    logo: logo
  });
  res.json({
    ok: true,
    data: {
      logo: logo
    }
  });
};
exports.logo_update = logo_update;
var banners_et_logo = function banners_et_logo(req, res) {
  res.json({
    ok: true,
    data: {
      banners: _conn.GLOBALS.read({
        global: GLOBAL_banner_stuff
      }),
      logo: _conn.GLOBALS.readone({
        global: GLOBAL_logo
      })
    }
  });
};
exports.banners_et_logo = banners_et_logo;
var add_currency = function add_currency(req, res) {
  var data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  var result = _conn.CURRENCIES.write(data);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.add_currency = add_currency;
var update_currency = function update_currency(req, res) {
  var data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  var result = _conn.CURRENCIES.update(data._id, _objectSpread({}, data));
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.update_currency = update_currency;
var currencies = function currencies(req, res) {
  res.json({
    ok: true,
    data: _conn.CURRENCIES.read()
  });
};
exports.currencies = currencies;
var remove_currency = function remove_currency(req, res) {
  var currency = req.params.currency;
  var result = _conn.CURRENCIES.remove(currency);
  result && (0, _utils.remove_image)(result.image);
  res.end();
};
exports.remove_currency = remove_currency;
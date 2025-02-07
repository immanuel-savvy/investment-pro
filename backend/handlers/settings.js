import { CURRENCIES, GLOBALS } from "../ds/conn";
import { remove_image, save_image } from "./utils";

const GLOBALS_mission_statement = "mission_statement",
  GLOBALS_vision_statement = "vision_statement",
  GLOBALS_recent_investments = "recent_investments",
  GLOBALS_about_statement = "about_statement";

const mission_vision_statement = (req, res) => {
  let vision = GLOBALS.readone({ global: GLOBALS_vision_statement }),
    mission = GLOBALS.readone({ global: GLOBALS_mission_statement });

  res.json({ ok: true, data: { vision, mission } });
};

const update_mission = (req, res) => {
  let { mission_statement, mission_title, mission, mission_file_hash } =
    req.body;

  if (!mission || !mission_file_hash || !mission_statement) return res.end();

  mission = save_image(mission);

  GLOBALS.update(
    { global: GLOBALS_mission_statement },
    { mission_statement, mission_title, mission, mission_file_hash }
  );

  res.json({
    ok: true,
    data: { mission },
  });
};

const update_vision = (req, res) => {
  let { vision_statement, vision_title, vision, vision_file_hash } = req.body;

  if (!vision || !vision_file_hash || !vision_statement) return res.end();

  vision = save_image(vision);

  GLOBALS.update(
    { global: GLOBALS_vision_statement },
    { vision_statement, vision_title, vision, vision_file_hash }
  );

  res.json({
    ok: true,
    data: { vision },
  });
};

const update_about_statement = (req, res) => {
  let { about_statement, bullets, more_details, image, image_file_hash } =
    req.body;

  if (!image || !image_file_hash || !about_statement) return res.end();

  image = save_image(image);

  GLOBALS.update(
    { global: GLOBALS_about_statement },
    { about_statement, image, bullets, more_details, image_file_hash }
  );

  res.json({
    ok: true,
    data: { image },
  });
};

const about_statement = (req, res) => {
  res.json({
    ok: true,
    data: GLOBALS.readone({ global: GLOBALS_about_statement }),
  });
};

const entry = (req, res) => {
  res.json({
    ok: true,
    data: {
      about: GLOBALS.readone({ global: GLOBALS_about_statement }),
      vision: GLOBALS.readone({ global: GLOBALS_vision_statement }),
      mission: GLOBALS.readone({ global: GLOBALS_mission_statement }),
      banners: GLOBALS.read({ global: GLOBAL_banner_stuff }),
      logo: GLOBALS.readone({ global: GLOBAL_logo }),
      currencies: CURRENCIES.read(),
    },
  });
};

const GLOBAL_banner_stuff = "banner_stuff";

const add_banner = (req, res) => {
  let { image, title, sub_text } = req.body;
  image = save_image(image);

  let result = GLOBALS.write({
    global: GLOBAL_banner_stuff,
    image,
    title,
    sub_text,
  });

  res.json({
    ok: true,
    data: { _id: result._id, image, created: result.created },
  });
};

const update_banner = (req, res) => {
  let { image, title, _id, sub_text } = req.body;
  image = save_image(image);

  let result = GLOBALS.update(
    { _id, global: GLOBAL_banner_stuff },
    { image, title, sub_text }
  );

  res.json({
    ok: true,
    data: { _id: result._id, image, created: result.created },
  });
};

const remove_banner = (req, res) => {
  let { banner } = req.params;

  console.log(banner);
  GLOBALS.remove({ global: GLOBAL_banner_stuff, _id: banner });

  res.end();
};

const GLOBAL_logo = "logo";

const logo_update = (req, res) => {
  let { logo } = req.body;

  if (logo && logo.startsWith("data")) {
    let prev_logo = GLOBALS.readone({ global: GLOBAL_logo });
    remove_image(prev_logo.logo);
  }

  logo = save_image(logo);

  GLOBALS.update({ global: GLOBAL_logo }, { logo });

  res.json({ ok: true, data: { logo } });
};

const banners_et_logo = (req, res) => {
  res.json({
    ok: true,
    data: {
      banners: GLOBALS.read({ global: GLOBAL_banner_stuff }),
      logo: GLOBALS.readone({ global: GLOBAL_logo }),
    },
  });
};

const add_currency = (req, res) => {
  let data = req.body;

  data.image = save_image(data.image);

  let result = CURRENCIES.write(data);

  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created,
    },
  });
};

const update_currency = (req, res) => {
  let data = req.body;

  data.image = save_image(data.image);

  let result = CURRENCIES.update(data._id, { ...data });

  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created,
    },
  });
};

const currencies = (req, res) => {
  res.json({ ok: true, data: CURRENCIES.read() });
};

const remove_currency = (req, res) => {
  let { currency } = req.params;

  let result = CURRENCIES.remove(currency);
  result && remove_image(result.image);

  res.end();
};

export {
  about_statement,
  entry,
  mission_vision_statement,
  update_about_statement,
  update_mission,
  update_vision,
  add_currency,
  update_currency,
  GLOBALS_recent_investments,
  remove_currency,
  currencies,
  remove_banner,
  GLOBAL_logo,
  GLOBALS_about_statement,
  GLOBALS_mission_statement,
  GLOBALS_vision_statement,
  add_banner,
  update_banner,
  logo_update,
  banners_et_logo,
};

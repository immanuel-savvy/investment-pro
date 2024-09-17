import { TEAM_MEMBER } from "../ds/conn";
import { remove_image, save_image } from "./utils";

const add_team_member = (req, res) => {
  let data = req.body;

  data.image = save_image(data.image);

  let result = TEAM_MEMBER.write(data);

  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created,
    },
  });
};

const update_team_member = (req, res) => {
  let data = req.body;

  data.image = save_image(data.image);

  let result = TEAM_MEMBER.update(data._id, { ...data });

  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created,
    },
  });
};

const team_members = (req, res) => {
  res.json({ ok: true, data: TEAM_MEMBER.read() });
};

const remove_team_member = (req, res) => {
  let { member } = req.params;

  let result = TEAM_MEMBER.remove(member);
  result && remove_image(result.image);

  res.end();
};

export {
  add_team_member,
  update_team_member,
  team_members,
  remove_team_member,
};

const { link, user } = require("../../models");
const randomstring = require("randomstring");

exports.addLink = async (req, res) => {
  try {
    const { ...data } = req.body;
    const uniqueLink = randomstring.generate(6);

    let newLink = await link.create({
      ...data,
      uniqueLink: uniqueLink,
      linkImage: req.file.filename,
      idUser: req.user.id,
    });

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getLinks = async (req, res) => {
  try {
    const idUser = req.user.id;

    let links = await link.findAll({
      attributes: {
        where: {
          idUser,
        },
        // include: [
        //   {
        //     model: user,
        //     as: "user",
        //     attributes: {
        //       exclude: ["email", "createdAt", "updatedAt", "password", "role"],
        //     },
        //   },
        // ],
        exclude: ["createdAt", "updatedAt"],
      },
    });

    links = JSON.parse(JSON.stringify(links));

    links = links.map((item) => {
      return {
        ...item,
        linkImage: process.env.IMAGES_PATH_FILE + item.linkImage,
      };
    });

    res.send({
      status: "success",
      links,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getLink = async (req, res) => {
  try {
    const { id } = req.params;

    let linkData = await link.findOne({
      where: {
        uniqueLink: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    linkData = JSON.parse(JSON.stringify(linkData));

    const viewUpdate = {
      viewCount: linkData.viewCount + 1,
    };

    await link.update(viewUpdate, {
      where: {
        uniqueLink: id,
      },
    });

    let links = JSON.parse(JSON.parse(linkData.links));

    linkData = {
      ...linkData,
      linkImage: process.env.IMAGES_PATH_FILE + linkData.linkImage,
      links: links,
    };

    res.send({
      status: "success",
      linkData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    await link.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete link id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateLink = async (req, res) => {
  try {
    const { ...data } = req.body;
    const { id } = req.params;
    const linkImage = req.file.filename;

    const updateData = {
      ...data,
      linkImage,
    };

    await link.update(updateData, {
      where: {
        uniqueLink: id,
      },
    });

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getLinkForEdit = async (req, res) => {
  try {
    const { id } = req.params;

    let linkData = await link.findOne({
      where: {
        uniqueLink: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    linkData = JSON.parse(JSON.stringify(linkData));

    let links = JSON.parse(JSON.parse(linkData.links));

    linkData = {
      ...linkData,
      linkImage: process.env.IMAGES_PATH_FILE + linkData.linkImage,
      links: links,
    };

    res.send({
      status: "success",
      linkData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

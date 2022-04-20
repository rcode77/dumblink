const { user } = require("../../models");

exports.getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        dataUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { fullName, email } = req.body;

    let data = {
      fullName,
      email,
    };

    await user.update(data, {
      where: {
        id,
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

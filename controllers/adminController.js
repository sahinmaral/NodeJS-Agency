const Product = require("../models/Product");
const Category = require("../models/Category");
const Client = require("../models/Client");
const About = require("../models/About");
const Admin = require("../models/Admin");

const toastr = require("../helpers/toastr");
const hashing = require("../helpers/hashing");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.loginToAdminPanel = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      toastr.sendToastr(req, "error", "Username or password is incorrect1");
      return res.status(404).redirect("/admin/login");
    }

    const verifyResult = hashing.verifyValueHash(password, admin.password);
    if (!verifyResult) {
      toastr.sendToastr(req, "error", "Username or password is incorrect2");
      return res.status(404).redirect("/admin/login");
    }

    req.session.adminInfo = {
      id: admin._id,
      username: admin.username,
    };

    global.adminInfo = req.session.adminInfo;

    req.session.save((err) => {
      if (err) throw err;
    });

    return res.status(200).redirect("/admin");
  } catch (error) {
    toastr.sendToastr(req, "error", JSON.stringify(error));
    return res.status(500).redirect("/admin/login");
  }
};

exports.logout = async (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/");
  });
};

//#region Products

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findById(req.params.id);

    const oldImageName = deletedProduct.imageUrl.replace(
      "./assets",
      "./public/assets"
    );
    const isFileExists = await fs.existsSync(oldImageName);

    if (isFileExists) {
      await fs.rm(oldImageName, { recursive: false }, (err) => {
        if (err) throw err;
      });
    }

    await deletedProduct.delete();

    toastr.sendToastr(req, "success", "Product successfully deleted");
    return res.status(200).redirect("/admin/products");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = req.body;

    const image = req.files.image;
    const imageExtension = image.name.split(".")[1];

    let newImageName =
      "./public/assets/img/portfolio/" + uuidv4().concat(".", imageExtension);

    image.mv(newImageName);
    newImageName = newImageName.replace("/public", "");

    await Product.create({
      name: newProduct.name,
      slogan: newProduct.slogan,
      description: newProduct.description,
      client: newProduct.client,
      category: newProduct.category,
      imageUrl: newImageName,
    });
    toastr.sendToastr(req, "success", "Product successfully added");
    return res.status(200).redirect("/admin/products");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findById(req.body._id);
    let newImageName = "";

    if (!req.files) {
      newImageName = updatedProduct.imageUrl;

      await updatedProduct.updateOne({
        name: req.body.name,
        slogan: req.body.slogan,
        description: req.body.description,
        client: req.body.client,
        category: req.body.category,
        imageUrl: newImageName,
      });
    } else {
      const image = req.files.image;
      const imageExtension = image.name.split(".")[1];
      let oldImageName = updatedProduct.imageUrl.replace(
        "./assets",
        "./public/assets"
      );

      newImageName =
        "./public/assets/img/portfolio/" + uuidv4().concat(".", imageExtension);
      image.mv(newImageName);

      const isFileExists = await fs.existsSync(oldImageName);

      if (isFileExists) {
        await fs.rm(oldImageName, { recursive: false }, (err) => {
          if (err) throw err;
        });
      }

      await updatedProduct.updateOne({
        name: req.body.name,
        slogan: req.body.slogan,
        description: req.body.description,
        client: req.body.client,
        category: req.body.category,
        imageUrl: newImageName.replace("/public", ""),
      });
    }

    toastr.sendToastr(req, "success", "Product successfully updated");
    return res.status(200).redirect("/admin/products");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

//#endregion

//#region Abouts

exports.addAbout = async (req, res) => {
  try {
    const newAbout = req.body;

    const image = req.files.image;
    const imageExtension = image.name.split(".")[1];

    let newImageName =
      "./public/assets/img/about/" + uuidv4().concat(".", imageExtension);
    image.mv(newImageName);

    newImageName = newImageName.replace("/public", "");

    await About.create({
      header: newAbout.header,
      description: newAbout.description,
      imageUrl: newImageName,
      startDate: newAbout.startDate,
      endDate: newAbout.isEndDate ? newAbout.endDate : null,
    });

    toastr.sendToastr(req, "success", "About successfully added");
    return res.status(200).redirect("/admin/abouts");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const updatedAbout = await About.findById(req.body._id);
    let newImageName = "";

    if (!req.files) {
      newImageName = updatedAbout.imageUrl;

      await updatedAbout.updateOne({
        header: req.body.header,
        description: req.body.description,
        imageUrl: newImageName,
        startDate: req.body.startDate,
        endDate: req.body.isEndDate === "0" ? req.body.endDate : null,
      });
    } else {
      const image = req.files.image;
      const imageExtension = image.name.split(".")[1];
      let oldImageName = updatedAbout.imageUrl.replace(
        "./assets",
        "./public/assets"
      );

      newImageName =
        "./public/assets/img/about/" + uuidv4().concat(".", imageExtension);
      image.mv(newImageName);

      const isFileExists = await fs.existsSync(oldImageName);

      if (isFileExists) {
        await fs.rm(oldImageName, { recursive: false }, (err) => {
          if (err) throw err;
        });
      }

      await updatedAbout.updateOne({
        header: req.body.header,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.isEndDate === "0" ? req.body.endDate : null,
        imageUrl: newImageName.replace("/public", ""),
      });
    }

    toastr.sendToastr(req, "success", "About successfully updated");
    return res.status(200).redirect("/admin/abouts");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    const deletedAbout = await About.findById(req.params.id);

    const oldImageName = deletedAbout.imageUrl.replace(
      "./assets",
      "./public/assets"
    );
    const isFileExists = await fs.existsSync(oldImageName);

    if (isFileExists) {
      await fs.rm(oldImageName, { recursive: false }, (err) => {
        if (err) throw err;
      });
    }

    await deletedAbout.delete();

    toastr.sendToastr(req, "success", "About successfully deleted");
    return res.status(200).redirect("/admin/abouts");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

//#endregion

//#region Categories

exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findById(req.params.id);
    if (!deletedCategory) {
      toastr.sendToastr(req, "error", "No category available");
      return res.status(404).redirect("/admin/categories");
    }

    const deletedProducts = await Product.find({
      category: deletedCategory._id,
    });

    //#region Deleting categories' products

    for (let i = 0; i < deletedProducts.length; i++) {
      await fs.rm(
        deletedProducts[i].imageUrl.replace("./assets", "./public/assets"),
        { recursive: false },
        async (err) => {
          if (err) throw err;
          else {
            await deletedProducts[i].delete();
          }
        }
      );
    }

    //#endregion

    deletedCategory.delete();

    toastr.sendToastr(req, "success", "Category successfully deleted");
    return res.status(200).redirect("/admin/categories");
  } catch (error) {
    toastr.sendToastr(req, "error", JSON.stringify(error));
    return res.status(500).redirect("/admin/categories");
  }
};

exports.addCategory = async (req, res) => {
  try {
    const newCategory = req.body;

    await Category.create({
      name: newCategory.name,
    });

    toastr.sendToastr(req, "success", "Category successfully added");
    return res.status(200).redirect("/admin/categories");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findById(req.body._id);

    await updatedCategory.updateOne({
      name: req.body.name,
    });

    toastr.sendToastr(req, "success", "Category successfully updated");
    return res.status(200).redirect("/admin/categories");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

//#endregion

//#region Clients

exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findById(req.params.id);
    if (!deletedClient) {
      toastr.sendToastr(req, "error", "No client available");
      return res.status(404).redirect("/admin/clients");
    }

    const deletedProducts = await Product.find({
      client: deletedClient._id,
    });

    //#region Deleting clients' products

    for (let i = 0; i < deletedProducts.length; i++) {
      await fs.rm(
        deletedProducts[i].imageUrl.replace("./assets", "./public/assets"),
        { recursive: false },
        async (err) => {
          if (err) throw err;
          else {
            await deletedProducts[i].delete();
          }
        }
      );
    }

    //#endregion

    deletedClient.delete();

    toastr.sendToastr(req, "success", "Client successfully deleted");
    return res.status(200).redirect("/admin/clients");
  } catch (error) {
    toastr.sendToastr(req, "error", JSON.stringify(error));
    return res.status(500).redirect("/admin/clients");
  }
};

exports.addClient = async (req, res) => {
  try {
    const newClient = req.body;

    await Client.create({
      name: newClient.name,
    });

    toastr.sendToastr(req, "success", "Client successfully added");
    return res.status(200).redirect("/admin/clients");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findById(req.body._id);

    await updatedClient.updateOne({
      name: req.body.name,
    });

    toastr.sendToastr(req, "success", "Client successfully updated");
    return res.status(200).redirect("/admin/clients");
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

//#endregion


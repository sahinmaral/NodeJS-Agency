const Product = require("../models/Product");
const Category = require("../models/Category");
const Client = require("../models/Client");
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const About = require("../models/About");
const toastr = require("../helpers/toastr");

exports.getIndexPage = async (req, res) => {
  try {
    const products = await Product.find();
    const employees = await Employee.find();
    const abouts = await About.find().sort({ startDate: 1, endDate: 1 });

    const productsDetail = await Promise.all(
      products.map(async (product) => {
        return {
          _id: product._id,
          name: product.name,
          slogan: product.slogan,
          description: product.description,
          imageUrl: product.imageUrl,
          client: await Client.findById(product.client),
          category: await Category.findById(product.category),
        };
      })
    );

    const employeeDetail = await Promise.all(
      employees.map(async (employee) => {
        return {
          fullName: employee.name.concat(employee.surname),
          imageUrl: employee.imageUrl,
          githubUrl: employee.githubUrl,
          linkedinUrl: employee.linkedinUrl,
          department: await Department.findById(employee.department),
        };
      })
    );

    return res.status(200).render("index", {
      products: productsDetail,
      employees: employeeDetail,
      abouts: abouts,
    });
  } catch (error) {
    toastr.sendToastr(req, "error", "Database error");
    return res.status(500).render("index", {
      products: [],
      employees: [],
      abouts: [],
      req: req,
    });
  }
};

exports.getAdminIndexPage = (req, res) => {
  return res.status(200).render("./admin/index");
};

exports.getAdminLoginPage = (req,res) => {
  return res.status(200).render('./admin/login')
}

//#region Products

exports.getAdminProductsPage = async (req, res) => {
  try {
    const products = await Product.find();

    const productsDetail = await Promise.all(
      products.map(async (product) => {
        return {
          _id: product._id,
          name: product.name,
          slogan: product.slogan,
          description: product.description,
          imageUrl: product.imageUrl,
          client: await Client.findById(product.client),
          category: await Category.findById(product.category),
        };
      })
    );

    return res.status(200).render("./admin/products", {
      products: productsDetail,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.getAdminAddProductPage = async (req, res) => {
  try {
    const clients = await Client.find();
    const categories = await Category.find();

    return res.status(200).render("./admin/addProduct", {
      clients: clients,
      categories: categories,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.getAdminUpdateProductPage = async (req, res) => {
  try {
    const updatedProduct = await Product.findById(req.params.id);
    const clients = await Client.find();
    const categories = await Category.find();

    return res.status(200).render("./admin/updateProduct", {
      product: updatedProduct,
      clients: clients,
      categories: categories,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

//#endregion

//#region Abouts

exports.getAdminAboutsPage = async (req, res) => {
  try {
    const abouts = await About.find();

    return res.status(200).render("./admin/abouts", {
      abouts,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

exports.getAdminAddAboutPage = async (req, res) => {
  return res.status(200).render("./admin/addAbout");
};

exports.getAdminUpdateAboutPage = async (req, res) => {
  try {
    const updatedAbout = await About.findById(req.params.id);

    return res.status(200).render("./admin/updateAbout", {
      about: updatedAbout,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
};

//#endregion 

//#region Categories

exports.getAdminCategoriesPage = async(req,res) => {
  try {
    const categories = await Category.find();

    return res.status(200).render("./admin/categories", {
      categories,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
}

exports.getAdminUpdateCategoryPage = async(req,res) => {
  try {
    const updatedCategory = await Category.findById(req.params.id);

    return res.status(200).render("./admin/updateCategory", {
      category: updatedCategory,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
}

exports.getAdminAddCategoryPage = async(req,res) => {
  return res.status(200).render("./admin/addCategory");
}

//#endregion

//#region Clients

exports.getAdminClientsPage = async(req,res) => {
  try {
    const clients = await Client.find();

    return res.status(200).render("./admin/clients", {
      clients,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
}

exports.getAdminUpdateClientPage = async(req,res) => {
  try {
    const updatedClient = await Client.findById(req.params.id);

    return res.status(200).render("./admin/updateClient", {
      updatedClient,
    });
  } catch (error) {
    return res.status(501).json({
      status: "error has been occured",
      error: JSON.stringify(error),
    });
  }
}

exports.getAdminAddClientPage = async(req,res) => {
  return res.status(200).render("./admin/addClient");
}

//#endregion

//#region Departments

exports.getAdminDepartmentsPage = async(req,res) => {
  try {
    const departments = await Department.find();

    return res.status(200).render("./admin/departments", {
      departments,
    });
  } catch (error) {
    toastr.sendToastr(req, "error", JSON.stringify(error));
    return res.status(501).redirect('/admin')
  }
}

exports.getAdminUpdateDepartmentPage = async(req,res) => {
  try {
    const department = await Department.findById(req.params.id);

    return res.status(200).render("./admin/updateDepartment", {
      department,
    });
  } catch (error) {
    toastr.sendToastr(req, "error", JSON.stringify(error));
    return res.status(501).redirect('/admin/departments')
  }
}

exports.getAdminAddDepartmentPage = async(req,res) => {
  return res.status(200).render("./admin/addDepartment");
}

//#endregion



const express = require("express");
const router = express.Router();

const employeeController = require("../contoller/employeeController");
const timelogController = require("../contoller/timelogContoller");
const paymentController = require("../contoller/paymentController");
const permissionController = require("../contoller/permissionController");
const roleController = require("../contoller/roleController");
const departmentController = require('../contoller/departmentController');
const serviceController = require('../contoller/serviceController');
departmentEmployeeController = require('../contoller/departmentEmployees');


router.get("/employees", employeeController.getIndexPage);
router.get("/employee/allList", employeeController.getAllList);
router.get("/employee/add", employeeController.getAddPage);
router.post("/employee/add", employeeController.postAddPage);
router.get("/employee/edit/:tckn", employeeController.getEditPage);
router.post("/employee/edit/:tckn", employeeController.postEditPage);
router.get("/employee/delete/:tckn", employeeController.deleteEmployee);

router.get("/timelogs", timelogController.getIndexPage);
router.get("/timelog/add", timelogController.getAddPage);
router.post("/timelog/add", timelogController.postAddPage);
router.get("/timelog/edit/:id", timelogController.getEditPage);
router.post("/timelog/edit/:id", timelogController.postEditPage);
router.get("/timelog/delete/:id", timelogController.deleteTimelog);

router.get("/payments", paymentController.getIndexPage);
router.get("/payment/add", paymentController.getAddPage);
router.post("/payment/add", paymentController.postAddPage);
router.get("/payment/edit/:id", paymentController.getEditPage);
router.post("/payment/edit/:id", paymentController.postEditPage);
router.get("/payment/delete/:id", paymentController.deletePayment);

router.get("/permissions", permissionController.getIndexPage);
router.get("/permission/add", permissionController.getAddPage);
router.post("/permission/add", permissionController.postAddPage);
router.get("/permission/edit/:id", permissionController.getEditPage);
router.post("/permission/edit/:id", permissionController.postEditPage);
router.get("/permission/delete/:id", permissionController.deletePermission);

router.get("/roles", roleController.getIndexPage);
router.get("/role/add", roleController.getAddPage);
router.post("/role/add", roleController.postAddPage);
router.get("/role/edit/:id", roleController.getEditPage);
router.post("/role/edit/:id", roleController.postEditPage);
router.get("/role/delete/:id", roleController.deleteRole);

router.get("/departments", departmentController.getIndexPage);
router.get("/department/add", departmentController.getAddPage);
router.post("/department/add", departmentController.postAddPage);
router.get("/department/edit/:id", departmentController.getEditPage);
router.post("/department/edit/:id", departmentController.postEditPage);
router.get("/department/delete/:id", departmentController.deleteDepartment);

router.get("/services", serviceController.getIndexPage);
router.get("/service/add", serviceController.getAddPage);
router.post("/service/add", serviceController.postAddPage);
router.get("/service/edit/:id", serviceController.getEditPage);
router.post("/service/edit/:id", serviceController.postEditPage);
router.get("/service/delete/:id", serviceController.deleteService);

router.get("/departmentEmployees", departmentEmployeeController.getIndexPage);
router.get("/departmentEmployee/add", departmentEmployeeController.getAddPage);
router.post("/departmentEmployee/add", departmentEmployeeController.postAddPage);
router.get("/departmentEmployee/edit/:id", departmentEmployeeController.getEditPage);
router.post("/departmentEmployee/edit/:id", departmentEmployeeController.postEditPage);
router.get("/departmentEmployee/delete/:id", departmentEmployeeController.deleteDepartment);

module.exports = router;

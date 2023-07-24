const pool = require("../data/db");

exports.getIndexPage = async function (req, res, next) {
  try {
    const sql = "SELECT * FROM employees";
    const [employees] = await pool.execute(sql);
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render("employee/list", {
      employees,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.getAllList = async function (req,res,next){


  try {
    const sql = "SELECT * FROM employeesdetails INNER JOIN roles ON employeesdetails.roleId  = roles.id INNER JOIN departments ON employeesdetails.departmentId = departments.id INNER JOIN services ON  employeesdetails.serviceId = services.id  ";
    const [employees] = await pool.execute(sql);

    
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render('employee/allList',{
      employees
    });

  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }

}

exports.getAddPage = async function (req, res, next) {

  const sqlRoles = "SELECT * FROM roles";
  const sqlDepartments = "SELECT * FROM departments";
  const sqlService = "SELECT * FROM services";

  const [roles] = await pool.execute(sqlRoles);
  const [departments] = await pool.execute(sqlDepartments);
  const [services] = await pool.execute(sqlService);

  res.render("employee/add", {
    roles,
    departments,
    services,
  });
};

exports.postAddPage = async function (req, res, next) {
  const {
    tckn,
    roleId,
    departmentId,
    serviceId,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    email,
    phone,
    address,
    startDate,
    gender,
    endDate,
    salary,
    permission,
  } = req.body;

  try {
    const sql =
      "INSERT INTO employees (tckn, roleId, departmentId, serviceId, firstName, middleName, lastName, gender, address, phone, dateOfBirth, email, salary, permission, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const params1 = [
      tckn || null,
      roleId || null,
      departmentId || null,
      serviceId || null,
      firstName || null,
      middleName || null,
      lastName || null,
      gender || null,
      address || null,
      phone || null,
      dateOfBirth || null,
      email || null,
      salary || null,
      permission || null,
      startDate || null,
      endDate || null, // endDate boş ise null olarak ayarlanır
    ];

    const [rows] = await pool.execute(sql, params1);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/employees");
  } catch (error) {
    if (error.code === "ER_SIGNAL_EXCEPTION") {
      // Extract the error message from the SQLSTATE
      const errorMessage = error.sqlMessage || "Bir hata oluştu!";
      req.flash("error", errorMessage);
    } else {
      req.flash("error", "İşlem sırasında bir hata oluştu!");
    }
    console.error("Veri kaydetme hatası: " + error);
    res.redirect("/employee/add");
  }
};

exports.getEditPage = async function (req, res, next) {
  const tckn = req.params.tckn;

  try {
    const sqlRoles = "SELECT * FROM roles";
    const sqlDepartments = "SELECT * FROM departments";
    const sqlService = "SELECT * FROM services";

    const sql = "SELECT * FROM employees WHERE tckn = ?";
    const [employee] = await pool.execute(sql, [tckn]);

    const [roles] = await pool.execute(sqlRoles);
    const [departments] = await pool.execute(sqlDepartments);
    const [services] = await pool.execute(sqlService);

    res.render("employee/edit", {
      employee: employee[0],
      roles,
      departments,
      services,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.postEditPage = async function (req, res, next) {

  const id = req.params.tckn;

  const {
    tckn,
    roleId,
    departmentId,
    serviceId,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    email,
    phone,
    address,
    startDate,
    gender,
    endDate,
    salary,
    permission,
  } = req.body;

  try {
    const sql =
      "UPDATE employees SET tckn = ?, roleId = ?, departmentId = ?, serviceId = ?, firstName = ?, middleName = ?, lastName = ?, gender = ?, address = ?, phone = ?, dateOfBirth = ?, email = ?, salary = ?, permission = ?, startDate = ?, endDate = ? WHERE tckn = ?";
    
      const sql2 = "UPDATE employee_department SET tckn = ? , departmentId = ? , startDate = ? , endDate = ?";

      const params = [
      tckn || null,
      roleId || null,
      departmentId || null,
      serviceId || null,
      firstName || null,
      middleName || null,
      lastName || null,
      gender || null,
      address || null,
      phone || null,
      dateOfBirth || null,
      email || null,
      salary || null,
      permission || null,
      startDate || null,
      endDate || null,
      id || null
    ];

    const params2 = [
      tckn || null,
      departmentId || null,
      startDate || null,
      endDate || null,
    ];


    const [rows] = await pool.execute(sql, params);
    const [rows2] = await pool.execute(sql2, params2);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/employees");
  } catch (error) {
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    console.error("Veri güncelleme hatası: " + error);
    res.redirect("/employee/edit/" + tckn);
  }
};

exports.deleteEmployee = async function (req, res, next) {
  const tckn = req.params.tckn;

  try {
    const sql = "DELETE FROM employees WHERE tckn = ?";
    await pool.execute(sql, [tckn]);
    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/employees");
  } catch (error) {
    console.error("Veri silme hatası: " + error);
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    res.redirect("/employees");
  }
};

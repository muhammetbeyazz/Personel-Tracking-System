const pool = require("../data/db");

exports.getIndexPage = async function (req, res, next) {
  try {
    const sql =
      "SELECT * FROM employee_department;";
    const [employee_departments] = await pool.execute(sql);
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render("employee_department/list", {
        employee_departments,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.getAddPage = async function (req, res, next) {

    const sql = "SELECT * FROM departments"; 
    const sql2 = "SELECT * FROM employees";
    
    const [departments] = await pool.execute(sql);
    const [employees] = await pool.execute(sql2);


  res.render("employee_department/add", {
    departments,
    employees
  });
};

exports.postAddPage = async function (req, res, next) {
    const { tckn, departmentId, startDate, endDate } = req.body;
  
    try {
      const sql =
        "INSERT INTO employee_department (tckn, departmentId, startDate, endDate) VALUES (?, ?, ?, ?)";
  
      const params = [
        tckn || null,
        departmentId || null,
        startDate || null,
        endDate || null,
      ];
  
      const [rows] = await pool.execute(sql, params);
  
      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/departmentEmployees");
    } catch (error) {
      if (error.code === "ER_SIGNAL_EXCEPTION") {
        req.flash("error", error.sqlMessage);
      } else {
        req.flash("error", "İşlem sırasında bir hata oluştu!");
      }
      console.error("Veri kaydetme hatası: " + error);
      res.redirect("/departmentEmployee/add");
    }
  };

  exports.getEditPage = async function (req, res, next) {
    const id = req.params.id;
  
    try {
        const sql = "SELECT * FROM departments"; 
        const sql2 = "SELECT * FROM employees";
        const sql3 = "SELECT * FROM employee_department WHERE id = ?";
        
        const [departments] = await pool.execute(sql);
        const [employees] = await pool.execute(sql2);
        const [employee_department] = await pool.execute(sql3, [id]);


  
      res.render("employee_department/edit", {
        departments,
        employees,
        employee_department: employee_department[0]
      });
    } catch (error) {
      console.error("Veri seçme hatası: " + error);
      res.status(500).json({ error: "Veri seçme hatası" });
    }
  };
  
  exports.postEditPage = async function (req, res, next) {

    const id = req.params.id

    const {tckn,departmentId,startDate, endDate} = req.body;
  
    try {
      const sql = 'UPDATE employee_department SET tckn = ?, departmentId = ?,startDate= ?, endDate= ?   WHERE id = ?';
      const params = [tckn, departmentId, startDate,endDate,id];
  
      const [rows] = await pool.execute(sql, params);

      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/departmentEmployees");
    } catch (error) {
      req.flash("error", "İşlem sırasında bir hata oluştu!");
      console.error("Veri güncelleme hatası: " + error);
      res.redirect("/departmentEmployee/edit/"+id);
    }
  };
  
  exports.deleteDepartment = async function (req, res, next) {
    const id = req.params.id;
  
    try {
      const sql = "DELETE FROM employee_department WHERE id = ?";
      await pool.execute(sql, [id]);
      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/departmentEmployees");
    } catch (error) {
      console.error("Veri silme hatası: " + error);
      req.flash("error", "İşlem sırasında bir hata oluştu!");
      res.redirect("/departmentEmployees");
    }
  };
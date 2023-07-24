const pool = require("../data/db");

exports.getIndexPage = async function (req, res, next) {
  try {
    const sql =
      "SELECT * FROM departments;";
    const [departments] = await pool.execute(sql);
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render("department/list", {
      departments,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.getAddPage = async function (req, res, next) {
  res.render("department/add");
};

exports.postAddPage = async function (req, res, next) {
  const { deptName, deptDesc, deptManager } = req.body;

  try {
    const sql =
      "INSERT INTO departments (deptName,deptDesc,deptManager) VALUES (?, ?, ?)";

    const params = [
      deptName || null,
      deptDesc || null,
      deptManager || null,
    ];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/departments");
  } catch (error) {
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    console.error("Veri kaydetme hatası: " + error);
    res.redirect("/department/add");
  }
};

  exports.getEditPage = async function (req, res, next) {
    const id = req.params.id;
  
    try {
      const sql = "SELECT * FROM departments WHERE id = ?";
      const [department] = await pool.execute(sql, [id]);
  
      res.render("department/edit", {
        department: department[0],
      });
    } catch (error) {
      console.error("Veri seçme hatası: " + error);
      res.status(500).json({ error: "Veri seçme hatası" });
    }
  };
  
  exports.postEditPage = async function (req, res, next) {

    const id = req.params.id

    const {deptName,deptDesc,deptManager} = req.body;
  
    try {
      const sql = 'UPDATE departments SET deptName = ?, deptDesc = ?,deptManager= ?  WHERE id = ?';
      const params = [deptName, deptDesc, deptManager, id];
  
      const [rows] = await pool.execute(sql, params);

      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/departments");
    } catch (error) {
      req.flash("error", "İşlem sırasında bir hata oluştu!");
      console.error("Veri güncelleme hatası: " + error);
      res.redirect("/department/edit/"+id);
    }
  };
  
  exports.deleteDepartment = async function (req, res, next) {
    const id = req.params.id;
  
    try {
      const sql = "DELETE FROM departments WHERE id = ?";
      await pool.execute(sql, [id]);
      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/departments");
    } catch (error) {
      console.error("Veri silme hatası: " + error);
      req.flash("error", "İşlem sırasında bir hata oluştu!");
      res.redirect("/departments");
    }
  };
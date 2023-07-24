const pool = require("../data/db");

exports.getIndexPage = async function (req, res, next) {
  try {
    const sql =
      "SELECT * FROM permission INNER JOIN employees ON permission.tckn = employees.tckn;";
    const [permissions] = await pool.execute(sql);
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render("permission/list", {
      permissions,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.getAddPage = async function (req, res, next) {
  const sql = "SELECT * FROM employees";
  const [employees] = await pool.execute(sql);
  res.render("permission/add", {
    employees,
  });
};

exports.postAddPage = async function (req, res, next) {
  const { tckn, permType, startDate, permStartDate, permEndDate } = req.body;

  try {
    const sql =
      "INSERT INTO permission (tckn,permType,permStartDate,permEndDate) VALUES (?, ?, ?, ?)";

    const params = [
      tckn || null,
      permType || null,
      permStartDate || null,
      permEndDate || null,
    ];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/permissions");
  } catch (error) {
    if (error.code === "ER_SIGNAL_EXCEPTION") {
      req.flash("error", "Başlangıç Tarihi Bitiş Tarihinden büyük olamaz!");
    } else {
      req.flash("error", "İşlem sırasında bir hata oluştu!");
    }
    console.error("Veri kaydetme hatası: " + error);
    res.redirect("/permission/add");
  }
};

exports.deletePermission = async function (req, res, next) {
  const id = req.params.id;

  try {
    const sql = "DELETE FROM permission WHERE id = ?";
    await pool.execute(sql, [id]);
    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/permissions");
  } catch (error) {
    console.error("Veri silme hatası: " + error);
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    res.redirect("/permissions");
  }
};

exports.getEditPage = async function (req, res, next) {
  const id = req.params.id;

  try {
    const sqlEmployee = "SELECT * FROM employees";
    const [employees] = await pool.execute(sqlEmployee);

    const sql = "SELECT * FROM permission WHERE id = ?";
    const [permission] = await pool.execute(sql, [id]);

    res.render("permission/edit", {
      permission: permission[0],
      employees: employees,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.postEditPage = async function (req, res, next) {
  const id = req.params.id;
  const { tckn, permType, startDate, permStartDate, permEndDate } = req.body;

  try {
    const sql =
      "UPDATE permission SET tckn = ?, permType = ?, permStartDate = ?, permEndDate = ? WHERE id = ?";
    const params = [tckn, permType, permStartDate, permEndDate, id];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/permissions");
  } catch (error) {
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    console.error("Veri güncelleme hatası: " + error);
    res.redirect("/permission/edit/" + id);
  }
};

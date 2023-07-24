const pool = require("../data/db");

exports.getIndexPage = async function (req, res, next) {
  try {
    const sql = "SELECT * FROM timelogs INNER JOIN employees ON timelogs.tckn = employees.tckn;";
    const [timelogs] = await pool.execute(sql);
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render("timelog/list", {
        timelogs,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.getAddPage = async function (req, res, next) {
  const sql = "SELECT * FROM employees";
  const [employees] = await pool.execute(sql);
  res.render("timelog/add", {
    employees,
  });
};

exports.postAddPage = async function (req, res, next) {
  const { tckn, loginDateTime, departureDateTime } = req.body;

  try {
    const sql =
      "INSERT INTO timelogs (tckn,loginDateTime,departureDateTime) VALUES (?, ?, ?)";

    const params = [
      tckn || null,
      loginDateTime || null,
      departureDateTime || null,
    ];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/timelogs");
  } catch (error) {
    if (error.code === "ER_SIGNAL_EXCEPTION") {
      req.flash("error", "Başlangıç Tarihi Bitiş Tarihinden büyük olamaz!");
    } else {
      req.flash("error", "İşlem sırasında bir hata oluştu!");
    }
    console.error("Veri kaydetme hatası: " + error);
    res.redirect("/timelog/add");
  }
};

exports.deleteTimelog = async function (req, res, next) {
    const id = req.params.id;
  
    try {
      const sql = "DELETE FROM timelogs WHERE id = ?";
      await pool.execute(sql, [id]);
      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/timelogs");
    } catch (error) {
      console.error("Veri silme hatası: " + error);
      req.flash("error", "İşlem sırasında bir hata oluştu!");
      res.redirect("/timelogs");
    }
  };

  exports.getEditPage = async function (req, res, next) {
    const id = req.params.id;
  
    try {
      const sqlEmployee = "SELECT * FROM employees";
      const [employees] = await pool.execute(sqlEmployee);
  
      const sql = "SELECT * FROM timelogs WHERE id = ?";
      const [timelog] = await pool.execute(sql, [id]);
  
      res.render("timelog/edit", {
        timelog: timelog[0],
        employees: employees,
      });
    } catch (error) {
      console.error("Veri seçme hatası: " + error);
      res.status(500).json({ error: "Veri seçme hatası" });
    }
  };
  
  exports.postEditPage = async function (req, res, next) {
    const id = req.params.id;
    const { tckn, loginDateTime, departureDateTime } = req.body;
  
    try {
      const sql =
        "UPDATE timelogs SET tckn = ?, loginDateTime = ?, departureDateTime = ? WHERE id = ?";
      const params = [tckn, loginDateTime, departureDateTime, id];
  
      const [rows] = await pool.execute(sql, params);
  
      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/timelogs");
    } catch (error) {
      req.flash("error", "İşlem sırasında bir hata oluştu!");
      console.error("Veri güncelleme hatası: " + error);
      res.redirect("/timelog/edit/" + id);
    }
  };
  

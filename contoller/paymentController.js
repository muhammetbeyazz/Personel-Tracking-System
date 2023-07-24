const pool = require("../data/db");

exports.getIndexPage = async function (req, res, next) {
  try {
    const sql =
      "SELECT * FROM payments INNER JOIN employees ON payments.tckn = employees.tckn;";
    const [payments] = await pool.execute(sql);
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render("payment/list", {
      payments,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.getAddPage = async function (req, res, next) {
  const sql = "SELECT * FROM employees";
  const [employees] = await pool.execute(sql);
  res.render("payment/add", {
    employees,
  });
};

exports.postAddPage = async function (req, res, next) {
  const { tckn, amountOfPayment, paymentDate } = req.body;

  try {
    const sql =
      "INSERT INTO payments (tckn,amountOfPayment,paymentDate) VALUES (?, ?, ?)";

    const params = [tckn || null, amountOfPayment || null, paymentDate || null];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/payments");
  } catch (error) {
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    console.error("Veri kaydetme hatası: " + error);
    res.redirect("/payment/add");
  }
};

exports.deletePayment = async function (req, res, next) {
  const id = req.params.id;

  try {
    const sql = "DELETE FROM payments WHERE id = ?";
    await pool.execute(sql, [id]);
    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/payments");
  } catch (error) {
    console.error("Veri silme hatası: " + error);
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    res.redirect("/payments");
  }
};

exports.getEditPage = async function (req, res, next) {
  const id = req.params.id;

  try {
    const sqlEmployee = "SELECT * FROM employees";
    const [employees] = await pool.execute(sqlEmployee);

    const sql = "SELECT * FROM payments WHERE id = ?";
    const [payment] = await pool.execute(sql, [id]);

    res.render("payment/edit", {
      payment: payment[0],
      employees: employees,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.postEditPage = async function (req, res, next) {
  const id = req.params.id;
  const { tckn, amountOfPayment, paymentDate } = req.body;

  try {
    const sql =
      "UPDATE payments SET tckn = ?, amountOfPayment = ?, paymentDate = ? WHERE id = ?";
    const params = [tckn, amountOfPayment, paymentDate, id];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/payments");
  } catch (error) {
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    console.error("Veri güncelleme hatası: " + error);
    res.redirect("/payment/edit/" + id);
  }
};

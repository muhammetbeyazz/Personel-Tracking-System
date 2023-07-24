const pool = require("../data/db");

exports.getIndexPage = async function (req, res, next) {
  try {
    const sql = "SELECT * FROM services;";
    const [services] = await pool.execute(sql);
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render("service/list", {
      services,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.getAddPage = async function (req, res, next) {
  res.render("service/add");
};

exports.postAddPage = async function (req, res, next) {
  const { departureTime, driverName, seats, numberPlate, route } = req.body;

  try {
    const sql =
      "INSERT INTO services (departureTime,driverName,seats,numberPlate,route) VALUES (?, ?, ?, ?, ?)";

    const params = [
      departureTime || null,
      driverName || null,
      seats || null,
      numberPlate || null,
      route || null,
    ];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/services");
  } catch (error) {
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    console.error("Veri kaydetme hatası: " + error);
    res.redirect("/service/add");
  }
};

exports.getEditPage = async function (req, res, next) {
  const id = req.params.id;

  try {
    const sql = "SELECT * FROM services WHERE id = ?";
    const [service] = await pool.execute(sql, [id]);

    res.render("service/edit", {
      service: service[0],
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.postEditPage = async function (req, res, next) {
  const id = req.params.id;

  const { departureTime, driverName, seats, numberPlate, route } = req.body;

  try {
    const sql =
      "UPDATE services SET departureTime = ?, driverName = ?,seats= ?, numberPlate = ?, route = ? WHERE id = ?";
    const params = [departureTime, driverName, seats, numberPlate, route, id];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/services");
  } catch (error) {
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    console.error("Veri güncelleme hatası: " + error);
    res.redirect("/service/edit/" + id);
  }
};

exports.deleteService = async function (req, res, next) {
  const id = req.params.id;

  try {
    const sql = "DELETE FROM services WHERE id = ?";
    await pool.execute(sql, [id]);
    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/services");
  } catch (error) {
    console.error("Veri silme hatası: " + error);
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    res.redirect("/services");
  }
};

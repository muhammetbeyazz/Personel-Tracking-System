const pool = require("../data/db");

exports.getIndexPage = async function (req, res, next) {
  try {
    const sql =
      "SELECT * FROM roles;";
    const [roles] = await pool.execute(sql);
    // rows, seçilen verileri içeren bir dizi olacaktır
    res.render("role/list", {
      roles,
    });
  } catch (error) {
    console.error("Veri seçme hatası: " + error);
    res.status(500).json({ error: "Veri seçme hatası" });
  }
};

exports.getAddPage = async function (req, res, next) {
  res.render("role/add");
};

exports.postAddPage = async function (req, res, next) {
  const { roleName, roleDesc } = req.body;

  try {
    const sql =
      "INSERT INTO roles (roleName,roleDesc) VALUES (?, ?)";

    const params = [
      roleName || null,
      roleDesc || null,
    ];

    const [rows] = await pool.execute(sql, params);

    req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
    res.redirect("/roles");
  } catch (error) {
    req.flash("error", "İşlem sırasında bir hata oluştu!");
    console.error("Veri kaydetme hatası: " + error);
    res.redirect("/role/add");
  }
};

exports.deleteRole = async function (req, res, next) {
    const id = req.params.id;
  
    try {
      const sql = "DELETE FROM roles WHERE id = ?";
      await pool.execute(sql, [id]);
      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/roles");
    } catch (error) {
      console.error("Veri silme hatası: " + error);
      req.flash("error", "İşlem sırasında bir hata oluştu!");
      res.redirect("/roles");
    }
  };

  exports.getEditPage = async function (req, res, next) {
    const id = req.params.id;
  
    try {
      const sql = "SELECT * FROM roles WHERE id = ?";
      const [role] = await pool.execute(sql, [id]);
  
      res.render("role/edit", {
        role: role[0],
      });
    } catch (error) {
      console.error("Veri seçme hatası: " + error);
      res.status(500).json({ error: "Veri seçme hatası" });
    }
  };
  
  exports.postEditPage = async function (req, res, next) {

    const id = req.params.id

    const {roleName,roleDesc} = req.body;
  
    try {
      const sql = 'UPDATE roles SET roleName = ?, roleDesc = ? WHERE id = ?';
      const params = [roleName, roleDesc, id];
  
      const [rows] = await pool.execute(sql, params);

      req.flash("success", "İşleminiz başarılı bir şekilde gerçekleşmiştir.");
      res.redirect("/roles");
    } catch (error) {
      req.flash("error", "İşlem sırasında bir hata oluştu!");
      console.error("Veri güncelleme hatası: " + error);
      res.redirect("/role/edit/"+id);
    }
  };
  
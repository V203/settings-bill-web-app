const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const SettingsBill = require("./settings-bill");
const app = express();
const moment = require("moment")
const now = moment();
const time_ =  {d :now.fromNow()};



const settingsBill = SettingsBill();
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: "./views/partials", viewPath: './views', layoutsDir: './views/layouts' }));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3011;



app.get("/", function (req, res) {
    res.render("index",   
    {
        settings: settingsBill.getSettings(),
        totals: settingsBill.callSmsTotToObj(),
        className: settingsBill.totalClassName()
       
    }
    
    );
    
});

app.post("/settings", (req, res) => {
    settingsBill.setSettings({

        call: req.body.callCost,
        sms: req.body.smsCost,
        warn: req.body.warningLevel,
        crit: req.body.criticalLevel,

    });


    res.redirect("/");
});

app.post("/action", function (req, res) {

    settingsBill.calc(req.body.actionType);
    settingsBill.recordAction(req.body.actionType);

    res.redirect("/");
});

app.get("/actions", function (req, res) {
    res.render("actions", { actions: settingsBill.actions() });

});

app.get("/actions/:actionType", function (req, res) {
    const actionType = req.params.actionType;
    res.render("actions", { actions: settingsBill.actionsFor(actionType) });


});

app.listen(PORT, () => {
    console.log("Listening at PORT: " + PORT);
    
    
})
function enableJson(app, express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

exports.enableJson = enableJson;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10);
(0, config_1.default)();
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;

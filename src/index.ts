// const app=require("./Testing")

import { WebAppConfig } from "./common/web/WebAppConfig";

// app.listen(3000, () => {
//     console.log("listning to port 3000 ..")
// })

WebAppConfig.getInstance().initApp();

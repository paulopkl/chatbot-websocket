import { serverHttp } from "./http";
import "./webSocket";

const PORT = 3333;
serverHttp.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

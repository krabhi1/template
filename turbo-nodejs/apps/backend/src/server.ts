import app from "./app";
import { ENV } from "./config";

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});

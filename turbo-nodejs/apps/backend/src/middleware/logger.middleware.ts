import { logger } from "@/config";
import { pinoHttp } from "pino-http";
export const loggerMiddleware = pinoHttp({
  logger,
  quietReqLogger: true,

  // Make it concise by picking only what you need
  serializers: {
    req: () => undefined,
    res: () => undefined,
  },
  // Custom success message
  customSuccessMessage: (req, res, responseTime) => {
    return `${req.method} ${req.url} ${res.statusCode} - ${responseTime}ms`;
  },
  // Disable automatic "request completed" logs if you only want the custom one
  autoLogging: true,
});

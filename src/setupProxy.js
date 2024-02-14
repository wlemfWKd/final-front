const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 프록시 설정 1: 첫 번째 API
  app.use(
    "/api", // 프록시 경로 설정
    createProxyMiddleware({
      target: "http://openapi.q-net.or.kr",
      changeOrigin: true,
    })
  );

  app.use(
    "/odcloud", // 다른 프록시 경로 설정
    createProxyMiddleware({
      target: "https://api.odcloud.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/odcloud":
          "/api/15075600/v1/uddi:1583867b-67e0-43dc-bae2-e4d8c1a3d8b6", // 실제 API 엔드포인트에는 /odcloud가 포함되지 않도록 수정
      },
    })
  );
};

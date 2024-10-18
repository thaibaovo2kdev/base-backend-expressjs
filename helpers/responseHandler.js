const showError = require("./errorShowContent").default;

function handleResponse(res, item) {
  if (item.statusCode === 200) {
    return res.status(200).json({
      data: item.result,
      isSuccess: true,
      statusCode: 200,
      success: showError(item.message || "SUCCESS", res.req.headers.lcode),
    });
  }

  if (item.statusCode === 400) {
    return res.status(400).json({
      message: item.message || "BAD_REQUEST",
      isSuccess: false,
      statusCode: 400,
      error: showError(item.message || "BAD_REQUEST", res.req.headers.lcode),
    });
  }
  if (item.statusCode === 404) {
    return res.status(404).json({
      message: item.message || "NOT_FOUND",
      isSuccess: false,
      statusCode: item.statusCode,
      error: showError(item.message || "NOT_FOUND", res.req.headers.lcode),
    });
  }

  return res.status(500).json({
    message: item.message,
    isSuccess: false,
    statusCode: 500,
    error: showError("INTERNAL_SERVER_ERROR", res.req.headers.lcode),
  });
}

module.exports = handleResponse;

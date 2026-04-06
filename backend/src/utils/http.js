export const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const parseCookies = (cookieHeader = "") =>
  cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce((accumulator, entry) => {
      const separatorIndex = entry.indexOf("=");
      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = entry.slice(0, separatorIndex);
      const value = entry.slice(separatorIndex + 1);
      accumulator[key] = decodeURIComponent(value);
      return accumulator;
    }, {});

export const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

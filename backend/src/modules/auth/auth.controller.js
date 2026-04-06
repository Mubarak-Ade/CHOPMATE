import { authService } from "./auth.service.js";
import { parseCookies, setRefreshCookie } from "../../utils/http.js";

export const authController = {
  register(req, res) {
    const result = authService.register(req.body);
    setRefreshCookie(res, result.refreshToken);
    res.status(201).json(result);
  },

  login(req, res) {
    const result = authService.login(req.body);
    setRefreshCookie(res, result.refreshToken);
    res.status(200).json(result);
  },

  refresh(req, res) {
    const cookies = parseCookies(req.headers.cookie);
    const result = authService.refresh(cookies.refreshToken);
    setRefreshCookie(res, result.refreshToken);
    res.status(200).json(result);
  },

  logout(req, res) {
    const cookies = parseCookies(req.headers.cookie);
    authService.logout(req.accessToken, cookies.refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true });
  },

  me(req, res) {
    res.status(200).json(req.user);
  },
};

import _api from "./api";
import axios from "axios";

import settings from "./settings";

const apiClient = axios.create({
    baseURL: settings.SERVICES_ROOT
});

export const api = _api(apiClient);


const metaServicesRoot = window.__APP_META__.servicesRoot;

const settings = {
    SERVICES_ROOT: metaServicesRoot !== null  && metaServicesRoot !== undefined ? metaServicesRoot : process.env.REACT_APP_SERVICES_ROOT
};

export default settings;
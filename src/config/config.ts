import IConfigDev from './config.development.json';

const APP_CONFIG = IConfigDev as typeof IConfigDev;

export const config: typeof IConfigDev = { ...APP_CONFIG };
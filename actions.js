export const CONNECTION_ADDED = 'CONNECTION_ADDED';
export const CONNECTION_REMOVED = 'CONNECTION_REMOVED';
export const LAST_CONNECTION_VALUE = 'LAST_CONNECTION_VALUE';

export const SET_OWN_IP = 'SET_OWN_IP';
export const setOwnIp = ip => ({ type: SET_OWN_IP, ip });

export const SET_OWN_CONNECTION_KEY = 'SET_OWN_CONNECTION_KEY';
export const setOwnConnectionKey = key => ({ type: SET_OWN_CONNECTION_KEY, key });

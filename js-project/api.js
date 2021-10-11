const TABLE_DATA_URL = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json';

export const loadCompanies = () => fetch(TABLE_DATA_URL).then(response => response.json());
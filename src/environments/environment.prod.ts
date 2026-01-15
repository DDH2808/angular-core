export const environment = {
  production: true,
  module: 'angular-core',
  clientAddress: 'http://localhost:4200',
  domainApi: 'http://172.16.4.204:9922/api/v7',
  socketAddress: 'http://localhost:5002',
  apiAddress: 'http://172.16.4.204:9922/api/v7',
};

const parsedURL = new URL(location.href);
if (parsedURL.hostname !== 'localhost') {
  // const serviceAddr = `${parsedURL.origin}/api/v2`;
  // environment.apiAddress = serviceAddr;
  // environment.socketAddress = parsedURL.origin;
  // environment.domainApi = parsedURL.origin;
  // environment.clientAddress = parsedURL.origin;
}

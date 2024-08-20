const APIConfig = {
    protocol: "http",
    host: "localhost",
    port: 8111,
    basePath: "",
  
    baseURL() {
      return `${this.protocol}://${this.host}:${this.port}${this.basePath}`;
    },
  };
  
  export default APIConfig;
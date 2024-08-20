
const apiPROTOCOL = import.meta.env.VITE_PROTOCOL;
const apiHOST = import.meta.env.VITE_HOST;



const APIConfig = {
    protocol: apiPROTOCOL,
    host: apiHOST,
    basePath: "",
  
    baseURL() {
      return `${this.protocol}://${this.host}${this.basePath}`;
    },
  };
  
  export default APIConfig;
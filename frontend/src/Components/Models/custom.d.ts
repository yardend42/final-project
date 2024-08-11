//Manually Declaring Types
declare module '@canvasjs/react-charts' {
    const CanvasJSChart: any;
    export default CanvasJSChart;
  }
  
  declare module 'file-saver' {
    export function saveAs(data: Blob | File | string, filename?: string, options?: any): void;
  }
  
  declare module 'papaparse' {
    const Papa: {
      unparse: (data: any, config?: any) => string;
      parse: (csvString: string, config?: any) => any;
    };
    export default Papa;
  }
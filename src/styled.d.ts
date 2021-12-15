import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    plusColor: string;
    minusColor: string;
    cardBgColor: string;
  }
}

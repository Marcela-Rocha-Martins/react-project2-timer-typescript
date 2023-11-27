import "styled-components";
import { defaultTheme } from "../Styles/themes/default";

type ThemeType = typeof defaultTheme;
/* usando o typeOf eu to pegando esses valores de
default e atribuindo a uma variavel nova, no caso "type ThemeType" */

declare module "styled-components" {
  /* neste caso, estou importando e depois declarando porque não quero refazer
    um novo tipo e sim sobreescrever alguns itens */
  export interface DefaultTheme extends ThemeType {}
}

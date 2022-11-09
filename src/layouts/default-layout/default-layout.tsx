import { Outlet } from "react-router-dom";
import { Header } from "../../components/header/header";

import { LayoutContainer } from "./default-layout.styles";

export const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};
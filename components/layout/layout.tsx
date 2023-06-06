import React from "react";
import Header from "./header";

type layoutProps = {
  children: React.ReactNode;
};

function Layout(props: layoutProps) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;

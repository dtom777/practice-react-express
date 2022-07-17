import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </>
  );
};

export default Layout;

import { ReactElement } from "react";

const Header = ({ name }: { name: string }): ReactElement => {
  return <h1>{name}</h1>;
};

export default Header;

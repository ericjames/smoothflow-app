import { IButtonProps } from "../../constants/types";

const Button = ({ onClick, text }: IButtonProps) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;

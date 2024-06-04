import { Link } from "react-router-dom";

const CustomLink = (props: any) => {
  return (
    <>
      {props?.text}
      <Link to={props.navigateTo} className={props?.className}>
        {props.linkText}
      </Link>
    </>
  );
};

export default CustomLink;

import Link from "next/link";
const ButtonHome = ({ children }) => {
  return (
    <Link href="/" className={`btn btn-ghost`}>
      <p>Go Home</p>
      {children}
    </Link>
  );
};

export default ButtonHome;

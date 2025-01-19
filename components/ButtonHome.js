import Link from "next/link";
const ButtonHome = ({ children }) => {
  return (
    <Link href="/" className={`btn btn-outline items-center mt-4`}>
      <p>Go Home</p>
      {children}
    </Link>
  );
};

export default ButtonHome;

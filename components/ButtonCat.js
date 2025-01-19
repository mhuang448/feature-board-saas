import Link from "next/link";
const ButtonCat = ({ children }) => {
  return (
    <Link href="/cat" className={`btn btn-tertiary items-center`}>
      <p>¡Cats!</p>
      {children}
    </Link>
  );
};

export default ButtonCat;

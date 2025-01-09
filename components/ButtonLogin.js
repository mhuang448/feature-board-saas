import Link from "next/link";
const ButtonLogin = ({ isLoggedIn, name, children, extraStyle }) => {
  // const name = "Bob"
  //   const person = { name: "Bob", age: 21 };
  //   person.name;
  //   person.age;
  //   const { name, age } = person;
  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        <p>Welcome back {name}</p>
        {children}
      </Link>
    );
  } else {
    return <button>Login</button>;
  }
};

export default ButtonLogin;

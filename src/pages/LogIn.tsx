type LoginPageProps = {
  loginhandler: any;
  logOuthandler: any;
};

const Login = ({ loginhandler }: LoginPageProps) => {
  return (
    <div>
      <div onClick={loginhandler}>log in</div>
    </div>
  );
};

export default Login;

import React, { FormEvent } from 'react';
import { useRegisterMutation } from '../../features/auth/api/authApiSlice';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Loading from '../UI/Loading';

interface Register {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const RegisterForm: React.FunctionComponent = () => {
  const [register, { isLoading, data, isError, error, isSuccess }] = useRegisterMutation();

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registerHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      firstname: firstnameRef.current!.value,
      lastname: lastnameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    register(data);
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <>
        <h2 className="text-center mt-10">{data?.message}</h2>
        <p className="text-center">
          click here to continue <Link to={'/login'}>log in</Link>
        </p>
      </>
    );
  }
  return (
    <div className="forma_div">
      <h1 className="text-center mt-10">Please register to continue</h1>
      {isError && <p className="text-center mt-5 text-red-500">{error?.message}</p>}
      <form onSubmit={registerHandler} className="forma_user">
        <div className="w-full">
          <label className="block" htmlFor="firstname">
            First Name
          </label>
          <input ref={firstnameRef} placeholder="Firstname" className="w-full" type="text" id="firstname" />
        </div>
        <div className="w-full">
          <label className="block" htmlFor="lastname">
            Last Name
          </label>
          <input ref={lastnameRef} placeholder="Lastname" className="w-full" type="text" id="lastname" />
        </div>
        <div className="w-full">
          <label className="block" htmlFor="register_email">
            Email
          </label>
          <input ref={emailRef} placeholder="example@exp.com" className="w-full" type="email" id="register_email" />
        </div>
        <div className="w-full">
          <label className="block" htmlFor="register_password">
            Password
          </label>
          <input
            ref={passwordRef}
            placeholder="***********"
            className="w-full"
            type="password"
            id="register_password"
          />
        </div>
        <div>
          <button className="btn bg-purple-400 text-white">Submit</button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p>
          Do you have an account? click here to <Link to={'/login'}>log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

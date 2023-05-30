import React from 'react';
import { useRouteError } from 'react-router-dom';
import { MainNav } from '../components/navigation/MainNav';
import Header from '../components/navigation/Header';

const ErrorPage: React.FunctionComponent = () => {
  const error: any = useRouteError();
  let title: string = 'An Error occured!';
  let message: string = 'Something went wrong please try again later';
  if (error.status === 404) {
    title = 'Not Found!';
    message = 'Could not find resource or page';
  }

  return (
    <div>
      <Header />
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;

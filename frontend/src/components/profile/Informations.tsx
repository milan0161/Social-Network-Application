import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserInfoQuery } from '../../features/user/api/userApiSlice';
import Loading from '../UI/Loading';

const Informations = () => {
  const { id } = useParams();
  const { data: info, isSuccess, isError, error, isLoading } = useGetUserInfoQuery(id!);
  let employedInfo;
  if (info?.userInfo.employed === true) {
    employedInfo = 'Yes';
  } else if (info?.userInfo.employed === false) {
    employedInfo = 'Currently not';
  }
  if (isSuccess) {
    console.log(info.userInfo);
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ul className="border border-slate-300 w-3/4 mx-auto flex flex-col gap-2 mb-4 rounded">
      <li className="info_li">
        <p className="text-black text-lg font-bold">Age: </p>
        {info?.userInfo.age ? <p>{info.userInfo.age}</p> : <p>Not Provided</p>}
      </li>
      <li className="info_li">
        <p className="text-black text-lg font-bold">City:</p>
        {info?.userInfo.city ? <p>{info.userInfo.city}</p> : <p>Not Provided</p>}
      </li>
      <li className="info_li">
        <p className="text-black text-lg font-bold">Place of Birth:</p>
        {info?.userInfo.placeOfBirth ? <p>{info.userInfo.placeOfBirth}</p> : <p>Not Provided</p>}
      </li>
      <li className="info_li">
        <p className="text-black text-lg font-bold">Date of Birth:</p>
        {info?.userInfo.dateOfBirth ? (
          <p>
            {new Date(info.userInfo.dateOfBirth).toLocaleDateString('en-Us', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        ) : (
          <p>Not Provided</p>
        )}
      </li>
      <li className="info_li">
        <p className="text-black text-lg font-bold">Employed:</p>
        {info?.userInfo.employed ? <p>{employedInfo}</p> : <p>Not Provided</p>}
      </li>
      <li className="info_li">
        <p className="text-black text-lg font-bold">Work Place:</p>
        {info?.userInfo.workPlace ? <p>{info.userInfo.workPlace}</p> : <p>Not Provided</p>}
      </li>
      <li className="info_li">
        <p className="text-black text-lg font-bold">Phone Number:</p>
        {info?.userInfo.phoneNumber ? <p>{info.userInfo.phoneNumber}</p> : <p>Not Provided</p>}
      </li>
    </ul>
  );
};

export default Informations;

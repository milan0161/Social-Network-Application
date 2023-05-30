import React, { FormEvent, useState } from 'react';
import { UserInformations } from '../../features/auth/types';
import { useAddUserInfoMutation, useGetUserInfoQuery } from '../../features/user/api/userApiSlice';
import Loading from '../UI/Loading';
const InformationForm = () => {
  const [infoState, setInfoState] = useState<UserInformations>({});

  // const {} = useGetUserInfoQuery()

  const [addInfo, { isSuccess, data, isLoading, isError, error }] = useAddUserInfoMutation();

  const changeInfoHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addInfo(infoState);
  };
  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    // console.log(data);
    //toast message
  }
  if (isError) {
    console.log(error?.message);
  }
  return (
    <form onSubmit={changeInfoHandler} className="info_form">
      <h2 className="text-lg my-4">Update your informations</h2>
      <div className="info_div_form">
        <label htmlFor="city">City:</label>
        <input
          onChange={(e) =>
            setInfoState((prev) => {
              return { ...prev, city: e.target.value };
            })
          }
          type="text"
          id="city"
          placeholder="City where you live"
        />
      </div>
      <div className="info_div_form">
        <label htmlFor="place_of_birth">Place of Birth:</label>
        <input
          onChange={(e) =>
            setInfoState((prev) => {
              return { ...prev, placeOfBirth: e.target.value };
            })
          }
          type="text"
          id="place_of_birth"
          placeholder="City where you are born"
        />
      </div>
      <div className="info_div_form">
        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          onChange={(e) =>
            setInfoState((prev) => {
              return { ...prev, dateOfBirth: e.target.value };
            })
          }
          type="date"
          id="date_of_birth"
        />
      </div>
      <div className="info_div_form">
        <label htmlFor="age">Age:</label>
        <input
          onChange={(e) =>
            setInfoState((prev) => {
              return { ...prev, age: Number(e.target.value) };
            })
          }
          type="number"
          id="age"
          placeholder="How old are you?"
        />
      </div>
      <div className="info_div_form">
        <label htmlFor="employed">Employed:</label>
        <select
          onChange={(e) =>
            setInfoState((prev) => {
              if (e.target.value === 'true') {
                return { ...prev, employed: true };
              } else {
                return { ...prev, employed: false };
              }
            })
          }
          id="employed"
        >
          <option value={'true'}>Yes</option>
          <option value={'false'}>No</option>
        </select>
      </div>
      <div className="info_div_form">
        <label htmlFor="work_place">Work Place:</label>
        <input
          onChange={(e) =>
            setInfoState((prev) => {
              return { ...prev, workPlace: e.target.value };
            })
          }
          type="text"
          id="work_place"
          placeholder="Where you work"
        />
      </div>
      <div className="info_div_form">
        <label htmlFor="phone_number">Phone Number:</label>
        <input
          onChange={(e) =>
            setInfoState((prev) => {
              return { ...prev, phoneNumber: Number(e.target.value) };
            })
          }
          className=""
          type="number"
          id="phone_number"
          placeholder="Your phone number"
        />
      </div>
      <div className="w-full px-4 my-2 flex justify-center">
        <button
          type="submit"
          className="w-full bg-blue-400 text-white hover:scale-110 transition duration-300 md:w-3/4 lg:w-1/2"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default InformationForm;

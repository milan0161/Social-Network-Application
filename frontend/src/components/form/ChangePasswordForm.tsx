import React from 'react';

const ChangePasswordForm = () => {
  return (
    <form className="info_form">
      <h3>Change Passord</h3>
      <div className="info_div_form">
        <label htmlFor="">Old Password:</label>
        <input type="password" placeholder="old-password" />
      </div>
      <div className="info_div_form">
        <label htmlFor="">New Password</label>
        <input type="password" placeholder="new-password" />
      </div>
      <div>
        <button className="bg-blue-500 text-white w-24 h-8 rounded my-2 hover:scale-110 transition duration-300">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;

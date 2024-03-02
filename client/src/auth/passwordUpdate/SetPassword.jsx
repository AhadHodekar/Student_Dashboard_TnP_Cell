import React from "react";
import { useState } from "react";

function SetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repeatPassword !== newPassword) {
      alert(`password didn't match`);
    } else {
      console.log(newPassword, repeatPassword);
    }
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  return (
    <div>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <label htmlFor="newpassword">New Password:</label>
        <input
          type="password"
          className="password"
          name="newpassword"
          id="newpassword"
          value={newPassword}
          onChange={handleNewPassword}
        />
        <label htmlFor="repeatpassword">Repeat Password:</label>
        <input
          type="password"
          className="password"
          name="repeatpassword"
          id="repeatpassword"
          value={repeatPassword}
          onChange={handleRepeatPassword}
        />
        <button className="btn p-4 mt-3 rounded-md bg-gray-100">Confirm</button>
      </form>
    </div>
  );
}

export default SetPassword;

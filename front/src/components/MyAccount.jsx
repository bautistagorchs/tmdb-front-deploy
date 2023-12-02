import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="account-container">
      <div className="account-content-container">
        <div className="personal-information-container">
          <div className="inner-container">
            <div className="img-container">
              <img src="https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Blank&hatColor=White&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=White&eyeType=Wink&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light" />
              <button className="edit-info-button">Editar informacion</button>
            </div>
            <div className="personal-data">
              <form action="submit">
                <h3>Nombre</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.name}
                />
                <h3>Apellido</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.last_name}
                />
                <h3>Email</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.email}
                />
                <h3>Contraseña</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={"**********"}
                />
              </form>
            </div>
          </div>
        </div>
        {/* <div className="watchlist-container"></div>
        <div className="favourites-container"></div> */}
      </div>
    </div>
  );
};

export default Account;

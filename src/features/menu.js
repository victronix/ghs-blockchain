import React from "react";

function Menu(){
    return (
        <div className="ust">
        <div className="ara">
          <input type="text" placeholder="Search" />
          <i className="fa fa-search"></i>
        </div>
        <div className="kullanıcı">
          <i className="fas fa-wallet"></i>
          <label>
            {" "}
            <i id="bildirim" className="fa fa-bell" aria-hidden="true"></i>
          </label>
          <span>GHS Birth Certification</span>
        </div>
      </div>
    )
}

export default Menu
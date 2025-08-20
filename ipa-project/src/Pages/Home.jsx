import Map from "../Components/Map/Map";
import "./Home.css";
import Btn from "../Components/Btn.jsx";
import LoadingBtn from "../Components/LoadingBtn.jsx";

export default function Home() {
  return (
    <div className="home-root">
      <h1>IPA – Israeli Pint App</h1>

      <div className="btns-row">
        <div className="filter-btn-wrapper">
          <Btn name="filter" />
        </div>
        <div className="login-btn-wrapper">
          <Btn name="login" />
        </div>
        {/* <LoadingBtn /> */}
      </div>
      <Map />
    </div>
  );
}

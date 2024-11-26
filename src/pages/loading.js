import { useEffect } from "react";
import { LoadingPage } from "../components/component";
import splashImg from "../assets/splashImg.png";

function Splash({finishSplash}) {


    useEffect(() => {
        const timer = setTimeout(() => {
            sessionStorage.setItem('splashed', "true");
            finishSplash();
        }, 2000);
  
        return () => clearTimeout(timer);
        }, [finishSplash]);
    return (
        <LoadingPage>
            <img src={splashImg}  alt="splashImg" width='300px' />
        </LoadingPage>
    );
}

export default Splash;

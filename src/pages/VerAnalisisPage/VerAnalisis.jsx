import { useLocation, Navigate } from "react-router-dom";
import Visualizar from "../../components/Visualizar/visualizar.jsx";

function VerAnalisis() {
 const location = useLocation();
const analisis = location.state;

  if (!analisis) {
    return <Navigate to="/" replace />;
  }

  return(
    <>
        <Visualizar analisis={analisis}/>
    </>
  )
}
export default VerAnalisis
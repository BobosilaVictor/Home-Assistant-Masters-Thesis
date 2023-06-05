
import { useSelector } from "react-redux";
import { selectGroups } from "../../../redux/groupSlice";
import NoGroupContent from "./group/noGroupContent";

const SingleDeviceGroup = () => {
  const groups = useSelector(selectGroups);
  if (groups.length <= 1 ){
    return(<NoGroupContent/>)
  } else {
    return(<div>ok</div>)
  }

};

export default SingleDeviceGroup;

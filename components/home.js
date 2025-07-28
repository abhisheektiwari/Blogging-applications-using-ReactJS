import { useEffect } from "react";
import Base from "../Base";
import Newfeed from "../Newfeed";
import { Container, Row, Col } from "reactstrap";
import CategorysideMenu from "../CategorysideMenu";
const home = () => {
return (
    <base>
    <container className="mt-3">
    <Row>
      <col md={2} className="pt-3">
      <CategorysideMenu />
      </col>
      <col md={10}>
      <Newfeed />
      </col>
    </Row>
    </container>

    </base>
  );
};
export default home 
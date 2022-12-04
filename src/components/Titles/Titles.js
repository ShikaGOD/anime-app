import Naruto from "../../assets/naruto.jpg";
import ChainsawMan from "../../assets/Chainsaw-man.jpg";
import Cyberpunk from "../../assets/Cyberpunk-Edgerunners.jpg";
import DemonSlayer from "../../assets/Demon-Slayer.jpg";
import LinkClick from "../../assets/Link-Click.jpg";
import Princess from "../../assets/Princess-Mononoke.jpg";
import SteinsGate from "../../assets/Steins-Gate.jpg";
import days91 from "../../assets/91 days.jpg";

import Title from "./Title/Title";
import classes from './Titles.module.css'

const DUMMY_TITLES = [
  {
    id: "t1",
    titleName: "Naruto Shippuden",
    image: Naruto,
  },
  {
    id: "t2",
    titleName: "Chainsaw Man",
    image: ChainsawMan,
  },
  {
    id: "t3",
    titleName: "Cyberpunk Edgerunners",
    image: Cyberpunk,
  },
  {
    id: "t4",
    titleName: "Demon Slayer",
    image: DemonSlayer,
  },
  {
    id: "t5",
    titleName: "Link-Click",
    image: LinkClick,
  },
  {
    id: "t6",
    titleName: "Princess Mononoke",
    image: Princess,
  },
  {
    id: "t7",
    titleName: "Steins Gate",
    image: SteinsGate,
  },
  {
    id: "t8",
    titleName: "91 days",
    image: days91,
  },
];

function Titles() {
  const titles = DUMMY_TITLES.map((title) => (
    <Title
      id={title.id}
      key={title.id}
      img={title.image}
      titleName={title.titleName}
    />
  ));
  return (
    <section>
      <ul className={classes.ul}>{titles}</ul>
    </section>
  );
}

export default Titles;

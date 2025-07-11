import { NavLink } from "react-router";
import { Button } from "../../shared/ui/Button";
import { TopBar } from "../../shared/ui/TopBar";
import { TopBarElement } from "../../shared/ui/TopBarElement";

interface MainTopBarProps {
  onClick: () => void;
}

export function MainTopBar({ onClick }: MainTopBarProps) {
  return (
    <TopBar contentStyle={{ flexBasis: 500 }}>
      <TopBarElement>
        <NavLink to="/about" end>
          About
        </NavLink>
      </TopBarElement>
      <TopBarElement>
        <NavLink to="/" end>
          Classrooms
        </NavLink>
      </TopBarElement>
      <TopBarElement>
        <Button
          style={{
            width: 223.93,
            height: 51.15,
            borderRadius: 11,
          }}
          onClick={onClick}
        >
          Playground
        </Button>
      </TopBarElement>
    </TopBar>
  );
}

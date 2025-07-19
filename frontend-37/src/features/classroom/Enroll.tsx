import { Button } from "@/shared/ui/Button";
import { api } from "@/shared/utils/api";
import { useNavigate, useParams } from "react-router";
import { Classroom } from "./types";

export function Enroll() {
  const { id } = useParams();
  const navigate = useNavigate();

  const onAccept = async () => {
    const json = await api<Classroom>({ path: `classroom/enroll/${id}` });
    navigate(`/classroom/${json.id}`);

    console.log(json, "enroll json");
  };

  return (
    <div>
      enroll into this classroom?
      <Button onClick={onAccept}>ye bro</Button>
    </div>
  );
}

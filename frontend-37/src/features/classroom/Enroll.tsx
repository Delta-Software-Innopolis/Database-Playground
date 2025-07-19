import { api } from "@/shared/utils/api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

interface EnrollResponse {
  id: number;
  role: number;
  classroom: number;
  user: string;
}

export function Enroll() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const json = await api<EnrollResponse>({
        path: `classroom/enroll/${id}`,
      });

      navigate(`/classroom/${json.classroom}`);
    };

    run();
  }, []);

  return <></>;
}

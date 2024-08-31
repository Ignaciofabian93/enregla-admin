import { useEffect, useState } from "react";
import { Label } from "../types/label";
import { GetAllLabels } from "../services/labels";
import useSessionStore from "@/store/session";

export default function useHome() {
  const { session } = useSessionStore();
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    if (session) {
      const response = await GetAllLabels({ token: session.token });
      console.log("RES: ", response);
      setLabels(response.labels);
    }
  };

  return { labels };
}

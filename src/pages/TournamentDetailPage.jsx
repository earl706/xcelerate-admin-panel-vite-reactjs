import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function TournamentDetailPage() {
  const { getTournament } = useContext(AuthContext);
  const [tournamentData, setTournamentData] = useState({
    requirements: [],
    tournament_banner: "",
    tournament_name: "",
    description: "",
    sport: "",
    date_created: "",
    tournament_start: "",
    tournament_end: "",
    bracketing_system: "",
  });
  const url_parameters = useParams();

  const getTournamentData = async () => {
    try {
      const response = await getTournament(url_parameters.id);
      console.log(response);
      setTournamentData(response.data);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTournamentData();
  }, []);

  return <div></div>;
}

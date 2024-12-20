import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { TrainService } from "../../application/services/train.service";
import { StopInfoModel } from "../../application/models/stop-info.model";
import { SingleDirectionDisplayView } from "../views/single-platform/single-direction-display.view";
import { MultiDirectionDisplayView } from "../views/multi-platform/multi-direction-display.view";
import { DIRECTION } from "../../shared/constants/direction.enum";
import { AlertModel } from "../../application/models/alert.model";
import { FETCH_ALERT_INTERVAL, FETCH_ARRIVAL_TIMES_INTERVAL } from "../constants";

export function DisplayPage() {
  const [arrivalTimes, setArrivalTimes] = useState<StopInfoModel[]>([]);
  const [alerts, setAlerts] = useState<AlertModel[]>([]);
  const {line, station, direction} = useParams();
  const [isShowingAlerts, setIsShowingAlerts] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      TrainService.getArrivalTimes(station, direction)
        .then((arrivalTimes: StopInfoModel[]) => setArrivalTimes(arrivalTimes))
    }, FETCH_ARRIVAL_TIMES_INTERVAL);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      TrainService.getAlerts(line)
        .then((alerts: AlertModel[]) => {
          setAlerts(alerts);
          if (alerts.length > 0) {
            setIsShowingAlerts(true);
          }
        });
    }, FETCH_ALERT_INTERVAL);

    return () => clearInterval(id);
  }, []);

  function renderDisplay() {
    if (arrivalTimes.length > 0) {
      switch (direction) {
        case DIRECTION.N:
        case DIRECTION.S:
          return <SingleDirectionDisplayView
            stop={arrivalTimes}
            alerts={alerts}
            isShowingAlerts={isShowingAlerts}
            onAlertEnd={() => setIsShowingAlerts(false)}
          />;
        case DIRECTION.BOTH:
          return <MultiDirectionDisplayView
            leftSideStops={arrivalTimes.filter((time: StopInfoModel) => time.direction === DIRECTION.N)}
            rightSideStops={arrivalTimes.filter((time: StopInfoModel) => time.direction === DIRECTION.S)}
            alerts={alerts}
            onAlertEnd={() => {}}
          />;
      }
    }
  }

  return (
    <div id='displays-page__container'>
      {renderDisplay()}
    </div>
  );
}

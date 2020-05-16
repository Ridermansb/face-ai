import React, {
  useCallback,
  useState,
  useContext,
  Fragment,
  useMemo
} from "react";
import AlertDanger from "./AlertDanger";
import RequestAccess from "./RequestAccess";
import Camera from "./Camera";
import StoreContext from "./StoreContext";

const expressionI18N = {
  angry: "Nervoso",
  disgusted: "Angustiado",
  fearful: "Com medo",
  happy: "Feliz",
  neutral: "Neutro",
  sad: "Triste",
  surprised: "Surpreso"
};

const PersonInfo = ({ person, children }) => {
  const handleClick = useCallback(
    e => {
      console.log(person);
    },
    [person]
  );

  const orderedExpressions = useMemo(() => {
    return Object.entries(person.expressions)
      .sort((a, b) => {
        const [, valueA] = a;
        const [, valueB] = b;
        return valueB - valueA;
      })
      .map(exp => ({ key: exp[0], value: exp[1] }));
  }, [person]);
  const [topExpression] = orderedExpressions;

  return (
    <Fragment>
      <dt onClick={handleClick}>{children}</dt>
      <dd>
        <span className="uk-text-lead">
          {(person.genderProbability * 100).toFixed(0)}%
        </span>{" "}
        de que você seja{" "}
        <span className="uk-text-bold">
          {person.gender === "male" ? "homem" : "mulher"}
        </span>
      </dd>
      <dd>
        <span className="uk-text-lead">{person.age.toFixed(0)}</span> com anos
        de <span className="uk-text-bold">idade</span>
      </dd>
      <dd>
        <span className="uk-text-lead">
          {(topExpression.value * 100).toFixed(0)}%
        </span>{" "}
        de que você esteja{" "}
        <span className="uk-text-bold">
          {expressionI18N[topExpression.key]}
        </span>
      </dd>
    </Fragment>
  );
};

const Dashboard = ({ faces }) => {
  return (
    <div>
      <span className="uk-margin-small-left">
        <span className="uk-text-lead">{faces.length} </span>
        <small className="uk-text-small uk-text-emphasis">
          pessoa{faces.length > 1 ? "s" : ""} encontrada
          {faces.length > 1 ? "s" : ""}!
        </small>
      </span>

      <dl className="uk-description-list uk-description-list-divider">
        {faces.map((person, idx) => (
          <PersonInfo key={person.detection.box.area} person={person}>
            #{idx + 1} Pessoa
          </PersonInfo>
        ))}
      </dl>
    </div>
  );
};

const CameraAccess = ({ onAccess }) => {
  const { state } = useContext(StoreContext);
  const faces = state.facesResult;
  const status = state.statusRecognition;

  const [hasCameraAccess, setHasCameraAcces] = useState(undefined);
  const handleOnAccess = useCallback(accessAllowed => {
    setHasCameraAcces(accessAllowed);
    if (accessAllowed) {
      onAccess(accessAllowed);
    }
  }, []);

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
      {hasCameraAccess === undefined && (
        <RequestAccess onAccess={handleOnAccess} />
      )}

      {hasCameraAccess === true && (
        <div className="uk-card uk-card-default uk-card-small ">
          <div className="uk-card-media-top">
            <Camera />
          </div>
          <div className="uk-card-body">
            {faces && faces.length > 0 && <Dashboard faces={faces} />}
          </div>
          <div className="uk-card-footer">
            <small className="uk-text-muted uk-text-small">{status}... </small>
          </div>
        </div>
      )}

      {hasCameraAccess === false && (
        <AlertDanger>
          Humm.. infelizmente sem acesso a câmera não somos úteis
        </AlertDanger>
      )}
    </div>
  );
};

export default CameraAccess;

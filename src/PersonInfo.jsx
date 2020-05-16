import React, {useMemo} from "react";

const expressionI18N = {
    angry: "Nervoso",
    disgusted: "Angustiado",
    fearful: "Com medo",
    happy: "Feliz",
    neutral: "Neutro",
    sad: "Triste",
    surprised: "Surpreso"
};

export const PersonInfo = ({person}) => {
    const orderedExpressions = useMemo(() => {
        return Object.entries(person.expressions)
            .sort((a, b) => {
                const [, valueA] = a;
                const [, valueB] = b;
                return valueB - valueA;
            })
            .map(exp => ({key: exp[0], value: exp[1]}));
    }, [person]);
    const [topExpression] = orderedExpressions;

    return (
        <ul className="uk-list uk-container">
            <li>
        <span className="uk-text-lead">
          {(person.genderProbability * 100).toFixed(0)}%
        </span>{" "}
                de que você seja{" "}
                <span className="uk-text-bold">
          {person.gender === "male" ? "homem" : "mulher"}
        </span>
            </li>
            <li>
                <span className="uk-text-lead">{person.age.toFixed(0)}</span> anos
                de <span className="uk-text-bold">idade</span>
            </li>
            <li>
        <span className="uk-text-lead">
          {(topExpression.value * 100).toFixed(0)}%
        </span>{" "}
                de que você esteja{" "}
                <span className="uk-text-bold">
          {expressionI18N[topExpression.key]}
        </span>
            </li>
        </ul>
    );
};

export default PersonInfo;

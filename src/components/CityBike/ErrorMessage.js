import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import * as S from './ErrorMessageStyled';

 const ErrorMessage = (props) => {
    return props.errors && 
        <S.ErrorMessage>
            <div className="flexAlign">Beklager! <SentimentVeryDissatisfiedIcon /></div>
            <div>Noe gikk galt under ved innlasting av data.</div>
            <div>Akkurat nå kan vi ikke annet enn å be deg sjekke at du har internettforbindelse + forsøke på nytt.</div>
            <div>Her er tekniske detaljer:</div>
            <ul>{
                props.errors.map((error, i) => error && <li key={ i }>{ error.message } : { error.url }</li>)
            }</ul>
        </S.ErrorMessage>;
}
export default ErrorMessage;

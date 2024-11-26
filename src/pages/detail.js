import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function DetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const page = location.state.page;
    const types = location.state.detail.type;
    const name = location.state.detail.title;
    const image = location.state.detail.sprite;
    const stats = location.state.detail.stats;


    return(
        <Detail>
            <DetailBox>
                <p>{name}</p>
                <img src = {image} alt="pokemon"/>
                <p>타입</p>
                <p>{types.map(type => (<span>{type} </span>))}</p>
                <p>스탯</p>
                <div>{stats.map(statData =>(<p>{statData.stat}: {statData.statFigure}</p>))} </div>
            </DetailBox>
            <button onClick={() => {navigate('/', {state: {page: page}})}}>뒤로가기</button>
        </Detail>

    );
}



export const DetailBox = styled.div`
    width: 21vw;
    background: white;
    border: 1px solid;
    border-radius: 15px;
    border-color: "#DEDDDD";
    box-shadow: "0 3px 6px rgba(0, 0, 0, .16)";
    color: "#000000";
`;

export const Detail = styled.div`
    text-align: center;
    min-height: 100vh;
    width: 100%;
    background: #1B1D25;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const backButton = styled.button`
    width: 10px;
    background: white;
    color: white;
`;

export default DetailPage;
import { useLocation } from "react-router-dom";
import styled from "styled-components";

function DetailPage() {
    const location = useLocation();
    const types = location.state.detail.type;
    const name = location.state.detail.title;
    const image = location.state.detail.sprite;
    const stats = location.state.detail.stats;


    return(
        <Detail>
            <DetailBox>
                <p>{name}</p>
                <img src = {image}/>
                <p>타입</p>
                <p>{types.map(type => (<span>{type} </span>))}</p>
                <p>스탯</p>
                <div>{stats.map(statData =>(<p>{statData.stat}: {statData.statFigure}</p>))} </div>
            </DetailBox>
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
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default DetailPage;
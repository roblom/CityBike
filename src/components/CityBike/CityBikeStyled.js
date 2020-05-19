import styled from 'styled-components';

const materialBoxShadowDepth1 = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);"

const Loading = styled.div`
    font-size: 1.5em;
    letter-spacing: 0.25em;
    margin: 1em auto;
    width: 50%;
    text-align: center;
`;


const CityBike = styled.div`
    padding-left: 1em;

    header {
        display: flex;
        h1 {
            margin-left: 0.5em;
        }
    }

    .display-options {
        margin-top: 1em;
        margin-right: 1em;
        display: flex;
        align-items: center;

        .view-mode, button {
            display: flex;
            align-items: center;
            margin: 0 1em;
        }
        button {
            svg { margin-right: 0.5em; }
        }

        /* It's up for discussion if this should be moved.. */
        input[type="search"]{
            flex: 1;
            font-size: 1.5em;
            padding: 0.25em;
            /*width: calc(100% - 1em);*/
        }
    }

    ul {
        padding: 0;
    }

    
    table {
        border-collapse: collapse;
        margin-top: 1em;
        
        td, th {
            font-size: 1.5em;
            text-align: left;
            padding: 0.25em;
        }
        th {
            background: #efefef;
        }
        .count {
            text-align: right;
            padding-left: 3em;
        }
        tr:nth-child(even) td{
            background-color: #fafafa;
        }
        tr:hover td{
            background-color: #999;
            color: #fff;
            a {
                color: #fff;
            }
        }
    }

    .name {
        font-weight: bold;
    }
    
    .address{
        display: flex;
        align-items: center;
        color: #333;
    }
    .view-mode-card {
        .name, .address span {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 14em;
            white-space: nowrap;
        }
        .name {
            width: 15em;
        }
    }
    .view-mode-table {
        .address {
            justify-content: flex-end;
        }
    }

    .status{
        display: flex;
        line-height: 3em;
        justify-content: space-evenly;
    
        div {
            display: flex;
        }
        .count {
            margin-left: 0.25em;
        }
    
        .bikeStatus {
            padding-right: 1em;
            align-items: center;
            svg {
                color: blue;
            }
        }
        .dockStatus {
            padding-left: 1em;
            align-items: center;
            svg {
                background-color: blue;
                color: white;
            }
        }
    }
    
    
    li.station {
        display: inline-grid;
        margin: 1em 0;
        margin-right: 1.5em;
        
        .card {
            min-width: 15em;
            width: 15em;
            max-width: 15em;
            //outline: 1px solid red;
            line-height: 1.5em;
            font-size: 1.5em;
            padding: 0.5em 1em;
            background: #fafafa;
            font-family: monospace;
            box-shadow: ${ materialBoxShadowDepth1 };
        }
    }
`;

export { CityBike, Loading };

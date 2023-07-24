// instead make a dictionary of role:debuff:group
// on first button press (initial positions), check who has beacon then check if correct position value was given
// on second button press do the same but check current debuff of middle, and group then use this to determine expected position, explain that if you dont move yet you click current position
// on third movement then check if wind and current position
// add usehook to track current position

import React, { useState, useEffect, useRef } from "react";
import {useLocation} from 'react-router-dom';
import "./caloric.css";

const Caloric = () => {
    // takes info from homepage
    const location = useLocation();
    // tracks which movement we're on
    const [movementNumber, setMovementNumber] = useState(1);
    // list of debuffs to randomise
    const [debuffs] = useState(["beacon", "fire", "fire", "wind"]);
    // debuffs each group member has; object
    const [groupStatus, setGroupStatus] = useState([]);
    // timer, counts down from 12
    const [timer, setTimer] = useState(12);
    // tracks successful clears
    const [consecutiveClears, setConsecutiveClears] = useState(-1)
    // used to display info once start is pressed
    const [open, setOpen] = useState(true)
    
    useEffect(() => {
        // function to randomise debuffs
        const randomiseDebuffs = async () => {
            let debuffs1 = debuffs.sort(() => Math.random() - 0.5)
            let debuffs2 = debuffs.sort(() => Math.random() - 0.5)
            setGroupStatus(Object.assign(...location.state.roleList.map((k, i) =>({
                [k]: debuffs1.concat(debuffs2)[i] }))))
    };
    randomiseDebuffs();
    // sets timer and movement counter
    setTimer(12)
    setMovementNumber(1)
    // re-randomises and resets timer+counter once the mechanic is cleared
    }, [consecutiveClears])

    // function to start the sim once the start button is pressed
    function handleStart () {
        console.log(groupStatus)
        setOpen(!open);
        setConsecutiveClears(0)
    }

    // the function that handles all the fail/pass states once a position is selected from the map
    function handlePosition (value) {
        // defines indexes for the player, and their partner for use in fail checks
        let keysArr = Object.keys(groupStatus)
        let partnerIndex = keysArr.indexOf(location.state.selectedRole)
        let playerIndex = partnerIndex
        if(partnerIndex % 2 == 0) {
            // player is in group 1, so partner is below them in list of roles
            partnerIndex++
        }
        else {
            // player is in group 2, so partner is above them in list of roles
            partnerIndex--
        }

        // partner role name variable
        let partner = Object.keys(groupStatus)[partnerIndex]
        
        // for testing 
        console.log("movement ", movementNumber)
        console.log("player is ", groupStatus[location.state.selectedRole])
        console.log("their partner is ", groupStatus[partner])
        console.log("player went to ", value)

        // checks if movement was correct, for initial movements
        if (movementNumber === 1) {
            if (groupStatus[location.state.selectedRole] === "beacon") {
                if (value === "D" && playerIndex < 4 || value === "B" && playerIndex > 3){
                    console.log("liv")
                }
                else {
                    console.log("ded")
                }
            }
            else if (groupStatus[partner] === "beacon") {
                if (value === "C" && playerIndex < 4 || value === "A" && playerIndex > 3){
                    console.log("liv")
                }
                else {
                    console.log("ded")
                }
            }
            else if (value === "M") {
                console.log("liv")
            }
        }

        // checks if movement was correct, for second movements

    }
    return (
        <div className = "container">
            {open ?
                <>
                <div>{location.state.selectedMechanic} sim! Click start!</div>
                <button onClick={() => handleStart()}>START</button>
                </> 
                :
                <>
                CLEARS: {consecutiveClears}
                <br/>
                MOVEMENT: {movementNumber}
                <br/>
                ROLE: {location.state.selectedRole}
                <br/>
                DEBUFFS: 
                <br/>
                {
                    Object.entries(groupStatus).map( ([key, value]) => <>{key}: {value}<br></br></>)
                }
                <br/>
                TIMER: {timer}
                </>
            }
        <div className = "background">
            <button class="btn1" value={"1"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
            <button class="btnD" value={"D"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
            <button class="btnMid" value={"M"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
            <button class="btnB" value={"B"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
            <button class="btn2" value={"2"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
            <button class="btnNorth" value={"N"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
            <button class="btnSouth" value={"S"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
            <button class="btnA" value={"A"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
            <button class="btnC" value={"C"} onClick={(e) => handlePosition(e.target.value)}>HERE?</button>
        </div>
    </div>
  );
};

export default Caloric;
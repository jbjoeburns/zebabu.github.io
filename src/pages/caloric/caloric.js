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
    // tracks previous position
    const [prevPos, setPrevPos] = useState("");
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
    // checks if you failed, so useeffect can be triggered and debuffs re-randomised (toggles between true and false to do this)
    const [failCheck, setFailCheck] = useState(false)
    // checks if you won
    const [winCheck, setWinCheck] = useState(false)
    useEffect(() => {
        // function to randomise debuffs
        const randomiseDebuffs = async () => {
            let debuffs1 = debuffs.sort(() => Math.random() - 0.5)
            let debuffs2 = debuffs.sort(() => Math.random() - 0.5)
            setGroupStatus(Object.assign(...location.state.roleList.map((k, i) =>({
                [k]: debuffs1.concat(debuffs2)[i] }))))
    };
    randomiseDebuffs();
    // sets timer and movement counter and empties previous position hook
    setTimer(12)
    setMovementNumber(1)
    setPrevPos("")
    setWinCheck(false)
    // re-randomises and resets timer+counter+previous position hook once the mechanic is cleared
    }, [consecutiveClears, failCheck])

    // function to start the sim once the start button is pressed
    function handleStart () {
        console.log(groupStatus)
        setOpen(!open);
        setFailCheck(false)
        setConsecutiveClears(0)
    }

    // the function that handles all the fail/pass states once a position is selected from the map
    function handlePosition (value) {
        // defines indexes for the player, and their partner for use in fail checks
        let keysArr = Object.keys(groupStatus)
        let partnerIndex = keysArr.indexOf(location.state.selectedRole)
        let playerIndex = partnerIndex
        if(playerIndex % 2 == 0) {
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
                    setMovementNumber(2)
                    setPrevPos(value)
                }
                else {
                    console.log("ded")
                    setFailCheck(!failCheck)
                    setOpen(!open)
                }
            }
            else if (groupStatus[partner] === "beacon") {
                if (value === "C" && playerIndex < 4 || value === "A" && playerIndex > 3){
                    console.log("liv")
                    setMovementNumber(2)
                    setPrevPos(value)
                }
                else {
                    console.log("ded")
                    setFailCheck(!failCheck)
                    setOpen(!open)
                }
            }
            else if (value === "M") {
                console.log("liv")
                setMovementNumber(2)
                setPrevPos(value)
            }
        }

        // checks if movement was correct, for second movements
        if (movementNumber === 2) {
            if (groupStatus[location.state.selectedRole] === "wind") {
                if (prevPos === "M") {
                    // basically want to check if group 1 (go either D or C) or group 2 (A or B)
                    // then check if opposite debuff is on position they went to
                    // could do this by checking each even index (grp1)/odd index (grp2) for fire
                    // if group 1 go C, if group 2 go A
// NEED TO ADD MOVEMENT 3 SPECIFICALLY FOR M WIND PLAYERS
                    //if group 1
                    if(playerIndex % 2 === 0 && value === "C") {
                        console.log("liv")
                        setConsecutiveClears(consecutiveClears + 1)
                        setWinCheck(true)
                        setOpen(!open)
                    }
                    //if group 2
                    else if(playerIndex % 2 !== 0 && value === "A") {
                        console.log("liv")
                        setConsecutiveClears(consecutiveClears + 1)
                        setWinCheck(true)
                        setOpen(!open)
                    }
                    else {
                        console.log("ded")
                        setFailCheck(!failCheck)
                        setOpen(!open)
                    }
                }
                else if (prevPos === "C" && value === "S") {
                    console.log("liv")
                    setConsecutiveClears(consecutiveClears + 1)
                    setWinCheck(true)
                    setOpen(!open)
                }
                else if (prevPos === "A" && value === "N") {
                    console.log("liv")
                    setConsecutiveClears(consecutiveClears + 1)
                    setWinCheck(true)
                    setOpen(!open)
                }
                else {
                    console.log("ded")
                    setFailCheck(!failCheck)
                    setOpen(!open)
                }
            }
            if (groupStatus[location.state.selectedRole] === "fire") {
                if (prevPos === "M") {
                    // same as fire but if group 1 go D, if group 1 go B
                    //if group 1
                    if(playerIndex % 2 === 0 && value === "D") {
                        console.log("liv")
                            setConsecutiveClears(consecutiveClears + 1)
                            setWinCheck(true)
                            setOpen(!open)
                        }
                        //if group 2
                        else if(playerIndex % 2 !== 0 && value === "B") {
                            console.log("liv")
                            setConsecutiveClears(consecutiveClears + 1)
                            setWinCheck(true)
                            setOpen(!open)
                        }
                        else {
                        console.log("ded")
                        setFailCheck(!failCheck)
                        setOpen(!open)
                        }
                }
                else if (prevPos === "C" && value === "D") {
                    console.log("liv")
                    setConsecutiveClears(consecutiveClears + 1)
                    setWinCheck(true)
                    setOpen(!open)
                }
                else if (prevPos === "A" && value === "B") {
                    console.log("liv")
                    setConsecutiveClears(consecutiveClears + 1)
                    setWinCheck(true)
                    setOpen(!open)
                }
                else {
                    console.log("ded")
                    setFailCheck(!failCheck)
                    setOpen(!open)
                }
            }
        }
    }
    return (
        <div className = "container">
            {open ?
                <>
                <div>{location.state.selectedMechanic} sim! Click start!</div>
                {failCheck ?
                    <b>
                        LOL u died XD
                    </b>
                        : 
                    <>
                        {winCheck ? 
                            <b>
                                omg U winned??
                            </b> 
                            :
                            <></>
                        }
                    </>
                }
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
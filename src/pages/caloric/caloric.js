// instead make a dictionary of role:debuff:group
// on first button press (initial positions), check who has beacon then check if correct position value was given
// on second button press do the same but check current debuff of middle, and group then use this to determine expected position, explain that if you dont move yet you click current position
// on third movement then check if wind and current position
// add usehook to track current position

import React, { useState, useEffect, useRef } from "react";
import {useLocation} from 'react-router-dom';
import "./caloric.css";

const Caloric = () => {
    const location = useLocation();
    const [movementNumber, setMovementNumber] = useState(1);
    const [debuffs] = useState(["beacon", "fire", "fire", "wind"]);
    const [groupDebuffs, setGroupDebuffs] = useState([]);
    const playerDebuff = useRef("");
    const [timer, setTimer] = useState(12);
    const [consecutiveClears, setConsecutiveClears] = useState(-1)
    const [open, setOpen] = useState(true)
    
    useEffect(() => {
    const fetchData = async () => {
        let debuffs1 = debuffs.sort(() => Math.random() - 0.5)
        let debuffs2 = debuffs.sort(() => Math.random() - 0.5)
        setGroupDebuffs(debuffs1.concat(debuffs2))
    };
    fetchData();
    }, [consecutiveClears])

    function handleStart () {
        setOpen(!open);
        setConsecutiveClears(0)
    }

    function handlePosition (value) {

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
                    location.state.roleList.map((role, index) => {
                        if (role === location.state.selectedRole) {
                            playerDebuff.current = groupDebuffs[index]
                        }
                        return (
                            <>
                                {role}: {groupDebuffs[index]}
                                <br/>
                            </>
                        )
                    })
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
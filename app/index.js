import clock from "clock"; 
import document from "document";
import { preferences } from "user-settings";
import { zeroPad, } from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import { getDayName, getMonthName, monoDigits, numberWithCommas } from "../common/utils";
import userActivity from "user-activity"; 


clock.granularity = "seconds";


const timeHandle = document.getElementById("timeLabel"); 
const batteryHandle = document.getElementById("batteryLabel");
const stepsHandle = document.getElementById("stepsLabel");
const heartrateHandle = document.getElementById("heartrateLabel");
const label_day = document.getElementById("label_day");
const label_date = document.getElementById("label_date");


const hrm = new HeartRateSensor();

hrm.onreading = function() {
  heartrateHandle.text = ` ${hrm.heartRate}`; 
}
hrm.start();


clock.ontick = (evt) => {
  const now = evt.date;
  let hours = now.getHours();
  let mins = now.getMinutes();
  let secs = now.getSeconds();
  let day = now.getDay();
  let date = now.getDate();
  let month = now.getMonth();
  
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12; 
  } else {
    hours = zeroPad(hours); 
  }
  
  let minsZeroed = zeroPad(mins);
  timeHandle.text = `${hours}:${minsZeroed}`; 
  
  let disp_day = getDayName(day);
  let disp_month = getMonthName(month);
  label_day.text = `${disp_day}`;
  label_date.text = `${disp_month} ${date}`;

      let steps = (userActivity.today.adjusted["steps"] || 0);
    let disp_steps = "";
    if (steps === 0) {
        disp_steps = "---";
    } else {
        disp_steps = numberWithCommas(monoDigits(steps, false));
    }
    stepsHandle.text = disp_steps; 
  
  let batteryValue = battery.chargeLevel; 
  batteryHandle.text = ` ${batteryValue}%`; 
  }


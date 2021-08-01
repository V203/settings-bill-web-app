
module.exports =  function billWithSettings() {
   let moment  = require("moment")
    let call ;
    let callTotal = 0;

    let sms;
    let smsTotal = 0;

    let total = 0;
    let callSmsTotal = 0;

    let warn ;
    let crit ;
    let actionList = [];
    let date_ = new Date()
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////    

    function setCall( call_) {
        return call = Number(call_);

    }

    function getCall() {
        return call;
    }
    function getCallTotal() {
        return callTotal.toFixed(2);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function setSms(sms_) {
        return sms = Number(sms_)
    }


    function getSms() {
        return sms;
    }


    function getSmsTotal() {
        return smsTotal.toFixed(2)
    }



    function togLevel() {
        if (total >= warnLevel) {
            totalSettings.classList.add("warning")
        }
        if (total >= critLevel) {
            totalSettings.classList.remove("danger")
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getTotal() {
        return total = call + sms;
    }

    function getCallSmsTotal() {
         callSmsTotal = smsTotal+callTotal ;
         return callSmsTotal.toFixed(2)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function makeCall() {
        if (!hasReachedCriticalLevel()) {
          return  callTotal += call;
        }

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function sendSms() {
        if (!hasReachedCriticalLevel()) {
            return   smsTotal += sms
        }

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function setWarn(warn_) {
        return warn = Number(warn_)

    }
    function getWarn() {
        return warn
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function setCrit(crit_) {
        return crit =Number( crit_);
    }
    function getCrit() {
        return crit;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function totalClassName() {
        if (hasReachedCriticalLevel() && getCallSmsTotal() !== 0) {
            return "danger";
        }
        if (getCallSmsTotal() >= getWarn() && callSmsTotal !== 0) {
            return "warning";
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function hasReachedCriticalLevel() {
        return getCallSmsTotal() >= getCrit();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function calc(value) {
        if (value === "call") {
           return makeCall();
        }
        else if (value === "sms") {
          return  sendSms();

        }
        callSmsTotal = smsTotal+ callTotal
       return callSmsTotal.toFixed(2)
    }
    function callSmsTotToObj(){
        let objCall = getCallTotal();
        let objSms = getSmsTotal();
        let objCallSms = getCallSmsTotal()
        return{
            objCall,
            objSms,
            objCallSms

        }
        
    }

    function getSettings
    () {
        return {
            call,
            sms,
            warn,
            crit
        }
    }
    function setSettings(settings){
        call = Number(settings.call),
        sms = Number(settings.sms),
        crit = Number(settings.crit),
        warn = Number(settings.warn)

    }

    function actionsFor(type){
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
    }
    
    function recordAction(action) {

        let cost = 0;
        if (action === 'sms'){
            cost = sms;
        }
        else if (action === 'call'){
            cost = call;
        }

        actionList.push({
            type: action,
            cost,
            timestamp: moment(date_).fromNow()
        });
    }
    function getTotal(type) {
        let total = 0;
        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // if it is add the total to the list
                total += action.cost;
            }
        }
        return total;

      
    }
    function actions(){
        return actionList;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return {
        setCall,
        getCall,
        getCallTotal,
        setSms,
        getSms,
        getSmsTotal,
        getTotal,
        getCallSmsTotal,
        makeCall,
        sendSms,
        setWarn,
        getWarn,
        setCrit,
        getCrit,
        totalClassName,
        hasReachedCriticalLevel,
        togLevel,
        calc,
        callSmsTotToObj,
        getSettings,
        setSettings,
        actionsFor,
        actions,
        recordAction,
        getTotal



    }



}

const assert = require('assert');

const SettingsBill = require('../settings-bill');

describe("Bill with Settings factory functions", function () {

    describe("Bill with settings: setting the functions.", function () {
        
        it("Should test if call set twice at 2.50 is equal to 5.00.", function () {
            let billSet = SettingsBill();
            billSet.setWarn(20);
            billSet.setCrit(30);

            billSet.setCall(2.50);
            billSet.makeCall()
            billSet.makeCall()
            

            assert.equal(5.00, billSet.getCallTotal());

        })
        it("Should test if sms is set twice at 0.51 is equal 1.02.", function () {
            let billSet = SettingsBill();
            billSet.setWarn(20);
            billSet.setCrit(30);
            billSet.setSms(0.51)
            billSet.sendSms();
            billSet.sendSms();
            assert.equal(1.02, billSet.getSmsTotal());

        })

        it("Should test if call Total is equal to 3.75 @ 1.25 per call.", function () {
            let billSet = SettingsBill();
            billSet.setWarn(20);
            billSet.setCrit(30);
            billSet.setCall(1.25);
            billSet.makeCall()
            billSet.makeCall()
            billSet.makeCall()

            assert.equal(3.75, billSet.getCallTotal());
        })

        it("Should Test if sms total is equal 1.50 @ 0.50 per sms * 3.", function () {
            let billSet = SettingsBill();
            billSet.setWarn(20);
            billSet.setCrit(30);
            billSet.setSms(0.50);
            
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();
            assert.equal(1.50, billSet.getSmsTotal());

        })
        it("General total's test: total call, total sms.", function () {
            let billSet = SettingsBill();
            billSet.setWarn(20);
            billSet.setCrit(30);
            billSet.setCall(1.20);
            billSet.setSms(0.51);
            billSet.makeCall();
            billSet.makeCall();
            billSet.sendSms();
            billSet.sendSms();

            assert.equal(2.40, billSet.getCallTotal());
            assert.equal(1.02, billSet.getSmsTotal());
            

        })



    });
    describe("Bill with settings: using the functions.", function () {
        

        it("The makeCall functions should be equal to 2.04 @ 1.02 per call.", function () {
            let billSet = SettingsBill();
            billSet.setCrit(10)
            billSet.setWarn(5)
            billSet.setCall(1.02)
            billSet.makeCall();
            billSet.makeCall();

            assert.equal(2.04, billSet.getCallTotal());
        })
        it("The sendSms functions should be equal to 1.56 @ 0.52 * 3 per sms.", function () {
            let billSet = SettingsBill();

            billSet.setWarn(15);
            billSet.setCrit(25);

            billSet.setSms(0.52)
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();

            assert.equal(1.56, billSet.getSmsTotal());
        })
        it("Should test  if makeCall and sendCall added together are equal to callSmsTotal.", function () {
            let billSet = SettingsBill();
            billSet.setWarn(10);
            billSet.setCrit(5);
            billSet.setCall(1.50);
            billSet.setSms(0.50);
            billSet.makeCall();
            billSet.sendSms();

            assert.equal(2.00, billSet.getCallSmsTotal());
        })

    });

    describe("Bill with settings: setting the warning and critical levels.", function () {

        it("Should be able to set the warning level to 1.5 and return 'warning' if equal to or greater than warning level.", function () {
            let billSet = SettingsBill();
            billSet.setWarn(1.50)
            billSet.setCrit(6);
            billSet.setSms(0.51);
            billSet.setCall(1.50)
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();



            assert.equal("warning", billSet.totalClassName());
        })

        it("Should be able to set the critical level to 10 and return 'critical' if equal to or greater than critical level.", function () {
            let billSet = SettingsBill();
            billSet.setCrit(10);
            billSet.setWarn(5);

            billSet.setSms(0.51);
            billSet.setCall(2.00);

            billSet.makeCall();
            billSet.makeCall();
            billSet.makeCall();
            billSet.makeCall();
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();

            assert.equal("danger", billSet.totalClassName());

        });

        it("Should be able to stop the total call cost from increasing once the critical has been met.", function () {
            let billSet = SettingsBill();


            billSet.setWarn(5);
            billSet.setCall(2.50);
            billSet.setSms(0.75);
            billSet.setCrit(10);

            billSet.makeCall();
            billSet.makeCall();
            billSet.makeCall();
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();
            billSet.sendSms();

            assert.equal("danger", billSet.totalClassName());
            assert.equal(10.50, billSet.getCallSmsTotal());

        })
        it("Should automatically change the warning level once the critical level is being changed",function(){
            let billSet = SettingsBill();

            billSet.setWarn(3.00);
            billSet.setCrit(6.00);

            billSet.setCall(1.75);
            billSet.setSms(1.25);

            billSet.makeCall();
            billSet.makeCall();

            billSet.sendSms();
            billSet.sendSms();

            billSet.makeCall();
            billSet.makeCall();

            billSet.sendSms();
            billSet.sendSms();

            assert.equal("danger",billSet.totalClassName());
            assert.equal(6,billSet.getCallSmsTotal());

            billSet.setCrit(9);
            assert.equal("warning",billSet.totalClassName());

            billSet.makeCall();
            billSet.sendSms();

            assert.equal(9,billSet.getCallSmsTotal());

        })
    });

})
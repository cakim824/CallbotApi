const router = require('express').Router();
const logger = require('../../comm/logger');
const { parseReq } = require('../../comm/comm');
const { filter } = require('../../comm/arrayUtil');
const { saveSession, getSession } = require('../../comm/session');
const resultMsg = require('../../comm/resultMsg');

const aiStart = async (req, res) => {
    let success = false;
    try {
        const reqParams = parseReq(req);
        const { projectId } = req.params;
        const { callid } = reqParams;
        logger.info(`API >> AIStart >> reqParams >> `, reqParams);
        logger.info(`API >> AIStart >> callid >> `, callid);
        logger.info(`API >> AIStart >> projectId >> `, projectId);

        /**
         * step 1
         * 필수 필드 값 체크
         */
        const emptyRequiredField = filter(['callid', 'ani'], (item) => !reqParams[item]);
        logger.info(`API >> AIStart >> emptyRequiredField >> `, emptyRequiredField);
        if(emptyRequiredField.length > 0) {
            const errorCode = { success, ...resultMsg['AP.1101'], emptyRequiredField };
            return res.json(errorCode);
        }

        /**
         * step 2
         * API session 중복 체크
         */
        const getSessionResult = await getSession(`api: ${callid}`);
        logger.info(`API >> AIStart >> getSessionResult >> `, getSessionResult);
        if(getSessionResult) {
            const errorCode = { success, ...resultMsg['AP.1102'] };
            logger.error(errorCode);
            return res.json(errorCode);
        }

        /**
         * step 3
         * init 데이터 변수 할당
         */
        const userKey = callid;
        const loginData = {userKey, global: reqParams};
        logger.info(`API >> AIStart >> loginData`, loginData);

        /**
         * step 4
         * api init session 저장
         */
        const saveSessionResult = await saveSession(`api: ${callid}`, loginData, true);
        if(saveSessionResult === 'OK') {
            success = true;
        }
        logger.info(`API >> AIStart >> saveSession`, saveSessionResult);

        return res.json({ success });

    } catch(error) {
        let _error = error;
        if(!(error && error.resultCode === 'E')) _error = { success, resultCode: 'E', error: error && error.toString() };
        logger.error(_error);
        return res.status(500).json(_error);
    }
};

router.post('/aistart/:projectId', aiStart);

module.exports = router;
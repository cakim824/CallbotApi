const logger = require('../../comm/logger');
const resultMsg = require('../../comm/resultMsg');
const { parseReq } = require('../../comm/comm');
const { filter } = require('../../comm/arrayUtil');
const { getSession, deleteSession } = require('../../comm/session');

const router = require('express').Router();

const aiEnd = async (req, res) => {
    let success = false;
    try {
        const reqParams = parseReq(req);
        const projectId = req.params;
        const callid = reqParams;
        logger.info('API >> AIEnd >> reqParams >> ', reqParams);

        /**
         * step 1
         * 필수 필드 값 체크
         */
        const emptyRequiredField = filter(['callid'], (item) => !reqParams[item]);
        if(emptyRequiredField.length > 0) {
            const errorCode = { success, ...resultMsg['AP.1101'], emptyRequiredField };
            logger.error(errorCode);
            return res.json(errorCode);
        }

        /**
         * step 2
         * api session 데이터 조회
         */
        const getSessionResult = await getSession(`api: ${callid}`);
        if(!getSessionResult) {
            logger.error({ success, ...resultMsg['AP.1103'] });
        }

        /**
         * stemp 3
         * api session 제거
         */
        const sessionDelete = await deleteSession(`api: ${callid}`);
        logger.info('API >> AIEnd >> deleteSession ', sessionDelete);
        // success = true;

        return res.json({ success});

    } catch (error) {
        let _error = error;
        return res.status(500).json(_error);
    }

};

router.post('/aiend/:projectId', aiEnd);

module.exports = router;